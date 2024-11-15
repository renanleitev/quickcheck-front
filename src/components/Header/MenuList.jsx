import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import colors from '../../config/colors';
import { UserRoles, userLabels } from '../../config/enums';
import useList from './useList';

MenuList.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

function MenuList({ open, setOpen }) {
  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const isLoggedIn = useSelector((state) => state?.usuarios?.isLoggedIn) || false;

  const [list, setList] = useState([]);

  const { defaultList, clienteList, funcionarioList, estabelecimentoList } = useList();

  useEffect(() => {
    if (!isLoggedIn) {
      setList(defaultList);
    } else {
      switch (entidade?.usuario?.role) {
        case UserRoles.ESTABELECIMENTO:
          setList(estabelecimentoList);
          break;
        case UserRoles.FUNCIONARIO:
          setList(funcionarioList);
          break;
        case UserRoles.CLIENTE:
        default:
          setList(clienteList);
          break;
      }
    }
  }, [clienteList, defaultList, estabelecimentoList, funcionarioList, isLoggedIn, entidade]);

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
        {isLoggedIn ? (
          <Box p="1rem">
            <Typography variant="h5">{entidade?.usuario?.nome}</Typography>
            <Typography>{userLabels[entidade?.usuario?.role]}</Typography>
          </Box>
        ) : (
          <Typography variant="h5" padding="1rem">
            Menu
          </Typography>
        )}
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
