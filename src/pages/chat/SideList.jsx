import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import React from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import HistoryIcon from '@mui/icons-material/History'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

const styles = {
  container: {
    width: '100%',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
}

const items = [
  { text: 'Ask', icon: <ChatBubbleOutlineIcon /> },
  { text: 'History', icon: <HistoryIcon /> },
  { text: 'Horoscope', icon: <NightsStayIcon /> },
  { text: 'Profile', icon: <PersonOutlineIcon /> },
]

const SideList = ({ selectedIndex, setSelectedIndex }) => {
  const handleListItemClick = (index) => {
    setSelectedIndex(index)
  }

  return (
    <Paper elevation={3} sx={styles.container}>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ mt: '10px' }}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                height: '48px',
                color: '#fff',
                ...(selectedIndex === index && {
                  backgroundColor: '#E3418B !important',
                  borderRadius: '42px',
                }),
              }}
            >
              <ListItemIcon>
                {React.cloneElement(item.icon, {
                  sx: { color: '#fff' },
                })}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default SideList
