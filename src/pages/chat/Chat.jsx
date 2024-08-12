import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomIcon from '../../custom_components/CustomIcon'
import zap from '../../resources/svg/zap.svg'
import LogoTitle from '../login/LogoTitle'
import { flexStyles } from '../../resources/typography/flexStyles'
import SideList from './SideList'
import kundli from '../../resources/svg/kundli.svg'
import mask from '../../resources/svg/mask.svg'
import crown from '../../resources/svg/crownBlackBorder.svg'
import Profile from './Profile'
import Questions from './Questions'
import History from './History'
import PersonalProfile from './PersonalProfile'
import { useLocation, useNavigate } from 'react-router-dom'
import { themeColors } from '../../resources/typography/colors'
import astroIcon from '../../resources/svg/astroIcon.svg'

const Chat = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const location = useLocation()

  const storedUserDetails = localStorage.getItem('userDetails')
  const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null

  const svgImage = userDetails.svg.replace(/\\"/g, '"')
  const dataUrl = `data:image/svg+xml;charset=UTF-8,${svgImage}`

  console.log(dataUrl, 'aljlkd')

  console.log(selectedIndex, 'asknfkjsdn')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const authToken = urlParams.get('authToken')

    if (authToken) {
      localStorage.setItem('authToken', authToken)
    }

    // Navigate to '/update-details'
    navigate('/chat')
  }, [location.search])

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        p: '35px 100px',
      }}
    >
      {/* Left Side Panel */}
      <Box
        sx={{
          width: '35%',
          ...flexStyles.flexColumn,
          p: '40px',
          overflowY: 'auto', // Enable vertical scrolling
          '&::-webkit-scrollbar': {
            width: '0px',
            height: '0px',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        <Box sx={{ ...flexStyles.flexCenterSpaceBetween }}>
          <LogoTitle />
          <Box
            sx={{
              ...flexStyles.flexRowAlignCenter,
              height: '32px',
              p: '8px 12px',
              gap: '8px',
              backgroundColor: '#1C1C1C',
              borderRadius: '34px',
            }}
          >
            <CustomIcon src={zap} width={18} height={18} />{' '}
            <Typography variant='body4' sx={{ color: '#FFFFFF' }}>
              0
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: '56px' }}>
          <SideList
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </Box>
        <Box
          sx={{
            mt: '56px',
            height: '258px',
            backgroundColor: 'white',
          }}
        >
          <img src={dataUrl} width='100%' height='100%' alt='kundli' />
        </Box>
      </Box>

      {/* Right Side Panel */}
      <Box
        sx={{
          width: '65%',
          height: '100%',
          p: '20px',
          ...flexStyles.flexColumn,
        }}
      >
        {/* {selectedIndex !== 3 && (
          <Box>
            <Profile
              name={'Cillian Murphy'}
              imageSrc={mask}
              role={'AI Astrologer'}
            />
          </Box>
        )} */}
        {selectedIndex === 0 && (
          <>
            <Box
              sx={{
                border: '1px solid #3A3A3A',
                ...flexStyles.flexColumn,
                flexGrow: 1,
                borderRadius: '19px',
                p: '10px',
                overflowY: 'auto', // Enable scrolling for Questions
              }}
            >
              <Questions />
            </Box>
            {/* Fixed height box visible in UI */}
            <Box
              sx={{
                height: '80px',
                mt: '20px',
                borderRadius: '23px',
                p: '20px',
                display: 'flex',
                alignItems: 'center', // Center items vertically
                gap: '15px',
                backgroundColor: '#111111',
              }}
            >
              <input
                type='text'
                placeholder='Type here to ask anything'
                style={{
                  height: '52px',
                  flex: 1,
                  border: '1px solid #595959',
                  outline: 'none',
                  paddingLeft: '10px',
                  borderRadius: '52px',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                }}
              />
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: '#E3418B',
                    width: '99px',
                    height: '52px',
                    borderRadius: '41px',
                    '&:hover': {
                      backgroundColor: '#E3418B', // Same hover color
                    },
                  }}
                >
                  Ask
                </Button>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-5px',
                  }}
                >
                  <CustomIcon src={crown} width={20} height={20} />
                </Box>
              </Box>
            </Box>
          </>
        )}

        {selectedIndex === 1 && <History />}

        {selectedIndex === 3 && <PersonalProfile />}

        {selectedIndex === 2 && (
          <Box
            sx={{
              p: '15px',
              // width: mobile ? '100%' : '59%',
              height: '100%',
              border: '1px solid white',
              borderRadius: '17px',
              mt: mobile ? '24px' : '',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '17px',
                ...(mobile
                  ? flexStyles.flexColumn
                  : flexStyles.flexRowSpaceBetween),
                flexWrap: 'wrap',
                overflowY: 'scroll',
                backgroundColor: '#111111',
                p: '25px',
                // Hide scrollbar for Chrome, Safari and Opera
                '&::-webkit-scrollbar': {
                  width: '0px',
                  height: '0px',
                },
                // Hide scrollbar for IE, Edge
                '-ms-overflow-style': 'none',
                // Hide scrollbar for Firefox
                'scrollbar-width': 'none',
              }}
            >
              {userDetails?.astroData?.map((section, index) => (
                <Box
                  key={index}
                  sx={{
                    width: mobile ? '100%' : '48%',
                    mb: '20px',
                    border: '1px solid',
                    borderColor: themeColors.palette.customColor.grey5,
                    borderRadius: '10px',
                    p: '15px',
                    ...flexStyles.flexColumnAlignStart,
                  }}
                >
                  <Box sx={{ ...flexStyles.flexAlignCenter, mb: '12px' }}>
                    <CustomIcon
                      src={astroIcon}
                      width={mobile ? 18 : 24}
                      height={mobile ? 18 : 24}
                    />
                    <Typography
                      variant={'body11'}
                      sx={{
                        color: themeColors.palette.customColor.white,
                        ml: '8px',
                      }}
                    >
                      {section?.attribute}
                    </Typography>
                  </Box>
                  <Typography
                    variant={'body5'}
                    sx={{
                      color: themeColors.palette.customColor.grey6,
                      textAlign: 'left',
                    }}
                  >
                    {section?.summary}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Chat
