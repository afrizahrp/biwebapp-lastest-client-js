// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import 'src/configs/i18n'
import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

import AclGuard from 'src/layouts/components/auth/UserAclGuard'
import AuthGuard from 'src/layouts/components/auth/UserAuthGuard'
import GuestGuard from 'src/layouts/components/auth/UserGuestGuard'

import { SessionProvider } from 'next-auth/react'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles

import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style

import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles

import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader

if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj

  // const session = useSession()

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Activity Monitoring`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Bumi Indah Putra Workshop Activity Monitoring`}
          />
          <meta name='keywords' content='Bumi Indah Putra' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <SessionProvider session={pageProps.session}>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </AclGuard>
                    </Guard>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </SessionProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
