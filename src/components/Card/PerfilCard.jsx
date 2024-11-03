import { Avatar, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from '../../config/colors';
import PropTypes from 'prop-types';

PerfilCard.propTypes = {
  children: PropTypes.object.isRequired,
  entidade: PropTypes.object.isRequired
};

export default function PerfilCard({ children, entidade }) {
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
          <IconButton sx={{ color: colors.primaryWhiteColor }} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={entidade?.usuario?.nome}
        titleTypographyProps={{ color: colors.primaryWhiteColor }}
        subheader={entidade?.usuario?.endereco}
        subheaderTypographyProps={{ color: colors.primaryWhiteColor }}
        sx={{
          borderBottom: `1px solid ${colors.primaryWhiteColor}`
        }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
