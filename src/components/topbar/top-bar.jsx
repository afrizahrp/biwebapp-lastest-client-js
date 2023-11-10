import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next' // MUI ICON COMPONENTS
import Twitter from '@mui/icons-material/Twitter'
import Facebook from '@mui/icons-material/Facebook'
import Instagram from '@mui/icons-material/Instagram'

// import { Span } from 'components/Typography';
import { FlexBetween, FlexBox } from 'src/components/flex-box' // STYLED COMPONENTS
import { StyledContainer, StyledRoot } from './styles' // ==============================================================

// import Logo from 'components/Logo'

// import ExpandMore from '@mui/icons-material/ExpandMore'; // GLOBAL CUSTOM COMPONENTS
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'

// import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton'

// import TouchRipple from '@mui/material/ButtonBase';
// import BazaarMenu from 'components/BazaarMenu';

// ==============================================================
// LANGUAGE OPTIONS
const languageOptions = {
  en: {
    title: 'EN',
    value: 'en'
  },
  es: {
    title: 'DE',
    value: 'de'
  }
} // ===========================================

// ===========================================
const Topbar = ({ bgColor }) => {
  const { i18n, t } = useTranslation()
  const [expand, setExpand] = useState(false)

  // const handleChangeLanguage = (language) => {

  //   i18n.changeLanguage(language);
  // };

  const selectedLanguage = languageOptions[i18n.language]

  return (
    <StyledRoot className='topbarStyledRoot' bgColor={bgColor} expand={expand ? 1 : 0}>
      <StyledContainer className='topbarStyledContainer'>
        <FlexBetween width='100%'>
          <FlexBox justifyContent='flex-start' alignItems='center' gap={1}>
            <Logo />
            {/* <Span className='title'>
            </Span> */}
          </FlexBox>

          {/* <IconButton
            disableRipple
            className='expandTopbarIconButton'
            onClick={() => setExpand((state) => !state)}
          >
            {expand ? <Remove /> : <Add />}
          </IconButton> */}
        </FlexBetween>

        <FlexBox className='topbarRight' alignItems='center'>
          {/* LANGUAGE MENU SELECTOR */}
          {/* <BazaarMenu
            handler={
              <TouchRipple className='handler marginRight'>
                <Span className='menuTitle'>{selectedLanguage.title}</Span>
                <ExpandMore fontSize='inherit' />
              </TouchRipple>
            }
          >
            {Object.keys(languageOptions).map((language) => (
              <MenuItem
                className='menuItem'
                key={languageOptions[language].title}
                onClick={() => handleChangeLanguage(language)}
              >
                <Span className='menuTitle'>
                  {languageOptions[language].title}
                </Span>
              </MenuItem>
            ))}
          </BazaarMenu> */}

          {/* SOCIAL LINKS AREA */}
          <FlexBox alignItems='center' gap={1.5}>
            {socialLinks.map(({ id, Icon, url }) => (
              <Link href={url} key={id}>
                <Icon
                  sx={{
                    fontSize: 16
                  }}
                />
              </Link>
            ))}
          </FlexBox>
        </FlexBox>
      </StyledContainer>
    </StyledRoot>
  )
}

const socialLinks = [
  {
    id: 1,
    Icon: Twitter,
    url: '#'
  },
  {
    id: 2,
    Icon: Facebook,
    url: '#'
  },
  {
    id: 3,
    Icon: Instagram,
    url: '#'
  }
]

export default Topbar
