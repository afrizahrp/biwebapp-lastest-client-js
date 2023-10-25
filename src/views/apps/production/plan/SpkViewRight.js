import Box from '@mui/material/Box'
import SpkViewItemDetail from 'src/views/apps/production/plan/SpkViewItemDetail'

export default function SpkViewRight({ detailData, showActivities }) {
  return <Box>{detailData && <SpkViewItemDetail detailData={detailData} showActivities={showActivities} />}</Box>
}
