// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import 'react-datepicker/dist/react-datepicker.css'

import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useRouter } from 'next/router'

import FormRow from 'src/utils/FormRow'

// import EditProductComponent from 'src/pages/apps/product/edit/editProductComponent'

import { fetchProductComponent, setEditProductComponent, editProductComponent } from 'src/store/apps/productComponent'
import { useDispatch, useSelector } from 'react-redux'
import UploadImage from 'src/utils/file-uploader/UploadImage'

const ProductViewAttachmentUrl = ({ item_cd, attachmentUrl1, attachmentUrl2, attachmentUrl3 }) => {
  // const router = useRouter()

  const { tkdn_pctg, bmp_pctg, isEdit, editItem_cd } = useSelector(store => store.productComponent)
  const [editTkdnPctg, setEditTkdnPctg] = useState(tkdn_pctg)
  const [editBmpPctg, setEditBmpPctg] = useState(bmp_pctg)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProductComponent(item_cd))
  }, [dispatch, item_cd])

  const handleClick = () => {
    router.push('/apps/product/edit/editProductComponent')
  }

  const handleClickEdit = () => {
    dispatch(setEditProductComponent({ isEdit: true, editItem_cd: item_cd }))
    // dispatch(setEditProductComponent({ isEdit: true, editItem_cd: item_cd, tkdn_pctg: editTkdnPctg, editBmpPctg }))

    setOpenEditDialog(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (isEdit) {
      dispatch(
        editProductComponent({
          item_cd: editItem_cd,
          productComponent: {
            tkdn_pctg: editTkdnPctg,
            bmp_pctg: editBmpPctg
          }
        })
      )
        .then(() => {
          dispatch(fetchProductComponent(item_cd))
        })
        .catch(error => {
          console.error(error)
        })
      setOpenEditDialog(false)
      return
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={8}>
                <Box sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: 500, mb: 0, fontSize: '1.25em' }}>Attachments:</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ mb: 5, alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 500, mb: 0, fontSize: '1.5em', textAlign: 'left', mt: -3 }}>
                    {attachmentUrl1}
                  </Typography>
                </Box>
                <Box sx={{ mb: 1, alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 500, mb: 0, fontSize: '1.5em', textAlign: 'left', mt: -3 }}>
                    {attachmentUrl2}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
            {/* <Button variant='contained' onClick={handleClickEdit}>
              Edit
            </Button> */}

            <Button variant='contained' onClick={handleClick}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          aria-labelledby='item-specification-edit'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 450 } }}
          aria-describedby='item-specification-edit-description'
        >
          <DialogTitle
            id='item-specification-edit'
            sx={{
              textAlign: 'left',
              fontSize: '1.25rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(0)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(1)} !important`],
              pb: theme => [`${theme.spacing(2)} !important`, `${theme.spacing(1)} !important`]
            }}
          ></DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(10)} !important`,

              pt: theme => `${theme.spacing(10)} !important`,
              px: theme => [`${theme.spacing(10)} !important`, `${theme.spacing(15)} !important`],
              alignItems: 'center',
              textAlign: 'center' // Add this line to center the content
            }}
          >
            <form onSubmit={handleSubmit} alignItems='center'>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TextField
                    name='tkdn_pctg'
                    label='Input or edit TKDN percentage here'
                    type='number'
                    margin='normal'
                    fullWidth
                    value={editTkdnPctg}
                    onChange={e => setEditTkdnPctg(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='bmp_pctg'
                    label='Input or edit BMP percentage here'
                    type='number'
                    margin='normal'
                    fullWidth
                    value={editBmpPctg}
                    onChange={e => setEditBmpPctg(e.target.value)}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(3)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            {/* {successMessage && <Alert severity='success' onClose={() => setSuccessMessage(null)}></Alert>} */}

            <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setOpenEditDialog(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        {/* </Card> */}
      </Grid>
    </Grid>
  )
}

export default ProductViewAttachmentUrl
