import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import colors from '../../config/colors';

MenuList.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

function MenuList({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const defaultList = [
    { name: 'Login', onClick: () => navigate('/login') },
    { name: 'Cadastro', onClick: () => navigate('/cadastro') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') }
  ];

  const clienteList = [
    { name: 'Minhas consultas', onClick: () => navigate('/agendamentos') },
    { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') },
    { name: 'Logout', onClick: () => navigate('/login') }
  ];

  // O usuário não está logado quando a URL está em cadastro ou login
  const notLoggedIn = location.pathname === '/cadastro' || location.pathname === '/login';

  const list = notLoggedIn ? defaultList : clienteList;

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
      }}
    >
      <Box
        sx={{ width: 250, textAlign: 'center' }}
        role="presentation"
        onClick={() => setOpen(false)}
      >
        <Typography variant="h5" padding="1rem">
          Menu
        </Typography>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default MenuList;
