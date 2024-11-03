import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Search, Restore } from '@mui/icons-material';
import Control from 'react-leaflet-custom-control';
import { ZoomControl } from 'react-leaflet';
import PropTypes from 'prop-types';
import { getEstabelecimentos } from '../../../store/modules/estabelecimentos/reducer';
import { toast } from 'react-toastify';

MapButtons.propTypes = {
  setOpen: PropTypes.func.isRequired
};

export default function MapButtons({ setOpen }) {
  const hasSearched = useSelector((state) => state?.estabelecimentos?.hasSearched) ?? [];

  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(getEstabelecimentos());
    toast.success('Mapa redefinido com sucesso!');
  };

  return (
    <>
      <Control position="bottomright">
        {/* Reset Button */}
        {hasSearched && (
          <Button
            variant="contained"
            onClick={handleReset}
            color="warning"
            sx={{
              borderRadius: '50%',
              width: 50,
              height: 50,
              marginBottom: '12rem',
              position: 'absolute',
              bottom: 0,
              right: 0,
              minWidth: 0,
              padding: 0
            }}
          >
            <Restore />
          </Button>
        )}
        {/* Search Button */}
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
          }}
        >
          <Search />
        </Button>
      </Control>
      {/* Zoom Buttons */}
      <ZoomControl position="bottomright" />
    </>
  );
}
