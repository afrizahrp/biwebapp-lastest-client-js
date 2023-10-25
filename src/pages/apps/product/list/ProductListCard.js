// ** React Imports
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import CardActions from '@mui/material/CardActions'
import { CardActionArea } from '@mui/material'

import Button from '@mui/material/Button'

import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'

import { CldImage } from 'next-cloudinary'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { Paginate } from 'src/utils/Paginate'
import Tooltip from '@mui/material/Tooltip'

import Link from 'next/link'

import TablePagination from '@mui/material/TablePagination'

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.5rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const Paragraph = styled('p')(({ theme }) => ({
  marginBottom: theme.spacing('0.5px')
}))

const ProductListCard = ({ allProducts, totalProduct }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const allData = Paginate(allProducts, currentPage, pageSize)

  return (
    <>
      <TablePagination
        rowsPerPageOptions={[12, 25, 100]}
        component='div'
        count={totalProduct} // jumlah total postingan
        page={currentPage - 1} // jumlah postingan per halaman
        onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
        rowsPerPage={12}
        onRowsPerPageChange={e => setPageSize(parseInt(e.target.value, 12))}
      />
      <Grid container spacing={2}>
        {allData.map(product => (
          <Grid item key={product.item_cd} xs={12} sm={3}>
            <Card
              sx={{
                marginTop: '10px',
                size: 'small',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <StyledLink href={`/apps/product/view/${product.item_cd}`}>
                <CardActionArea>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {product.imgUrl1 ? (
                      <CldImage
                        src={product.imgUrl1}
                        width={250}
                        height={170}
                        alt='productImageUrl'
                        priority
                        style={{
                          objectFit: 'contain',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          margin: '0 12px'
                        }}
                      />
                    ) : (
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        color='primary'
                        sx={{ width: 250, height: 170, fontWeight: 600, fontSize: '1rem' }}
                      >
                        {getInitials(product.item_descs.toUpperCase())}
                      </CustomAvatar>
                    )}

                    {/* <CardMedia component='img' height='200' width='280' image={product.imgUrl1} alt='productImageUrl' /> */}
                  </Box>

                  <CardContent
                    sx={{
                      pt: 0,
                      pl: 0,
                      mb: 5,
                      mr: 5,
                      display: 'flex',
                      alignItems: 'left',
                      flexDirection: 'column',
                      fontSize: '0.8rem'
                    }}
                  >
                    <p>
                      <Box sx={{ display: 'flex', width: '100%', ml: 2 }}>
                        <Tooltip title={product.item_descs}>
                          <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', fontSize: '0.75rem' }}>
                            {product.item_cd} - {product.catalog_no}
                          </Typography>
                        </Tooltip>
                      </Box>

                      <Box sx={{ display: 'flex', width: '100%', ml: 2 }}>
                        <Tooltip title={product.item_descs}>
                          <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.75rem', color: 'text.primary' }}>
                            {product.item_descs.length > 20
                              ? `${product.item_descs.substring(0, 20)}...`
                              : product.item_descs}
                          </Typography>
                        </Tooltip>
                      </Box>
                    </p>
                  </CardContent>
                </CardActionArea>
              </StyledLink>
            </Card>
          </Grid>
        ))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[12, 25, 100]}
        component='div'
        count={totalProduct} // jumlah total postingan
        page={currentPage - 1} // jumlah postingan per halaman
        onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
        rowsPerPage={12}
        onRowsPerPageChange={e => setPageSize(parseInt(e.target.value, 12))}
      />
    </>
  )
}

export default ProductListCard
