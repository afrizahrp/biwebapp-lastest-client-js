import axios from 'axios'
import { useState, useEffect, Fragment } from 'react'
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
import moment from 'moment'

function Row(props) {
  const { row, doc_id } = props
  const [open, setOpen] = useState(false)
  const sjDate = moment(row.sj_date).format('DD MMM YYYY')

  const handleClick = () => {
    setOpen(!open)
    console.log('open: ')
  }

  const docId = encodeURIComponent(row.doc_id)
  console.log('doc_id: ', docId)

  const [error, setError] = useState(false)

  const [sjdtData, setsjdtData] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/icDocsjdt/${docId}`)

      .then(response => {
        setsjdtData(response.data)
        setError(false)
      })
      .catch(error => {
        setsjdtData(null)
        console.log(error)
      })
  }, [doc_id])

  // ** Styled <sup> component
  const Sup = styled('sup')(({ theme }) => ({
    top: '0.2rem',
    left: '-0.6rem',
    position: 'absolute',
    color: theme.palette.primary.main
  }))

  // useEffect(() => {
  //   console.log('open: ', open)
  // }, [open])

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* {showActivities && ( */}
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={handleClick}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align='right'>
          <Typography variant='subtitle' component='th' scope='row'>
            {row.doc_id}
          </Typography>
        </TableCell>

        {
          <TableCell>
            <Typography variant='subtitle' component='th' scope='row'>
              {sjDate}
            </Typography>
          </TableCell>
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1, ml: 50 }}>
              <Table size='small' aria-label='purchases' sx={{ alignItems: 'right' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Catalog No</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Qty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sjdtData.map(row => (
                    <TableRow key={row.doc_id}>
                      <TableCell component='th' scope='row' align='left'>
                        <Typography variant='body2'>{row.catalog_no}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'> {row.item_descs}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        {' '}
                        <Typography variant='body2'>
                          {' '}
                          {row.sj_qty} {row.uom_cd}{' '}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default function SpkViewSJ({ sjhdData }) {
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
    <Card sx={{ mt: 5, width: '100%', size: 'lg' }}>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table' size='small'>
          <TableHead sx={{ backgroundColor: 'customColors.tableHeaderBg' }}>
            <TableRow sx={{ pt: 0, top: 0, mt: 0 }}>
              <TableCell />
              <TableCell>Sj No</TableCell>
              <TableCell>Sj Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sjhdData.map(row => (
              <Row key={row.doc_id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
