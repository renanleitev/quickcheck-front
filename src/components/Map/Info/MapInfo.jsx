import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Card, CardHeader, Drawer, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from '../../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../../config/GlobalStyle';
import PropTypes from 'prop-types';
import StepInfo from './Steps/StepInfo';
import StepHorarios from './Steps/StepHorarios';
import StepConfirmar from './Steps/StepConfirmar';
import StepFinalizar from './Steps/StepFinalizar';
import StepButtons from '../../Step/StepButtons';
import formatDate from '../../../hooks/formatDate';
import { getHorarios } from '../../../store/modules/horarios/reducer';

MapInfo.propTypes = {
  entidade: PropTypes.object,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function MapInfo({ entidade, open, setOpen }) {
  const dispatch = useDispatch();

  const horarios = useSelector((state) => state?.horarios?.horarios) || [];

  const [step, setStep] = useState(0);

  const initialAgendamento = useMemo(() => {
    return {
      especialidade: '',
      horario: undefined,
      funcionario: undefined
    };
  }, []);

  const [agendamento, setAgendamento] = useState(initialAgendamento);

  // Obtendo os horários
  // TODO: Obter os horários de acordo com cada estabelecimento
  useEffect(() => {
    dispatch(getHorarios());
  }, [dispatch]);

  // Redefinindo o estado geral quando muda de estabelecimento
  useEffect(() => {
    setStep(0);
    setAgendamento(initialAgendamento);
  }, [entidade, initialAgendamento]);

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
        return (
          <StepInfo imagem={entidade?.usuario?.imagem} info={entidade?.horarioFuncionamento} />
        );
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
          {/* Título do Estabelecimento + Endereço */}
          <CardHeader
            avatar={
              <Avatar
                sx={{ backgroundColor: colors.primaryWhiteColor, color: colors.primaryColor }}
                aria-label="estabelecimento-nome"
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
          {/* Steps */}
          {/* Definindo uma altura fixa para criar efeito scroll */}
          <Box sx={{ height: '23rem', overflow: 'auto' }}>{stepRender(step)}</Box>
          {/* Steps Buttons */}
          <HorizontalContainer style={{ padding: '0.5rem', justifyContent: 'flex-end' }}>
            <StepButtons
              activeStep={step}
              setActiveStep={setStep}
              onReset={() => setOpen(false)}
              stepsNumber={4}
              nextStepLabel="Agendar"
              disableNextButton={step === 1 && agendamento?.horario === undefined}
              isSetupFinished={step === 3}
            />
          </HorizontalContainer>
        </Card>
      </VerticalContainer>
    </Drawer>
  );
}
