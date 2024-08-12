import React from 'react'
import { Box } from '@mui/material'
import { ReactSVG } from 'react-svg'

const CustomIcon = ({ src, width, height, onClick, sx }) => {
  return (
    <Box
      sx={{
        width: `${width}px`,
        height: `${height}px`,
        cursor: onClick ? 'pointer' : 'auto', // Set cursor based on onClick prop
        ...sx, // Spread any additional styles from props
      }}
      onClick={onClick} // Pass onClick prop directly to Box component
    >
      <ReactSVG
        src={src}
        beforeInjection={(svg) => {
          svg.setAttribute('style', `width: ${width}px; height: ${height}px;`)
        }}
      />
    </Box>
  )
}

export default CustomIcon
