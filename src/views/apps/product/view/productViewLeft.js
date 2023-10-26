// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Custom Components

import Image from 'next/image'

// import { Image } from 'next-cloudinary'

import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'

import ProductImageUploader from './ProductImageUploader'

const ProductViewLeft = ({ item_cd, item_descs, catalog_no, uom_cd, imgUrl1, imgUrl2, imgUrl3, imgUrl4, videoUrl }) => {
  const [selectedItem, setSelectedItem] = useState(item_cd)
  const [selectedItemDescs, setSelectedItemDescs] = useState('')
  const [selectedCatalogNo, setSelectedCatalogNo] = useState('')
  const [selectedUomCd, setSelectedUomCd] = useState('')

  const [selectedImgUrl, setSelectedImgUrl] = useState('')
  const [selectedImgOpt, setSelectedImgOpt] = useState('')
  const [imgUrlOpt, setImgUrlOpt] = useState('')

  // const [selectedImgOpt, setSelectedImgOpt] = useState('')
  // const [imgUrlOpt, setImgUrlOpt] = useState('')

  const [selectedImgUrl1, setSelectedImgUrl1] = useState(imgUrl1)
  const [selectedImgUrl2, setSelectedImgUrl2] = useState(imgUrl2)
  const [selectedImgUrl3, setSelectedImgUrl3] = useState(imgUrl3)
  const [selectedImgUrl4, setSelectedImgUrl4] = useState(imgUrl4)

  // const [selectedVideoImgUrl1, setVideoImgUrl1] = useState(imgUrl1)

  const [openViewImgDialog, setOpenViewImgDialog] = useState(false)

  const handleEditClickOpen = ({ imgUrl, selectedImgOpt }) => {
    setSelectedImgUrl(imgUrl)
    setSelectedImgOpt(selectedImgOpt)
    setOpenViewImgDialog(true)
  }

  const Img = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(10)
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 250
    },
    objectFit: 'contain'
  }))

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card
            sx={{
              width: '300',
              size: 'lg',
              display: 'flex',
              flexDirection: 'column',
              pt: 0,
              mt: -3
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mt: 0, display: 'flex', position: 'relative', size: '100%', alignItems: 'left' }}>
                <Typography variant='subtitle2' sx={{ color: 'text.primary', fontSize: '0.8rem' }}>
                  {item_descs
                    .split('/')
                    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                    .join('/')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}{' '}
                  ( {catalog_no})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', position: 'relative', size: '100%', mb: 3 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', fontSize: '0.75rem' }}>
                  Kode dan Katalog Produk : {item_cd} - {catalog_no}
                </Typography>
              </Box>
            </CardContent>

            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center horizontally
                justifyContent: 'center' // Center vertically
              }}
            >
              <Grid container spacing={3}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between' // To create space between images
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
                    <Grid item sm={4} xs={12} sx={{ margin: '0 10px' }}>
                      {imgUrl1 ? (
                        <Image
                          src={imgUrl1}
                          width={250}
                          height={170}
                          alt='productImageUrl'
                          priority
                          style={{
                            objectFit: 'contain',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            overflow: 'hidden',
                            margin: '0 12px'
                          }} // 'move'
                          onClick={() =>
                            handleEditClickOpen({
                              imgUrl: imgUrl1,
                              selectedImgOpt: 'imgUrl1'
                            })
                          }
                        />
                      ) : (
                        <CustomAvatar
                          skin='light'
                          variant='rounded'
                          color='primary'
                          sx={{ width: 250, height: 170, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                          onClick={() =>
                            handleEditClickOpen({
                              imgUrl: imgUrl1,
                              selectedImgOpt: 'imgUrl1'
                            })
                          }
                        >
                          {catalog_no}
                        </CustomAvatar>
                      )}
                      {/* </Box> */}
                    </Grid>

                    <Grid item sm={4} xs={12} sx={{ margin: '0 10px' }}>
                      {imgUrl2 ? (
                        <Image
                          src={imgUrl2}
                          width={250}
                          height={170}
                          alt='productImageUrl'
                          priority
                          style={{
                            objectFit: 'contain',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            overflow: 'hidden'
                          }} // 'move'
                          onClick={() =>
                            handleEditClickOpen({
                              imgUrl: imgUrl2,
                              selectedImgOpt: 'imgUrl2'
                            })
                          }
                        />
                      ) : (
                        <CustomAvatar
                          skin='light'
                          variant='rounded'
                          color='primary'
                          sx={{ width: 250, height: 170, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                          onClick={() =>
                            handleEditClickOpen({
                              imgUrl: imgUrl2,
                              selectedImgOpt: 'imgUrl2'
                            })
                          }
                        >
                          {catalog_no}
                          {/* {getInitials(item_descs.toUpperCase())} */}
                        </CustomAvatar>
                      )}
                    </Grid>

                    <Grid item sm={3} xs={12} sx={{ margin: '0 10px' }}>
                      {imgUrl3 ? (
                        <Image
                          src={imgUrl3}
                          width={250}
                          height={170}
                          alt='productImageUrl'
                          priority
                          style={{
                            objectFit: 'contain',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            overflow: 'hidden'
                          }} // 'move'
                          onClick={() =>
                            handleEditClickOpen({
                              imgUrl: imgUrl3,
                              selectedImgOpt: 'imgUrl3'
                            })
                          }
                        />
                      ) : (
                        <CustomAvatar
                          skin='light'
                          variant='rounded'
                          color='primary'
                          sx={{ width: 250, height: 170, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                          onClick={() =>
                            handleEditClickOpen({
                              item_descs: item_descs,
                              catalog_no: catalog_no,
                              uom_cd: uom_cd,
                              imgUrl: imgUrl3,
                              selectedImgOpt: 'imgUrl3'
                            })
                          }
                        >
                          {catalog_no}
                        </CustomAvatar>
                      )}
                    </Grid>
                    <Grid item sm={4} xs={12} sx={{ margin: '0 10px' }}>
                      {imgUrl4 ? (
                        <Image
                          src={imgUrl4}
                          width={250}
                          height={170}
                          alt='productImageUrl'
                          priority
                          style={{
                            objectFit: 'contain',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            overflow: 'hidden'
                          }} // 'move'
                          onClick={() =>
                            handleEditClickOpen({
                              item_descs: item_descs,
                              catalog_no: catalog_no,
                              uom_cd: uom_cd,
                              imgUrl: imgUrl4,
                              selectedImgOpt: 'imgUrl4'
                            })
                          }
                        />
                      ) : (
                        <CustomAvatar
                          skin='light'
                          variant='rounded'
                          color='primary'
                          sx={{ width: 250, height: 170, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                          onClick={() =>
                            handleEditClickOpen({
                              item_descs: item_descs,
                              catalog_no: catalog_no,
                              uom_cd: uom_cd,
                              imgUrl: imgUrl4,
                              selectedImgOpt: 'imgUrl4'
                            })
                          }
                        >
                          {catalog_no}
                        </CustomAvatar>
                      )}
                    </Grid>
                    <Grid item sm={4} xs={12} sx={{ margin: '0 10px' }}>
                      {videoUrl ? (
                        <Image
                          src={videoUrl}
                          width='100%'
                          height='100%'
                          alt='productImageUrl'
                          priority
                          style={{ objectFit: 'contain', cursor: 'pointer' }} // 'move'
                          onClick={() =>
                            handleEditClickOpen({
                              item_descs: item_descs,
                              catalog_no: catalog_no,
                              uom_cd: uom_cd,
                              videoUrl: videoUrl
                            })
                          }
                        />
                      ) : (
                        <CustomAvatar
                          skin='light'
                          variant='rounded'
                          color='primary'
                          sx={{ width: 250, height: 170, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                          onClick={() =>
                            handleEditClickOpen({
                              item_descs: item_descs,
                              catalog_no: catalog_no,
                              uom_cd: uom_cd,
                              videoUrl: videoUrl
                            })
                          }
                        >
                          {catalog_no}
                        </CustomAvatar>
                      )}
                    </Grid>
                  </Box>
                </div>
              </Grid>
            </CardContent>
          </Card>

          <ProductImageUploader
            open={openViewImgDialog}
            item_cd={item_cd}
            item_descs={item_descs}
            catalog_no={catalog_no}
            uom_cd={uom_cd}
            editItem_cd={item_cd}
            imgOpt={selectedImgOpt}
            imgUrl={selectedImgUrl}
            onClose={() => setOpenViewImgDialog(false)}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ProductViewLeft
