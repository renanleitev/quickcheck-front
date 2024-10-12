import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

MenuList.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

const clienteList = ['Minhas consultas', 'Histórico de consultas', 'Meu Perfil', 'Sobre', 'Logout'];

function MenuList({ open, setOpen }) {
  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
      <Box
        sx={{ width: 250, textAlign: 'center' }}
        role="presentation"
        onClick={() => setOpen(false)}>
        <Typography variant="h5" padding="1rem">
          Menu
        </Typography>
        <Divider />
        <List>
          {clienteList.map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default MenuList;
