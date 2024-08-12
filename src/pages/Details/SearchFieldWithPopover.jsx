import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Box, useMediaQuery } from '@mui/material'
import { themeColors } from '../../resources/typography/colors'
import { statesCoordinates } from '../states'

const SearchFieldWithAutocomplete = ({ setSelectedPlace }) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const [search, setSearch] = useState('')
  const [selectedText, setSelectedText] = useState(null) // Update to store object

  const handleInputChange = (event, newInputValue) => {
    setSearch(newInputValue)
  }

  const handleChange = (event, newValue) => {
    const selectedState = statesCoordinates.find(
      (state) => state.state === newValue
    )
    setSelectedPlace(selectedState ? selectedState : newValue)
    setSearch('')
    setSelectedText(selectedState) // Store selected state with coordinates
  }

  const getTextFieldFontSize = () => {
    return mobile ? '12px' : '15px'
  }

  return (
    <Box
      sx={{
        backgroundColor: selectedText
          ? themeColors.palette.customColor.main
          : 'transparent',
        transition: 'background-color 0.3s ease',
        borderRadius: '7px',
      }}
    >
      <Autocomplete
        freeSolo
        value={search}
        onInputChange={handleInputChange}
        onChange={handleChange}
        options={statesCoordinates.map((state) => state.state)} // Use state names as options
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='Search your birth place'
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon
                    sx={{
                      color: 'white',
                      width: mobile ? 18 : 24,
                      height: mobile ? 18 : 24,
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                height: '44px',
                paddingTop: 0,
                paddingBottom: 0,
                color: 'white',
                borderRadius: '7px',
                fontSize: getTextFieldFontSize(), // Set font size based on mobile/desktop
              },
            }}
            InputLabelProps={{
              sx: { color: 'white' },
            }}
            sx={{
              width: '100%',
              height: '44px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: themeColors.palette.customColor.main,
                },
                '&.Mui-focused': {
                  color: 'white',
                },
              },
            }}
          />
        )}
        ListboxProps={{ sx: { maxHeight: 200, overflow: 'auto' } }}
        clearIcon={<CloseIcon sx={{ color: 'white' }} />}
      />
    </Box>
  )
}

export default SearchFieldWithAutocomplete
