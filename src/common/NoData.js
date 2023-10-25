import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

const NoData = () => {
  return (
    <Grid container justifyContent='center' alignItems='center'>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ p: 3 }}>
            <Typography variant='h6' align='center'>
              No Data
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default NoData
