import { Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import Control from 'react-leaflet-custom-control';
import { ZoomControl } from 'react-leaflet';
import PropTypes from 'prop-types';

MapButtons.propTypes = {
  setOpen: PropTypes.func.isRequired
};

export default function MapButtons({ setOpen }) {
  return (
    <>
      <Control position="bottomright">
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: '50%',
            width: 50,
            height: 50,
            marginBottom: '7rem',
            position: 'absolute',
            bottom: 0,
            right: 0,
            minWidth: 0,
            padding: 0
          }}>
          <Search />
        </Button>
      </Control>
      <ZoomControl position="bottomright" />
    </>
  );
}
