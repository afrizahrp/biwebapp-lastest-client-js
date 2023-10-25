// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// ** MUI Imports
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import CircularProgress from '@mui/material/CircularProgress'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'

import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { getProductById, editProductImageUrl } from 'src/store/apps/product'

import { useDropzone } from 'react-dropzone'

import Link from 'next/link'

import { Video } from 'cloudinary-react'

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

const ProductVideoUploader = ({ open, item_cd, catalog_no, item_descs, uom_cd, imgUrl, onClose, imgOpt, videoUrl }) => {
  console.log('imgOpt', imgOpt)

  const editItem_cd = item_cd
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const [videoPublicId, setVideoPublicId] = useState(videoUrl)
  const cloudinaryBaseUrl = 'https://res.cloudinary.com/biwebapp/video/upload' // Replace 'biwebapp' with your Cloudinary cloud name

  const [isEdit, setIsEdit] = useState(true)
  const [editImgUrl, setEditImgUrl] = useState(imgUrl)
  const [files, setFiles] = useState([])
  const [previewUrl, setPreviewUrl] = useState('')
  const [dialogClosed, setDialogClosed] = useState(false)

  const dispatch = useDispatch()

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'video/*': ['.mp4', '.mkv', '.mov']
    },
    onDrop: async acceptedFiles => {
      const file = acceptedFiles[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'upload')

      setIsUploading(true)

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/biwebapp/video/upload', // Use the correct Cloudinary video upload URL
          formData,
          {
            onUploadProgress: progressEvent => {
              const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
              setUploadProgress(progress)
            }
          }
        )

        const data = await response.data
        setVideoPublicId(data.public_id)
        console.log('Video uploaded:', videoPublicId)
      } catch (error) {
        console.error('Error uploading video:', error)
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
      if (imgOpt === 'videoUrl') {
        product.videoUrl = videoPublicId
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
        console.log('product', product)
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
          sx={{
            '& .MuiPaper-root': { display: 'flex', flexDirection: 'column', width: '600', height: '600', p: [3, 5] }
          }}
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
                  // Display the uploaded video
                  <video
                    controls // This attribute enables video controls
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  >
                    <source
                      src={`${cloudinaryBaseUrl}/${videoPublicId}.mp4`} // Construct the video's Cloudinary URL
                      type='video/mp4'
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                    {videoUrl ? (
                      <Video
                        cloudName='biwebapp' // Replace with your actual Cloudinary cloud name
                        publicId={videoUrl} // Construct the video's Cloudinary URL
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
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
                        {/* <HeadingTypography variant='h5'>Seret file kesini atau klik upload.</HeadingTypography> */}
                        <Typography
                          color='textSecondary'
                          sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}
                        >
                          Seret file atau klik{' '}
                          <Link href='/' onClick={e => e.preventDefault()}>
                            Telusuri
                          </Link>{' '}
                          device kamu
                          <AddAPhotoOutlinedIcon />
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

export default ProductVideoUploader
