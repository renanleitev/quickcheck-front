import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMap } from 'react-leaflet';
import { Button } from '@mui/material';
import { Restore } from '@mui/icons-material';
import PropTypes from 'prop-types';

import { zoomOutLevel } from '../../config/enums';

ResetButton.propTypes = {
  onReset: PropTypes.func.isRequired
};

export default function ResetButton({ onReset }) {
  const latitudeEstabelecimento = Number.parseFloat(
    useSelector((state) => state?.estabelecimentos?.latitude) ?? 0
  );
  const longitudeEstabelecimento = Number.parseFloat(
    useSelector((state) => state?.estabelecimentos?.longitude) ?? 0
  );
  const hasEstabelecimentoCoords = latitudeEstabelecimento !== 0 && longitudeEstabelecimento !== 0;

  const cliente = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const map = useMap();

  // Redefinindo o mapa para a exibição padrão
  const handleReset = () => {
    // Redefinindo a rota desenhada
    onReset();
    // Exibinindo mensagem de sucesso
    toast.success('Mapa redefinido com sucesso!');
    // Voltando para a localização padrão do usuário
    map.flyTo([cliente?.latitude, cliente?.longitude], zoomOutLevel);
  };

  return (
    <>
      {hasEstabelecimentoCoords && (
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
