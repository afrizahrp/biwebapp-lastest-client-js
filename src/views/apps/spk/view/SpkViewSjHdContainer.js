import Box from '@mui/material/Box'
import SpkViewSjHd from 'src/views/apps/spk/view/SpkViewSjHd'

export default function SpkViewSjContainer({ sjhdData }) {
  return <Box>{sjhdData !== null && <SpkViewSjHd sjhdData={sjhdData} />}</Box>
}
