import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Logo = ({ fontSize, fontWeight }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant='h6' component='h1' alignContent={'center'} sx={{ ml: 4 }}>
        <span
          style={{
            fontStyle: 'italic',
            fontSize: { fontSize }, //'1.85rem',
            fontWeight: { fontWeight }, //'600',
            color: '#045693'
          }}
        >
          bip
        </span>{' '}
        <span
          style={{
            // fontWeight: 'bold',
            fontSize: { fontSize }, //'1.45rem',
            color: '#83BB52',
            fontWeight: { fontWeight } // '600'
          }}
        >
          MED
        </span>{' '}
      </Typography>
    </Box>
  )
}

export default Logo
