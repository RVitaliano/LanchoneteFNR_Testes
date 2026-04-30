import React, { useEffect, useState } from 'react'
import {
  Container, Typography, Box, CircularProgress, Alert,
  ToggleButton, ToggleButtonGroup, Stack, Chip,
} from '@mui/material'
import OrderCard from '../components/OrderCard'
import { getPedidos } from '../api/api'

const FILTROS = ['todos', 'pendente', 'preparando', 'pronto', 'entregue']

export default function OrdersPage() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [filtro, setFiltro] = useState('todos')

  const carregar = async () => {
    setLoading(true)
    setErro(null)
    try {
      const { data } = await getPedidos()
      setPedidos(data)
    } catch {
      setErro('Não foi possível carregar os pedidos. Verifique se o JSON Server está rodando.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const pedidosFiltrados =
    filtro === 'todos' ? pedidos : pedidos.filter((p) => p.status === filtro)

  const contagem = (status) =>
    status === 'todos' ? pedidos.length : pedidos.filter((p) => p.status === status).length

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pedidos
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        {FILTROS.map((f) => (
          <Chip
            key={f}
            label={`${f.charAt(0).toUpperCase() + f.slice(1)} (${contagem(f)})`}
            onClick={() => setFiltro(f)}
            color={filtro === f ? 'primary' : 'default'}
            variant={filtro === f ? 'filled' : 'outlined'}
            clickable
          />
        ))}
      </Stack>

      {erro && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {erro}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : pedidosFiltrados.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ mt: 6 }}>
          Nenhum pedido encontrado.
        </Typography>
      ) : (
        pedidosFiltrados.map((pedido) => (
          <OrderCard key={pedido.id} pedido={pedido} onRefresh={carregar} />
        ))
      )}
    </Container>
  )
}
