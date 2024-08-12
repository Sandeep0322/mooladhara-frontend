import React, { useState, useEffect } from 'react'
import { Box, Typography, Modal } from '@mui/material'
import dayjs from 'dayjs'
import leftArrow from '../resources/svg/leftRoundArrow.svg'
import rightArrow from '../resources/svg/rightRoundArrow.svg'
import CustomIcon from './CustomIcon'

const CustomDatepicker = ({ open, onClose, selectedDate, onDateChange }) => {
  const [date, setDate] = useState(dayjs())

  useEffect(() => {
    if (selectedDate) {
      setDate(dayjs(selectedDate))
    }
  }, [selectedDate])

  const handlePrevMonth = () => {
    setDate(date.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setDate(date.add(1, 'month'))
  }

  const handleDateClick = (day) => {
    const newDate = date.date(day)
    onDateChange(newDate)
    onClose()
  }

  const renderDays = () => {
    const startOfMonth = date.startOf('month').day()
    const daysInMonth = date.daysInMonth()
    const days = []

    for (let i = 0; i < startOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className='day empty'></div>)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = date.date(i)
      const isSelected = selectedDate && currentDate.isSame(selectedDate, 'day')
      days.push(
        <Typography
          key={i}
          className={`day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(i)}
          sx={{ fontWeight: 700, fontSize: '18px' }}
        >
          {i}
        </Typography>
      )
    }

    return days
  }

  const renderWeekdays = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return weekdays.map((day, index) => (
      <Typography
        key={index}
        sx={{
          fontSize: '16px',
          color: '#7A7A7A',
          fontWeight: 500,
          pr: '20px',
          m: 0,
        }}
      >
        {day}
      </Typography>
    ))
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='datepicker-modal'>
        <Box className='datepicker-header'>
          <Typography sx={{ fontWeight: 700, fontSize: '23px' }}>
            {date.format('MMMM YYYY')}
          </Typography>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <CustomIcon
              src={leftArrow}
              width={30}
              height={30}
              onClick={handlePrevMonth}
            />
            <CustomIcon
              src={rightArrow}
              width={30}
              height={30}
              onClick={handleNextMonth}
            />
          </Box>
        </Box>
        <Box className='datepicker-weekdays'>{renderWeekdays()}</Box>
        <Box className='datepicker-grid'>{renderDays()}</Box>
      </Box>
    </Modal>
  )
}

export default CustomDatepicker
