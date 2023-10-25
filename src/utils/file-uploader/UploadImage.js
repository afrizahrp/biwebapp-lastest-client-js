import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState('')

  const onDrop = async acceptedFiles => {
    const file = acceptedFiles[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'upload')

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/doplpdqoa/image/upload', formData)
      setImageUrl(response.data.secure_url)
      console.log('imageUrl', imageUrl)
    } catch (error) {
      console.error(error)
    }
  }
  const handleEditClose = () => {
    return onDrop
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  })

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here ...</p> : <p>Drag 'n' drop an image here, or click to select an image</p>}
      {imageUrl && <img src={imageUrl} alt='Uploaded image' />}
    </Box>
  )
}

export default UploadImage
