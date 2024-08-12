import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { themeColors } from '../../resources/typography/colors'
import { localeKeys } from '../../resources/typography/localeKeys'
import CustomIcon from '../../custom_components/CustomIcon'
import facebook from '../../resources/svg/facebook.svg'
import google from '../../resources/svg/google.svg'
import mobileIcon from '../../resources/svg/mobile.svg'
import { flexStyles } from '../../resources/typography/flexStyles'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  const signInOptions = [
    {
      icon: google,
      text: localeKeys.continueWithGoogle,
      onClick: () => {
        window.open('http://localhost:3004/auth/google', '_self')
      },
    },
    {
      icon: facebook,
      text: localeKeys.continueWithFacebook,
      onClick: () => {},
    },
    {
      icon: mobileIcon,
      text: localeKeys.continueWithMobileNumber,
      onClick: () => {},
    },
  ]

  return (
    <Box
      sx={{
        width: mobile ? '100%' : '370px',
        textAlign: 'left',
      }}
    >
      <Typography
        variant={mobile ? 'body4' : ' h5'}
        sx={{
          color: themeColors.palette.customColor.white,
          mb: '50px',
        }}
      >
        {localeKeys.letsStartBySigningIn}
      </Typography>
      {signInOptions.map((option, index) => (
        <Box
          key={index}
          sx={{
            width: '100%',
            border: '1px solid',
            borderColor: themeColors.palette.customColor.grey,
            p: '5px',
            height: '46px',
            borderRadius: '7px',
            cursor: 'pointer',
            ...(mobile
              ? { ...flexStyles.flexCenter }
              : { ...flexStyles.flexAlignCenter }),
            mt: '20px',
            pl: mobile ? '' : '50px',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: themeColors.palette.customColor.lightGrey,
            },
          }}
          onClick={option.onClick}
        >
          <Box
            sx={{
              width: mobile ? '230px' : '280px',
              ...flexStyles.flexAlignCenter,
            }}
          >
            <CustomIcon src={option.icon} width={30} height={30} />
            <Typography
              variant={mobile ? 'body5' : 'body1'}
              sx={{
                color: themeColors.palette.customColor.white,
                pl: '24px',
              }}
            >
              {option.text}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default SignIn
