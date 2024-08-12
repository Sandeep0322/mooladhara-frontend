import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { flexStyles } from '../../resources/typography/flexStyles'
import CustomIcon from '../../custom_components/CustomIcon'
import logo from '../../resources/svg/logo.svg'
import { themeColors } from '../../resources/typography/colors'
import { localeKeys } from '../../resources/typography/localeKeys'
import SignIn from './SignIn'
import HeaderBox from './HeaderBox'

const Login = () => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <HeaderBox>
      <Box
        sx={{
          ...(mobile
            ? flexStyles.flexColumnCenterSpaceEvenly
            : flexStyles.flexRowCenterSpaceEvenly),
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            ...flexStyles.flexColumnCenter,
            mt: mobile ? '64px' : '',
          }}
        >
          <CustomIcon
            src={logo}
            width={mobile ? 168 : 261}
            height={mobile ? 168 : 261}
          />
          <Typography
            variant={mobile ? 'body3' : 'h4'}
            sx={{ color: themeColors.palette.customColor.white, pt: '40px' }}
          >
            {localeKeys.discoverTheEmpoweringGuidance}
          </Typography>
          <Typography
            variant={mobile ? 'body3' : 'h4'}
            sx={{ color: themeColors.palette.customColor.white, pt: '2px' }}
          >
            {localeKeys.theHouseOfLuckHoldsForYourLife}
          </Typography>
        </Box>
        {mobile ? (
          <Divider
            sx={{
              color: themeColors.palette.customColor.grey,
              border: '1px solid',
              width: '100%',
              mt: mobile ? '56px' : '',
              mb: mobile ? '56px' : '',
            }}
          />
        ) : (
          <Divider
            sx={{
              color: themeColors.palette.customColor.grey,
              border: '1px solid',
              height: '60%',
            }}
          />
        )}
        <SignIn />
      </Box>
    </HeaderBox>
  )
}

export default Login
