// ** React Imports
import { useState } from 'react'

// ** Next Imports
// import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import MuiCard from '@mui/material/Card'
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks

import BlankLayout from 'src/@core/layouts/BlankLayout'

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '80%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 370
  }
}))

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 375 }
}))

const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: '1234567',
  name: 'afriza'
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // ** Hooks
  const theme = useTheme()

  // const bgColors = useBgColor()
  // const { settings } = useSettings()
  // const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  // const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const { name, password } = data
    signIn('credentials', { name, password, redirect: false }).then(res => {
      if (res && res.ok) {
        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL)
      } else {
        setError('name', {
          type: 'manual',
          message: 'name or Password is invalid'
        })
      }
    })
  }

  const AppBrand = () => {
    return (
      <>
        <Image
          src={'/images/logo-bipmed.png'}
          width={200}
          height={110}
          alt='logo'
          priority
          style={{
            objectFit: 'cover',
            cursor: 'pointer',
            overflow: 'hidden',
            alignContent: 'center'
          }}
          onContextMenu={e => e.preventDefault()}
        />
      </>
    )
  }

  return (
    <Box className='content-center' sx={{ width: '100' }}>
      <Card sx={{ zIndex: 1, mt: 5 }}>
        {/* <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}> */}

        <Box
          sx={{
            p: 3,
            height: '   10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <AppBrand />

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Username'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      placeholder='Your name'

                      // inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.name' }}>{errors.name.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              ></Box>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                Login
              </Button>
            </form>
          </BoxWrapper>
        </Box>
      </Card>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
