import React, { useEffect, useState } from 'react'
import {
  Container, Typography, Box, TextField, Button, Card, CardContent,
  MenuItem, Select, FormControl, InputLabel, IconButton, Divider,
  Alert, Snackbar, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, Stack,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import { getCardapio, criarPedido } from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function NewOrderPage() {
  const navigate = useNavigate()
  const [cardapio, setCardapio] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cliente, setCliente] = useState('')
  const [observacao, setObservacao] = useState('')
  const [itemSelecionado, setItemSelecionado] = useState('')
  const [quantidade, setQuantidade] = useState(1)
  const [itens, setItens] = useState([])
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCardapio().then(({ data }) => {
      setCardapio(data)
      const cats = [...new Set(data.map((i) => i.categoria))]
      setCategorias(cats)
    })
  }, [])

  const adicionarItem = () => {
    if (!itemSelecionado) return
    const produto = cardapio.find((c) => c.id === itemSelecionado)
    const existente = itens.findIndex((i) => i.id === produto.id)
    if (existente >= 0) {
      const novosItens = [...itens]
      novosItens[existente].quantidade += quantidade
      setItens(novosItens)
    } else {
      setItens([...itens, { ...produto, quantidade }])
    }
    setItemSelecionado('')
    setQuantidade(1)
  }

  const removerItem = (id) => setItens(itens.filter((i) => i.id !== id))

  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cliente.trim()) { setErro('Informe o nome do cliente.'); return }
    if (itens.length === 0) { setErro('Adicione pelo menos um item.'); return }

    setLoading(true)
    setErro('')
    try {
      const pedido = {
        cliente: cliente.trim(),
        itens: itens.map(({ nome, quantidade, preco }) => ({ nome, quantidade, preco })),
        total,
        status: 'pendente',
        observacao: observacao.trim(),
        criadoEm: new Date().toISOString(),
      }
      await criarPedido(pedido)
      setSucesso(true)
      setTimeout(() => navigate('/'), 1500)
    } catch {
      setErro('Erro ao registrar pedido. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Novo Pedido
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Dados do Cliente
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Nome do cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                fullWidth
                required
                inputProps={{ 'data-testid': 'input-cliente' }}
              />
              <TextField
                label="Observações (opcional)"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                fullWidth
                multiline
                rows={2}
                inputProps={{ 'data-testid': 'input-observacao' }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Adicionar Itens
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Produto</InputLabel>
                <Select
                  value={itemSelecionado}
                  onChange={(e) => setItemSelecionado(e.target.value)}
                  label="Produto"
                  data-testid="select-produto"
                >
                  {categorias.map((cat) => [
                    <MenuItem key={`cat-${cat}`} disabled sx={{ fontWeight: 700, opacity: 1 }}>
                      — {cat} —
                    </MenuItem>,
                    ...cardapio
                      .filter((c) => c.categoria === cat)
                      .map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.nome} — R$ {item.preco.toFixed(2)}
                        </MenuItem>
                      )),
                  ])}
                </Select>
              </FormControl>
              <TextField
                label="Qtd"
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}
                inputProps={{ min: 1, 'data-testid': 'input-quantidade' }}
                sx={{ width: { xs: '100%', sm: 100 } }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={adicionarItem}
                disabled={!itemSelecionado}
                data-testid="btn-adicionar-item"
                sx={{ whiteSpace: 'nowrap' }}
              >
                Adicionar
              </Button>
            </Stack>

            {itens.length > 0 && (
              <>
                <Divider sx={{ mb: 2 }} />
                <Table size="small" data-testid="tabela-itens">
                  <TableHead>
                    <TableRow>
                      <TableCell>Produto</TableCell>
                      <TableCell align="center">Qtd</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itens.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell align="center">{item.quantidade}</TableCell>
                        <TableCell align="right">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removerItem(item.id)}
                            data-testid={`btn-remover-${item.id}`}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        Total: R$ {total.toFixed(2)}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>

        {erro && (
          <Alert severity="error" sx={{ mb: 2 }} data-testid="alert-erro">
            {erro}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          endIcon={<SendIcon />}
          disabled={loading}
          data-testid="btn-registrar-pedido"
        >
          {loading ? 'Registrando...' : 'Registrar Pedido'}
        </Button>
      </Box>

      <Snackbar
        open={sucesso}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" data-testid="alert-sucesso">
          Pedido registrado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  )
}
