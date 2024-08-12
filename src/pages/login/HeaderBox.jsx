// src/components/HeaderBox.jsx

import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import LogoTitle from './LogoTitle'
import { flexStyles } from '../../resources/typography/flexStyles'

const HeaderBox = ({ children }) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        height: mobile ? 'auto' : '100vh',
        p: mobile ? '40px 20px' : '40px 100px',
        ...flexStyles.flexColumn,
        backgroundColor: '#000000',
      }}
    >
      <LogoTitle />
      {children}
    </Box>
  )
}

export default HeaderBox
