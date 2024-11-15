import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useMap } from 'react-leaflet';
import { Button } from '@mui/material';
import { Restore } from '@mui/icons-material';
import PropTypes from 'prop-types';

import { getEstabelecimentos, userHasSearched } from '../../store/modules/estabelecimentos/reducer';
import { zoomOutLevel } from '../../config/enums';

ResetButton.propTypes = {
  onReset: PropTypes.func.isRequired
};

export default function ResetButton({ onReset }) {
  const hasSearched = useSelector((state) => state?.estabelecimentos?.hasSearched) ?? false;

  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const dispatch = useDispatch();

  const map = useMap();

  // Redefinindo o mapa para a exibição padrão
  const handleReset = () => {
    dispatch(getEstabelecimentos());
    dispatch(userHasSearched({ hasSearched: false }));
    toast.success('Mapa redefinido com sucesso!');
    // Voltando para a localização padrão do usuário
    map.flyTo([entidade?.latitude, entidade?.longitude], zoomOutLevel);
    // Redefinindo a rota desenhada
    onReset();
  };

  return (
    <>
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
    </>
  );
}
