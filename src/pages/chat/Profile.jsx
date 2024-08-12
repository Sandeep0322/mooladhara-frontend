import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { flexStyles } from '../../resources/typography/flexStyles'

const Profile = ({ imageSrc, name, role }) => {
  return (
    <Card
      sx={{
        minWidth: '100px',
        backgroundColor: '#000000',
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src={imageSrc} sx={{ width: 56, height: 56 }} />
        <Box style={{ marginLeft: '10px', ...flexStyles.flexColumn }}>
          <Typography variant='body4' style={{ color: '#fff' }}>
            {name}
          </Typography>
          <Typography
            variant='body5'
            sx={{ color: '#878787', textAlign: 'left' }}
          >
            {role}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Profile
