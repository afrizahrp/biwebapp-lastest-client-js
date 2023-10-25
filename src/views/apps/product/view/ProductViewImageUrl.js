// ** React Imports
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** MUI Imports
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CircularProgress from '@mui/material/CircularProgress'

import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { getProductById, editProductImageUrl } from 'src/store/apps/product'

import { useDropzone } from 'react-dropzone'

// import { toast } from 'react-toastify'

import Link from 'next/link'

import { CldImage } from 'next-cloudinary'

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

const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const ProductViewImageUrl = ({
  open,
  item_cd,
  catalog_no,
  item_descs,
  uom_cd,
  imgUrl1,
  imgUrl2,
  imgUrl3,
  imgUrl4,
  videoUrl,
  onClose
}) => {
  const editItem_cd = item_cd

  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const [imageUrl, setImageUrl] = useState(imgUrl1)

  const [imageUrl2, setImageUrl2] = useState(imgUrl2)

  const [imageUrl3, setImageUrl3] = useState(imgUrl3)

  const [imageUrl4, setImageUrl4] = useState(imgUrl4)

  // const [videoUrl, setVideoUrl] = useState(videoUrl)

  const [isEdit, setIsEdit] = useState(true)
  const [editImgUrl1, setEditImgUrl1] = useState(imgUrl1)
  const [files, setFiles] = useState([])
  const [previewUrl, setPreviewUrl] = useState('')
  const [dialogClosed, setDialogClosed] = useState(false)

  const dispatch = useDispatch()

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: async acceptedFiles => {
      const file = acceptedFiles[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'upload')

      setFiles(acceptedFiles.map(file => Object.assign(file)))
      setIsUploading(true)

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/biwebapp/image/upload', formData, {
          onUploadProgress: progressEvent => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
            setUploadProgress(progress)
          }
        })

        const data = await response.data
        setImageUrl(data.url)
        setEditImgUrl1(data.url) // Use data.url directly here
      } catch (error) {
        console.log(error)
      } finally {
        setIsUploading(false)
      }
    }
  })

  useEffect(() => {
    if (files.length > 0) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }, [files])

  const handleClose = () => {
    setDialogClosed(true)
    onClose()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isEdit) {
      const product = {}
      if (imgOpt === 'imgUrl1') {
        product.imgUrl1 = 'xxxxxx' //imageUrl
      } else if (imgOpt === 'imgUrl2') {
        product.imgUrl2 = imageUrl
      } else if (imgOpt === 'imgUrl3') {
        product.imgUrl3 = imageUrl
      } else if (imgOpt === 'imgUrl4') {
        product.imgUrl4 = imageUrl
      }
      try {
        dispatch(editProductImageUrl({ item_cd: editItem_cd, product }))
          .then(() => {
            dispatch(getProductById({ item_cd: editItem_cd }))
            handleClose()
          })
          .catch(error => {
            console.error('Edit failed:', error)
          })
      } catch (error) {
        console.error('Edit failed:', error)
      }
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby='user-view-edit'
          sx={{ '& .MuiPaper-root': { width: '100%', height: '100%', p: [1, 5] } }}
          aria-describedby='user-view-edit-description'
        >
          <Box sx={{ display: 'flex', position: 'relative', size: '100%' }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', fontSize: '0.75rem' }}>
              Kode dan Katalog Produk : {item_cd} - {catalog_no}
            </Typography>
          </Box>
          {/* <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', fontSize: '0.75rem' }}>
                Kode dan Katalog Produk : {item_cd} - {catalog_no}
              </Typography> */}
          <Box sx={{ display: 'flex', position: 'relative', size: '100%' }}>
            Produk :{' '}
            {item_descs
              .split('/')
              .map(part => part.charAt(0).toUpperCase() + part.slice(1))
              .join('/')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </Box>

          <DialogContent sx={{ overflow: 'hidden' }}>
            {isUploading ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '580px'
                }}
              >
                <CircularProgress variant='determinate' value={uploadProgress} />
                <Typography variant='caption'>{uploadProgress}% Uploaded</Typography>
              </Box>
            ) : (
              <Box
                {...getRootProps({ className: 'dropzone' })}
                sx={
                  files.length
                    ? {
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                      }
                    : {}
                }
              >
                <input {...getInputProps()} />
                {files.length ? (
                  <Box sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <CldImage
                      cloudName='biwebapp' //{process.env.NEXT_CLOUDINARY_CLOUD_NAME}
                      publicId={imageUrl}
                      style={{ width: '580px', height: '580px', objectFit: 'contain' }}
                    />
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                    {imgUrl1 ? (
                      <CldImage
                        cloudName='biwebapp' //{process.env.NEXT_CLOUDINARY_CLOUD_NAME}
                        publicId={imgUrl1}
                        style={{ width: '580px', height: '580px', objectFit: 'contain' }}
                      />
                    ) : (
                      <Box
                        sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}
                      >
                        <Img width={580} height={500} alt='Upload img' src='/images/misc/upload.png' />
                        <HeadingTypography variant='h5'>Seret file kesini atau klik upload.</HeadingTypography>
                        <Typography
                          color='textSecondary'
                          sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}
                        >
                          Seret file atau klik{' '}
                          <Link href='/' onClick={e => e.preventDefault()}>
                            Telusuri
                          </Link>{' '}
                          Device kamu
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>

          <Box sx={{ mt: 1 }}>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 1 }} onClick={handleSubmit}>
                Simpan
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleClose}>
                Tutup
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default ProductViewImageUrl
