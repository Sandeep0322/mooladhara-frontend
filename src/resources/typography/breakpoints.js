import { createTheme } from '@mui/material/styles'

const breakpoints = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Extra small devices (portrait phones, less than 600px)
      sm: 600, // Small devices (landscape phones, 600px and up)
      md: 960, // Medium devices (tablets, 960px and up)
      lg: 1280, // Large devices (desktops, 1280px and up)
      xl: 1920, // Extra large devices (large desktops, 1920px and up)
    },
  },
})

export default breakpoints
