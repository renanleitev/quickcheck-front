import { useState } from 'react';
import { Drawer } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as colors from '../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../config/GlobalStyle';
import PropTypes from 'prop-types';
import StepInfo from './Steps/StepInfo';
import StepHorarios from './Steps/StepHorarios';
import StepButtons from '../Step/StepButtons';
import { horarios } from '../../mocks/horarios';

MapInfo.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function MapInfo({ data, open, setOpen }) {
  const steps = ['Info', 'Horários', 'Confirmar', 'Finalizar'];
  const [step, setStep] = useState(0);
  const initialAgendamento = {
    especialidade: '',
    horario: undefined
  };
  const [agendamento, setAgendamento] = useState(initialAgendamento);

  function stepRender() {
    switch (step) {
      case 1:
        return <StepHorarios data={agendamento} setData={setAgendamento} horarios={horarios} />;
      case 0:
      default:
        return <StepInfo imagem={data.imagem} horarioFuncionamento={data.horarioFuncionamento} />;
    }
  }

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      anchor="bottom"
      PaperProps={{
        sx: {
          backgroundColor: colors.primaryColor
        }
      }}
    >
      <VerticalContainer>
        <Card sx={{ backgroundColor: colors.primaryColor, boxShadow: 'none' }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ backgroundColor: colors.primaryWhiteColor, color: colors.primaryColor }}
                aria-label="estabelecimento-nome"
              >
                {data.nome.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton sx={{ color: colors.primaryWhiteColor }} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={data.nome}
            titleTypographyProps={{ color: colors.primaryWhiteColor }}
            subheader={data.endereco}
            subheaderTypographyProps={{ color: colors.primaryWhiteColor }}
            sx={{
              borderBottom: `1px solid ${colors.primaryWhiteColor}`
            }}
          />
          {stepRender(step)}
          <HorizontalContainer style={{ padding: '0.5rem', justifyContent: 'flex-end' }}>
            <StepButtons
              activeStep={step}
              setActiveStep={setStep}
              onReset={() => () => setOpen(false)}
              steps={steps}
              nextStepLabel="Agendar"
            />
          </HorizontalContainer>
        </Card>
      </VerticalContainer>
    </Drawer>
  );
}
