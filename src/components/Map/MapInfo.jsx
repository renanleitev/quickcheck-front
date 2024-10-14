import { Button, Drawer } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as colors from '../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../config/GlobalStyle';
import PropTypes from 'prop-types';

MapInfo.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function MapInfo({ data, open, setOpen }) {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      anchor="bottom"
      PaperProps={{
        sx: {
          backgroundColor: colors.primaryColor
        }
      }}>
      <VerticalContainer>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: colors.primaryColor }} aria-label="recipe">
                {data.nome.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={data.nome}
            subheader={data.endereco}
          />
          <CardMedia component="img" height="194" image={data.imagem} alt="Imagem" />
          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {data.horarioFuncionamento}
            </Typography>
          </CardContent>
          <HorizontalContainer style={{ padding: '0.5rem', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="error" onClick={() => setOpen(false)}>
              Voltar
            </Button>
            <Button variant="contained">Agendar</Button>
          </HorizontalContainer>
        </Card>
      </VerticalContainer>
    </Drawer>
  );
}
