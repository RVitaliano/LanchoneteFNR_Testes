# 🍔 Lanchonete FNR — Sistema de Registro de Pedidos

Sistema web para registro e acompanhamento de pedidos de lanchonete, desenvolvido com **ReactJS**, **Material UI** e **JSON Server**.

---

## 📋 Sobre o projeto

O sistema permite que atendentes registrem pedidos, selecionem itens do cardápio e acompanhem o status de cada pedido em tempo real. Projeto original desenvolvido por [@JakesDourado](https://github.com/JakesDourado/fnr_26).

Este repositório inclui os **testes unitários** desenvolvidos como parte da disciplina de **Testes de Software** da Faculdade Nova Roma.

---

## 🚀 Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI v6](https://mui.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [Axios](https://axios-http.com/)
- [Vitest](https://vitest.dev/) — testes unitários

---

## ⚙️ Como executar localmente

**Pré-requisitos:** Node.js 20+ e npm instalados.

```bash
# 1. Clone o repositório
git clone https://github.com/RVitaliano/LanchoneteFNR_Testes

# 2. Entre na pasta
cd fnr_26

# 3. Instale as dependências
npm install

# 4. Inicie o sistema
npm run dev
```

O sistema estará disponível em:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001

---

## ✅ Testes Unitários

Os testes foram escritos com **Vitest** e cobrem a lógica de negócio do sistema.

### Arquivos de teste

```
src/
└── utils/
    ├── pedido.js         # Funções de lógica de negócio
    └── pedido.test.js    # Casos de teste
```

### Funções testadas

| Função | O que faz |
|---|---|
| `calcularTotal(itens)` | Calcula o valor total do pedido |
| `validarPedido(cliente, itens)` | Valida se o pedido pode ser enviado |

### Como rodar os testes

```bash
# Instalar o Vitest (apenas na primeira vez)
npm install -D vitest

# Rodar os testes
npx vitest run
```

### Resultado esperado

```
✓ src/utils/pedido.test.js (6 tests)
  ✓ calcularTotal (3)
    ✓ retorna 0 para lista vazia
    ✓ calcula corretamente com um item
    ✓ calcula corretamente com varios itens
  ✓ validarPedido (3)
    ✓ retorna erro quando nome esta vazio
    ✓ retorna erro quando nao ha itens
    ✓ retorna null quando pedido esta correto

Test Files  1 passed (1)
     Tests  6 passed (6)
```

---

## 📁 Estrutura do projeto

```
fnr_26/
├── src/
│   ├── api/          # Chamadas à API
│   ├── components/   # Componentes React
│   ├── pages/        # Páginas da aplicação
│   └── utils/        # Funções utilitárias e testes
├── db.json           # Banco de dados (JSON Server)
├── index.html
├── package.json
└── vite.config.js
```
