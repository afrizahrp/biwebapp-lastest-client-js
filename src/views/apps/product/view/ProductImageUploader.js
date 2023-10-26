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

import Image from 'next/image'
// import { Image } from 'cloudinary-react'
// import { Image } from 'next-cloudinary'

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

const ProductImageUploader = ({ open, item_cd, catalog_no, item_descs, uom_cd, imgUrl, onClose, imgOpt, videoUrl }) => {
  const editItem_cd = item_cd
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const [isEdit, setIsEdit] = useState(true)
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

  const handleSubmit = e => {
    e.preventDefault()
    if (isEdit) {
      const product = {}
      if (imgOpt === 'imgUrl1') {
        product.imgUrl1 = imageUrl
      } else if (imgOpt === 'imgUrl2') {
        product.imgUrl2 = imageUrl
      } else if (imgOpt === 'imgUrl3') {
        product.imgUrl3 = imageUrl
      } else if (imgOpt === 'imgUrl4') {
        product.imgUrl4 = imageUrl
      } else if (imgOpt === 'videoUrl') {
        product.videoUrl = videoUrl
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

  const handleDelete = async e => {
    e.preventDefault()
    if (isEdit) {
      const product = {}
      if (imgOpt === 'imgUrl1') {
        product.imgUrl1 = null
      } else if (imgOpt === 'imgUrl2') {
        product.imgUrl2 = null
      } else if (imgOpt === 'imgUrl3') {
        product.imgUrl3 = null
      } else if (imgOpt === 'imgUrl4') {
        product.imgUrl4 = null
      } else if (imgOpt === 'videoUrl') {
        product.videoUrl = null
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
          sx={{ '& .MuiPaper-root': { width: '100%', height: '100%', maxWidth: 580, maxHeight: 580, p: [1, 5] } }}
          aria-describedby='user-view-edit-description'
        >
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
                    <Image
                      src={imageUrl}
                      width={580}
                      height={400}
                      alt='productImageUrl'
                      priority
                      style={{
                        objectFit: 'contain',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        margin: '0 12px'
                      }}
                    />
                  </Box>
                ) : (
                  <Box sx={{ flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                    {Image ? (
                      <Image
                        src={imgUrl}
                        width={580}
                        height={400}
                        alt='productImageUrl'
                        priority
                        style={{
                          objectFit: 'contain',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          alignItems: 'center'
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          textAlign: ['center', 'center', 'inherit'],
                          margin: 'auto'
                        }}
                      >
                        <Typography
                          color='textSecondary'
                          sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}
                        >
                          Seret file atau klik{' '}
                          <Link href='/' onClick={e => e.preventDefault()}>
                            Browse
                          </Link>{' '}
                          perangkat kamu
                        </Typography>
                        <Img width='100%' height='100%' alt='Upload img' src='/images/misc/upload.png' />

                        {/* <HeadingTypography variant='h5'>Seret file kesini atau klik upload.</HeadingTypography> */}
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>

          <Box sx={{ mt: 1 }}>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button variant='outlined' sx={{ mr: 1 }} onClick={handleDelete}>
                Hapus
              </Button>
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

export default ProductImageUploader
