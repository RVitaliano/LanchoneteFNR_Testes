import { describe, it, expect } from 'vitest'
import { calcularTotal, validarPedido } from './pedido'
// --- TESTE 1: calcularTotal ---
describe('calcularTotal', () => {
it('retorna 0 para lista vazia', () => {
const resultado = calcularTotal([])
expect(resultado).toBe(0)
})
it('calcula corretamente com um item', () => {
const itens = [{ preco: 18.5, quantidade: 2 }]
const resultado = calcularTotal(itens)
expect(resultado).toBeCloseTo(37.0)
})
it('calcula corretamente com varios itens', () => {
const itens = [
{ preco: 18.5, quantidade: 1 }, // X-Burguer
{ preco: 6.0, quantidade: 2 }, // 2x Coca-Cola
]
const resultado = calcularTotal(itens)
expect(resultado).toBeCloseTo(30.5)
})
})
// --- TESTE 2: validarPedido ---
describe('validarPedido', () => {
it('retorna erro quando nome esta vazio', () => {
const resultado = validarPedido('', [{ id: 1 }])
expect(resultado).toBe('Informe o nome do cliente.')
})
it('retorna erro quando nao ha itens', () => {
const resultado = validarPedido('Ana Lima', [])
expect(resultado).toBe('Adicione pelo menos um item. ERRO PROPOSITAL') // falha de propósito
})
it('retorna null quando pedido esta correto', () => {
const itens = [{ id: 1, nome: 'X-Burguer', preco: 18.5, quantidade: 1 }]
const resultado = validarPedido('Ana Lima', itens)
expect(resultado).toBeNull()
})
})