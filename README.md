# Lanchonete FNR — Sistema de Registro de Pedidos

Sistema web simples para registro de pedidos de uma lanchonete. Desenvolvido com **ReactJS**, **Material UI** e **JSON Server**.

> Projeto utilizado na disciplina de **Testes de Software** como base para a criação e execução de casos de teste pelos alunos.

---

## Tecnologias

| Camada     | Tecnologia              |
|------------|-------------------------|
| Frontend   | React 18 + Vite         |
| UI         | Material UI (MUI) v6    |
| Backend    | JSON Server (REST fake) |
| HTTP       | Axios                   |
| Roteamento | React Router DOM v6     |

---

## Como executar

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
npm install
```

### Rodar o projeto (frontend + backend juntos)

```bash
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- JSON Server (API): [http://localhost:3001](http://localhost:3001)

### Rodar separado

```bash
# Apenas o JSON Server
npm run server

# Apenas o React
npm run client
```

---

## Endpoints da API (JSON Server)

| Método | Rota              | Descrição                  |
|--------|-------------------|----------------------------|
| GET    | /pedidos          | Lista todos os pedidos     |
| GET    | /pedidos/:id      | Busca pedido por ID        |
| POST   | /pedidos          | Cria novo pedido           |
| PUT    | /pedidos/:id      | Atualiza pedido completo   |
| DELETE | /pedidos/:id      | Remove pedido              |
| GET    | /cardapio         | Lista itens do cardápio    |

### Exemplo de pedido (POST /pedidos)

```json
{
  "cliente": "Ana Lima",
  "itens": [
    { "nome": "X-Burguer", "quantidade": 1, "preco": 18.50 },
    { "nome": "Coca-Cola 350ml", "quantidade": 1, "preco": 6.00 }
  ],
  "total": 24.50,
  "status": "pendente",
  "observacao": "Sem maionese",
  "criadoEm": "2026-04-30T14:00:00.000Z"
}
```

### Status possíveis

| Valor       | Descrição               |
|-------------|-------------------------|
| `pendente`  | Pedido recebido         |
| `preparando`| Em preparo na cozinha   |
| `pronto`    | Pronto para entrega     |
| `entregue`  | Entregue ao cliente     |

---

## Estrutura do projeto

```
fnr_teste_26/
├── db.json              # Banco de dados do JSON Server
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── theme.js          # Tema Material UI (laranja)
    ├── api/
    │   └── api.js        # Funções de chamada à API
    ├── components/
    │   ├── Header.jsx     # Barra de navegação
    │   ├── OrderCard.jsx  # Card de exibição de pedido
    │   └── StatusChip.jsx # Chip colorido de status
    └── pages/
        ├── OrdersPage.jsx    # Listagem de pedidos
        └── NewOrderPage.jsx  # Formulário de novo pedido
```

---

## User Stories

As User Stories abaixo descrevem os requisitos funcionais do sistema. Use-as como base para criar seus **casos de teste**.

---

### US01 — Registrar novo pedido

> **Como** atendente da lanchonete,  
> **Quero** registrar um novo pedido informando o nome do cliente e os itens consumidos,  
> **Para que** o pedido fique salvo no sistema e possa ser acompanhado.

**Critérios de aceitação:**
- O campo "Nome do cliente" é obrigatório.
- É obrigatório adicionar pelo menos um item ao pedido.
- O sistema deve calcular automaticamente o total do pedido com base nos itens e quantidades.
- Ao registrar com sucesso, o sistema exibe uma mensagem de confirmação e redireciona para a listagem.
- O pedido é criado com status inicial `pendente`.

---

### US02 — Adicionar itens ao pedido

> **Como** atendente,  
> **Quero** selecionar produtos do cardápio e informar a quantidade,  
> **Para que** o pedido reflita exatamente o que o cliente consumiu.

**Critérios de aceitação:**
- O cardápio exibe os produtos agrupados por categoria (Lanches, Salgados, Bebidas, Porções).
- A quantidade mínima de um item é 1.
- Se o mesmo produto for adicionado mais de uma vez, a quantidade é acumulada no mesmo item.
- É possível remover um item individualmente antes de confirmar o pedido.
- O subtotal de cada item e o total geral são atualizados em tempo real.

---

### US03 — Listar pedidos registrados

> **Como** atendente ou gerente,  
> **Quero** visualizar todos os pedidos registrados,  
> **Para que** eu possa acompanhar o andamento da lanchonete.

**Critérios de aceitação:**
- A listagem exibe todos os pedidos em ordem decrescente de data/hora de criação.
- Cada card de pedido mostra: nome do cliente, número do pedido, horário, quantidade de itens e valor total.
- O status atual do pedido é exibido com um chip colorido.
- É possível filtrar os pedidos por status (Todos, Pendente, Preparando, Pronto, Entregue).
- Os contadores de cada filtro são atualizados conforme o estado dos pedidos.

---

### US04 — Visualizar detalhes de um pedido

> **Como** atendente,  
> **Quero** expandir um pedido para ver seus itens detalhados,  
> **Para que** eu possa conferir o que foi pedido.

**Critérios de aceitação:**
- Ao clicar no ícone de expansão, o card exibe a lista de itens com quantidade e subtotal.
- O total geral e as observações do cliente são exibidos na expansão.
- Ao clicar novamente, o card é recolhido.

---

### US05 — Atualizar status de um pedido

> **Como** atendente ou cozinheiro,  
> **Quero** alterar o status de um pedido diretamente na listagem,  
> **Para que** todos saibam em qual etapa o pedido se encontra.

**Critérios de aceitação:**
- O status pode ser alterado para: `pendente`, `preparando`, `pronto` ou `entregue`.
- A alteração é salva imediatamente na API sem necessidade de recarregar a página.
- O chip de status é atualizado visualmente após a alteração.

---

### US06 — Cancelar (excluir) um pedido

> **Como** atendente,  
> **Quero** cancelar um pedido registrado por engano,  
> **Para que** ele seja removido do sistema.

**Critérios de aceitação:**
- Ao clicar no ícone de cancelamento, o sistema solicita confirmação antes de excluir.
- Se confirmado, o pedido é removido e a listagem é atualizada automaticamente.
- Se o usuário cancelar a confirmação, o pedido permanece inalterado.

---

## `data-testid` disponíveis

Os seguintes atributos estão disponíveis para uso em testes automatizados (Cypress, Playwright, Testing Library etc.):

| Elemento                        | `data-testid`               |
|---------------------------------|-----------------------------|
| Campo nome do cliente           | `input-cliente`             |
| Campo observações               | `input-observacao`          |
| Select de produto               | `select-produto`            |
| Campo de quantidade             | `input-quantidade`          |
| Botão adicionar item            | `btn-adicionar-item`        |
| Tabela de itens do pedido       | `tabela-itens`              |
| Botão remover item (por id)     | `btn-remover-{id}`          |
| Botão registrar pedido          | `btn-registrar-pedido`      |
| Alerta de erro                  | `alert-erro`                |
| Alerta de sucesso               | `alert-sucesso`             |

---

## Sugestões de casos de teste para os alunos

- Registrar pedido com todos os campos válidos → sucesso esperado
- Tentar registrar pedido sem informar o nome do cliente → erro esperado
- Tentar registrar pedido sem adicionar itens → erro esperado
- Adicionar o mesmo item duas vezes → quantidade acumulada
- Remover um item antes de confirmar → item removido da lista
- Alterar status de `pendente` para `preparando` → chip atualizado
- Cancelar um pedido e confirmar → pedido removido da listagem
- Cancelar um pedido e não confirmar → pedido mantido
- Filtrar pedidos por status → apenas pedidos do status selecionado exibidos
- Verificar se o total é calculado corretamente para múltiplos itens
