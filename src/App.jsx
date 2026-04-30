import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import theme from './theme'
import Header from './components/Header'
import OrdersPage from './pages/OrdersPage'
import NewOrderPage from './pages/NewOrderPage'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/novo-pedido" element={<NewOrderPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  )
}
