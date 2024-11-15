import { Button } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { userHasSearched } from '../../store/modules/estabelecimentos/reducer';
import { getRoute } from '../../hooks/getRoute';
import PropTypes from 'prop-types';

RouteButton.propTypes = {
  coordenadas: PropTypes.object.isRequired,
  setCoordenadas: PropTypes.func.isRequired,
  onClick: PropTypes.func
};

// Botão de rotas, que é usado no card que mostra as informações do estabelecimento
export default function RouteButton({ coordenadas, setCoordenadas, onClick }) {
  const dispatch = useDispatch();

  async function getCoords() {
    const coords = await getRoute([
      {
        latitude: Number.parseFloat(coordenadas.latitudeCliente),
        longitude: Number.parseFloat(coordenadas.longitudeCliente)
      },
      {
        latitude: Number.parseFloat(coordenadas.latitudeEstabelecimento),
        longitude: Number.parseFloat(coordenadas.longitudeEstabelecimento)
      }
    ]);
    setCoordenadas(coords);
  }

  const handleClick = () => {
    onClick();
    getCoords();
    toast.success('Rota calculada com sucesso!');
    dispatch(userHasSearched({ hasSearched: true }));
  };

  return (
    <Button onClick={handleClick} variant="contained" color="success">
      Rotas <NearMeIcon sx={{ marginLeft: '0.5rem' }} />
    </Button>
  );
}
