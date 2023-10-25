// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Image } from 'cloudinary-react'

// Styled component for the upload image inside the dropzone area
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

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderSingle = ({ onImageSubmit }) => {
  // ** State
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('')
  const [files, setFiles] = useState([])

  const [previewUrl, setPreviewUrl] = useState('')

  // ** Hook
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

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/doplpdqoa/image/upload', formData)
        const data = await response.data
        setImageUrl(data.url)
        console.log('Files', files)
      } catch (error) {
        console.error('Error:', error)
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

  return (
    <Box
      {...getRootProps({ className: 'dropzone' })}
      sx={
        files.length
          ? {
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
              // alignItems: 'flex-start'
            }
          : {}
      }
    >
      <input {...getInputProps()} />
      {files.length ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Image
              cloudName='doplpdqoa' //{process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
              publicId={imageUrl}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Img width={250} alt='Upload img' src='/images/misc/upload.png' />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
            <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
              Drop files here or click{' '}
              <Link href='/' onClick={e => e.preventDefault()}>
                browse
              </Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default FileUploaderSingle
