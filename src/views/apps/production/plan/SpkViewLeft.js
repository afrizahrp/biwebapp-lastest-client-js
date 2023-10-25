// ** React Imports
import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomChip from 'src/@core/components/mui/chip'
import moment from 'moment'

const statusColors = {
  // Completed: 'primary',
  // Progress: 'success',
  // Expired: 'error',
  // Warning: 'warning'
  1: 'warning',
  3: 'success',
  9: 'primary',
  13: 'error'
}

const Paragraph = styled('p')(({ theme }) => ({
  marginBottom: theme.spacing(1) // Atur jarak antar paragraf di sini
}))

const SpkViewLeft = ({ spk_id, cust_name, spk_date, expected_date, status, status_name, spk_typeName, item_count }) => {
  // const [expanded, setExpanded] = useState(false)

  let spkDate = moment(spk_date)
  spkDate = spkDate.format('DD MMM YYYY')

  let expectedDate = moment(expected_date)
  expectedDate = expectedDate.format('DD MMM YYYY')

  return (
    <>
      <Card
        sx={{
          width: '100%',
          left: 100,
          // height: { xs: '90%', sm: 'auto', md: 'auto' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          size: 'small',
          display: 'flex',
          flexDirection: 'column',
          height: '205px'
        }}
      >
        <CardContent sx={{ pt: 0, pl: 0, mb: 5, mr: 5, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', position: 'relative', size: '100%' }}>
            <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.8rem', color: 'text.primary' }}>
              <CustomChip
                skin='light'
                size='medium'
                alignItems='left'
                color={statusColors[status]}
                label={spk_id}
                sx={{ fontSize: '1rem', borderRadius: '4px', width: '100%', pt: 0 }}
              />
            </Typography>
          </Box>
          {/* <Divider sx={{ mt: 1 }} /> */}
          <Box sx={{ display: 'flex', width: '100%', pt: 2, ml: 2 }}>
            <Typography
              variant='subtitle2'
              sx={{ color: 'text.primary', fontSize: '0.8rem', fontStyle: 'italic', whiteSpace: 'pre-wrap' }}
            >
              Customer: {cust_name}
            </Typography>
            {cust_name.length < 20 && (
              <Typography
                variant='subtitle2'
                sx={{
                  color: 'text.primary',
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  whiteSpace: 'break-spaces',
                  ml: 2
                }}
              >
                {' '}
                {/* Add your extra paragraph here */}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', width: '100%', pt: 2, ml: 2 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', fontSize: '0.75rem' }}>
              Expected Date: {moment(expected_date).format('DD MMM YYYY')}
            </Typography>
          </Box>
          {/* </CardContent>
                <CardContent> */}
          <Divider sx={{ mt: 1 }} />
          <Box sx={{ display: 'flex', width: '100%', ml: 2, pt: 0 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.75rem', color: 'text.primary' }}>
              Spk Date : {moment(spk_date).format('DD MMM YYYY')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', ml: 2, pt: 0 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.75rem', color: 'text.primary' }}>
              Qty : {item_count} item{item_count > 1 && 's'}
            </Typography>
          </Box>{' '}
          <Box sx={{ display: 'flex', mb: 1, ml: 2 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.75rem', color: 'text.primary' }}>
              Status :
            </Typography>
            <CustomChip
              skin=''
              color={statusColors[status]}
              size='small'
              label={status_name}
              sx={{
                height: 20,
                fontSize: '0.75rem',
                fontWeight: 400,
                borderRadius: '5px',
                textTransform: 'capitalize'
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default SpkViewLeft
