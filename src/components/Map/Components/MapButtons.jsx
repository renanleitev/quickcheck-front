import { useDispatch, useSelector } from 'react-redux';
import { ZoomControl, useMap } from 'react-leaflet';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { Search, Restore } from '@mui/icons-material';
import Control from 'react-leaflet-custom-control';
import PropTypes from 'prop-types';
import { getEstabelecimentos } from '../../../store/modules/estabelecimentos/reducer';
import { zoomOutLevel } from '../../../config/enums';

MapButtons.propTypes = {
  setOpen: PropTypes.func.isRequired,
  setCoordenadas: PropTypes.func.isRequired
};

export default function MapButtons({ setOpen, setCoordenadas }) {
  const hasSearched = useSelector((state) => state?.estabelecimentos?.hasSearched) ?? false;

  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const dispatch = useDispatch();

  const map = useMap();

  const handleReset = () => {
    dispatch(getEstabelecimentos());
    toast.success('Mapa redefinido com sucesso!');
    // Voltando para a localização padrão do usuário
    map.flyTo([entidade?.latitude, entidade?.longitude], zoomOutLevel);
    // Redefinindo a rota desenha
    setCoordenadas([]);
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
