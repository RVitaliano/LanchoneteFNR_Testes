import React from 'react'
import { Chip } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'

const statusConfig = {
  pendente: { label: 'Pendente', color: 'warning', icon: <AccessTimeIcon /> },
  preparando: { label: 'Preparando', color: 'info', icon: <LocalFireDepartmentIcon /> },
  pronto: { label: 'Pronto', color: 'success', icon: <CheckCircleIcon /> },
  entregue: { label: 'Entregue', color: 'default', icon: <DeliveryDiningIcon /> },
}

export default function StatusChip({ status }) {
  const config = statusConfig[status] || statusConfig.pendente
  return (
    <Chip
      label={config.label}
      color={config.color}
      icon={config.icon}
      size="small"
      variant="filled"
    />
  )
}
