import React from 'react'
import { Box, Typography } from '@mui/material'
import { themeColors } from '../../resources/typography/colors'
import { localeKeys } from '../../resources/typography/localeKeys'
import { flexStyles } from '../../resources/typography/flexStyles'

const Policy = () => {
  const policyItems = [
    { key: 'disclaimer', text: localeKeys.disclaimer },
    { key: 'privacyPolicy', text: localeKeys.privacyPolicy },
    { key: 'termsOfUse', text: localeKeys.termsOfUse },
    { key: 'faqs', text: localeKeys.faqs },
  ]

  return (
    <Box sx={{ height: '5%', ...flexStyles.flexRowRight, gap: '30px' }}>
      {policyItems.map((item) => (
        <Typography
          key={item.key}
          variant='h4'
          sx={{
            color: themeColors.palette.customColor.lightGrey,
            pt: '2px',
            cursor: 'pointer',
          }}
        >
          {item.text}
        </Typography>
      ))}
    </Box>
  )
}

export default Policy
