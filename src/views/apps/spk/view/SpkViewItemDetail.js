import { useState, Fragment, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { styled } from '@mui/material/styles'

import SpkViewActivityContainer from 'src/views/apps/spk/view/SpkViewActivityContainer'
function Row(props) {
  const { row, showActivities } = props
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {showActivities && (
          <TableCell>
            <IconButton aria-label='expand row' size='small' onClick={handleClick}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        <TableCell component='th' scope='row' sx={{ width: 100 }}>
          {row.Item_cd}
        </TableCell>
        <TableCell component='th' scope='row' sx={{ width: 170 }}>
          {row.catalog_no}
        </TableCell>

        {<TableCell sx={{ width: 440 }}>{row.item_descs}</TableCell>}
        <TableCell>
          {row.spk_qty} {row.uom_cd}
        </TableCell>
        {/* <TableCell>{row.uom_cd}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Production Activities
              </Typography>

              {/* <TimelineOutlined /> */}
              <SpkViewActivityContainer spk_id={row.spk_id} catalog_no={row.catalog_no} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default function SpkViewItemDetail({ detailData, showActivities }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))
  return (
    <Card>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table' size='small'>
          <TableHead sx={{ backgroundColor: 'customColors.tableHeaderBg' }}>
            <TableRow sx={{ pt: 0, top: 0, mt: 0 }}>
              {showActivities && <TableCell />}
              {/* <TableCell /> */}
              <TableCell>Item Cd</TableCell>

              <TableCell>Catalog No</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Qty</TableCell>
              {/* <TableCell>Uom</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {detailData.map(row => (
              <Row key={row.item_cd} row={row} showActivities={showActivities} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
