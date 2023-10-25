import Box from '@mui/material/Box'
import SpkViewItemDetail from 'src/views/apps/spk/view/SpkViewItemDetail'
// import SpkViewOverView from './SpkViewOverview';

export default function SpkViewRight({ detailData, showActivities }) {
  return (
    <Box>
      {/* {!showActivities ? (
        <SpkViewOverView detailData={detailData} />
      ) : (
        detailData && <SpkViewItemDetail detailData={detailData} showActivities={showActivities} />
      )} */}

      {detailData && <SpkViewItemDetail detailData={detailData} showActivities={showActivities} />}
    </Box>
  )
}
