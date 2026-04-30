import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <RestaurantMenuIcon sx={{ mr: 1.5 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, letterSpacing: 1 }}>
          Lanchonete FNR
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<ListAltIcon />}
            onClick={() => navigate('/')}
            variant={location.pathname === '/' ? 'outlined' : 'text'}
            sx={{ borderColor: 'rgba(255,255,255,0.6)' }}
          >
            Pedidos
          </Button>
          <Button
            color="inherit"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate('/novo-pedido')}
            variant={location.pathname === '/novo-pedido' ? 'outlined' : 'text'}
            sx={{ borderColor: 'rgba(255,255,255,0.6)' }}
          >
            Novo Pedido
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
