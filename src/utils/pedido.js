// Calcula o valor total do pedido somando preco * quantidade de cada item
export function calcularTotal(itens) {
  return itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
}

// Valida se o pedido pode ser enviado
// Retorna uma mensagem de erro (string) ou null se estiver tudo ok
export function validarPedido(cliente, itens) {
  if (!cliente || !cliente.trim()) return 'Informe o nome do cliente.'
  if (!itens || itens.length === 0) return 'Adicione pelo menos um item.'
  return null
}