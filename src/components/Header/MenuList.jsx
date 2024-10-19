import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import * as colors from '../../config/colors';
import { clienteList, defaultList } from '../../config/enums';

MenuList.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

function MenuList({ open, setOpen }) {
  const location = useLocation();

  const [list, setList] = useState([]);

  useEffect(() => {
    if (location.pathname === '/cadastro' || location.pathname === '/login') {
      setList(defaultList);
    } else {
      setList(clienteList);
    }
  }, [location.pathname]);

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
          {list.map((text) => (
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
