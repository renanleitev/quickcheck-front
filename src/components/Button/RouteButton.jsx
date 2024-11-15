import { Button } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { userHasSearched } from '../../store/modules/estabelecimentos/reducer';
import PropTypes from 'prop-types';

RouteButton.propTypes = {
  onClick: PropTypes.func
};

// Botão de rotas, que é usado no card que mostra as informações do estabelecimento
export default function RouteButton({ onClick }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    onClick();
    toast.success('Rota calculada com sucesso!');
    dispatch(userHasSearched({ hasSearched: true }));
  };

  return (
    <Button onClick={handleClick} variant="contained" color="success">
      Rotas <NearMeIcon sx={{ marginLeft: '0.5rem' }} />
    </Button>
  );
}
