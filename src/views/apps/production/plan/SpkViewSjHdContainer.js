import Box from '@mui/material/Box'
import SpkViewSjHd from 'src/views/apps/production/plan/SpkViewSjHd'

export default function SpkViewSjContainer({ sjhdData }) {
  return <Box>{sjhdData !== null && <SpkViewSjHd sjhdData={sjhdData} />}</Box>
}
