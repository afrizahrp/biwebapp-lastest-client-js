import { styled, Box } from '@mui/material';
// ==============================================================
const TopbarThinWrapper = styled(Box, {
  shouldForwardProp: (props) => props !== 'bgColor',
})(({ theme, bgColor }) => ({
  className: 'topbarThin',
  fontSize: 12,
  height: '5px',
  color: theme.palette.secondary.contrastText,
  background: '#83BB52' || theme.palette.grey[900],
  transition: 'height 10ms ease',
  '& .menuItem': {
    minWidth: 100,
  },
  '& .marginRight': {
    marginRight: '1.25rem',
  },

  '& .menuTitle': {
    fontSize: 12,
    marginLeft: '0.5rem',
    fontWeight: 600,
  },
}));

// ===========================================
const TopbarThin = ({ bgColor }) => {
  return <TopbarThinWrapper bgColor={bgColor} />;
};

export default TopbarThin;
