import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export const getPedidos = () => api.get('/pedidos?_sort=criadoEm&_order=desc')
export const getPedidoById = (id) => api.get(`/pedidos/${id}`)
export const criarPedido = (pedido) => api.post('/pedidos', pedido)
export const atualizarPedido = (id, pedido) => api.put(`/pedidos/${id}`, pedido)
export const deletarPedido = (id) => api.delete(`/pedidos/${id}`)
export const getCardapio = () => api.get('/cardapio')
