import { Box, Typography, Link } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { Image } from 'cloudinary-react'

import { styled } from '@mui/material/styles'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, open } from '@mui/material'
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
const FileUploader = ({ files, setFiles, imgUrl1, imageUrl, handleSubmit, handleEditClose }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  const HeadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4)
    }
  }))

  return (
    <Dialog open={open} onClose={handleEditClose} fullWidth maxWidth='md'>
      <DialogTitle>Upload Image</DialogTitle>
      <DialogContent sx={{ overflow: 'hidden' }}>
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
              <Box sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Image
                  cloudName='biwebapp' //{process.env.NEXT_CLOUDINARY_CLOUD_NAME}
                  publicId={imageUrl}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
              {imgUrl1 ? (
                <Image
                  cloudName='biwebapp' //{process.env.NEXT_CLOUDINARY_CLOUD_NAME}
                  publicId={imgUrl1}
                  style={{ width: '90%', height: '90%', objectFit: 'contain' }}
                />
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                  <Img width={250} alt='Upload img' src='/images/misc/upload.png' />
                  <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
                  <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                    Drop files here or click{' '}
                    <Link href='/' onClick={e => e.preventDefault()}>
                      browse
                    </Link>{' '}
                    thorough your machine
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
      <Box sx={{ mt: 1 }}>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            variant='contained'
            sx={{ mr: 1 }}
            onClick={() => {
              handleSubmit()
              handleEditClose()
            }}
          >
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleEditClose}>
            Discard
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default FileUploader
