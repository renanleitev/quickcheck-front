import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import * as colors from '../../config/colors';
import PropTypes from 'prop-types';

SearchDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

function SearchDrawer({ open, setOpen }) {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      anchor="right"
      PaperProps={{
        sx: {
          backgroundColor: colors.primaryColor,
          color: colors.primaryWhiteColor
        }
      }}>
      <Box
        sx={{ width: 250, textAlign: 'center' }}
        role="presentation"
        onClick={() => setOpen(false)}>
        <Typography variant="h5" padding="1rem">
          Menu
        </Typography>
      </Box>
    </Drawer>
  );
}

export default SearchDrawer;
