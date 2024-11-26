import React, { useState } from 'react';
import { Avatar, Card, CardContent, CardHeader, IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';

import colors from '../../config/colors';

PerfilCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  entidade: PropTypes.object,
  hasSubtitle: PropTypes.bool,
  subtitle: PropTypes.string,
  hasMenu: PropTypes.bool,
  menu: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default function PerfilCard({
  children,
  entidade,
  hasSubtitle = true,
  subtitle,
  hasMenu = false,
  menu
}) {
  // https://mui.com/material-ui/react-menu/
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ backgroundColor: colors.primaryColor, boxShadow: 'none' }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ backgroundColor: colors.primaryWhiteColor, color: colors.primaryColor }}
            aria-label="estabelecimento-nome"
            src={entidade?.usuario?.imagem}
          >
            {entidade?.usuario?.nome.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          hasMenu && (
            <IconButton
              sx={{ color: colors.primaryWhiteColor }}
              aria-label="settings"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={entidade?.usuario?.nome}
        titleTypographyProps={{ color: colors.primaryWhiteColor }}
        subheader={hasSubtitle && subtitle}
        subheaderTypographyProps={{ color: colors.primaryWhiteColor }}
        sx={{
          borderBottom: `1px solid ${colors.primaryWhiteColor}`
        }}
      />
      <CardContent>{children}</CardContent>
      {hasMenu && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          {menu}
        </Menu>
      )}
    </Card>
  );
}
