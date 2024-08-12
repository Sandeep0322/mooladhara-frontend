import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import comment from '../../resources/svg/comment.svg'
import CustomIcon from '../../custom_components/CustomIcon'

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#1e1e1e',
    borderRadius: '18px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: '20px',
    backgroundColor: '#222222',
    color: '#fff',
    borderRadius: '10px',
    marginBottom: '10px',
  },
}

const data = [
  {
    date: '29 Dec 2023',
    questions: [
      {
        question: 'What type of job suit me the best ?',
        answer:
          'With your steadfast and reliable nature, you excel in careers that require patience and perseverance. Your affinity for beauty and luxury might lead you to success in fields like finance, real estate, or the arts.',
      },
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
    ],
  },
  {
    date: '28 Dec 2023',
    questions: [
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
    ],
  },
  {
    date: '28 Dec 2023',
    questions: [
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
    ],
  },
  {
    date: '28 Dec 2023',
    questions: [
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
    ],
  },
  {
    date: '28 Dec 2023',
    questions: [
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
    ],
  },
  {
    date: '28 Dec 2023',
    questions: [
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
      {
        question: 'What type of job suit me the best ?',
        answer: '',
      },
    ],
  },
]

const History = () => {
  return (
    <Box sx={styles.container}>
      {data.map((day, index) => (
        <div key={index}>
          <Box sx={{ textAlign: 'left', pb: '24px', mt: '10px' }}>
            <Typography variant='body12'>{day.date}</Typography>
          </Box>

          {day.questions.map((item, idx) => (
            <Paper key={idx} sx={styles.paper}>
              <Accordion sx={{ backgroundColor: '#222222' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#FFFFFF' }} />}
                  aria-controls={`panel${index}-${idx}-content`}
                  id={`panel${index}-${idx}-header`}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                    }}
                  >
                    <CustomIcon src={comment} width={22} height={22} />{' '}
                    <Typography
                      variant='body1'
                      sx={{ textAlign: 'left', color: '#FFFFFF', ml: '16px' }}
                    >
                      {item.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <>
                    <Typography
                      variant='body1'
                      sx={{ textAlign: 'left', color: '#FFFFFF' }}
                    >
                      Answer :
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{ mt: '16px', textAlign: 'left', color: '#FFFFFF' }}
                    >
                      {item.answer || 'N/A'}
                    </Typography>
                  </>
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))}
        </div>
      ))}
    </Box>
  )
}

export default History
