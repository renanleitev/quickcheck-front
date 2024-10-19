import { useState, useEffect, useMemo } from 'react';
import { Avatar, Box, Card, CardHeader, Drawer, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as colors from '../../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../../config/GlobalStyle';
import PropTypes from 'prop-types';
import StepInfo from './Steps/StepInfo';
import StepHorarios from './Steps/StepHorarios';
import StepConfirmar from './Steps/StepConfirmar';
import StepFinalizar from './Steps/StepFinalizar';
import StepButtons from '../../Step/StepButtons';
import { horarios } from '../../../mocks/horarios';
import formatDate from '../../../hooks/formatDate';

MapInfo.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function MapInfo({ data, open, setOpen }) {
  const [step, setStep] = useState(0);
  const initialAgendamento = useMemo(() => {
    return {
      especialidade: '',
      horario: undefined
    };
  }, []);
  const [agendamento, setAgendamento] = useState(initialAgendamento);

  // Redefinindo o estado geral quando muda de estabelecimento
  useEffect(() => {
    setStep(0);
    setAgendamento(initialAgendamento);
  }, [data, initialAgendamento]);

  function stepRender() {
    switch (step) {
      case 3:
        return (
          <StepFinalizar
            funcionarioNome={agendamento?.horario?.funcionario?.nome}
            horarioAtendimento={formatDate(agendamento?.horario?.horarioAtendimento)}
            descricao={agendamento?.horario?.descricao}
          />
        );
      case 2:
        return (
          <StepConfirmar
            funcionarioNome={agendamento?.horario?.funcionario?.nome}
            horarioAtendimento={formatDate(agendamento?.horario?.horarioAtendimento)}
            descricao={agendamento?.horario?.descricao}
          />
        );
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
          {/* Definindo uma alturar para criar efeito scroll */}
          <Box sx={{ height: '23rem', overflow: 'auto' }}>{stepRender(step)}</Box>
          <HorizontalContainer style={{ padding: '0.5rem', justifyContent: 'flex-end' }}>
            <StepButtons
              activeStep={step}
              setActiveStep={setStep}
              onReset={() => setOpen(false)}
              stepsNumber={4}
              nextStepLabel="Agendar"
              disableNextButton={step === 1 && agendamento?.horario === undefined}
              hideNextButton={step === 3}
            />
          </HorizontalContainer>
        </Card>
      </VerticalContainer>
    </Drawer>
  );
}
