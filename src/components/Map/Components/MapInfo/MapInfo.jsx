import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { Box, Drawer, MenuItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import colors from '../../../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../../../config/GlobalStyle';
import StepInfo from './Steps/StepInfo';
import StepFiltros from './Steps/StepFiltros';
import StepHorarios from './Steps/StepHorarios';
import StepConfirmar from './Steps/StepConfirmar';
import StepButtons from '../../../Step/StepButtons';
import formatDate from '../../../../hooks/formatDate';
import {
  getHorariosByEstabelecimentoIdAndStatus,
  getHorariosByEstabelecimentoIdAndStatusAndEspecialidade,
  updateHorario
} from '../../../../store/modules/horarios/reducer';
import PerfilCard from '../../../Card/PerfilCard';
import { AgendamentoStatus } from '../../../../config/enums';
import { formatCalendarDate } from '../../../../hooks/formatDate';
import RouteButton from '../../../Button/RouteButton';

MapInfo.propTypes = {
  estabelecimento: PropTypes.object,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setCoordenadas: PropTypes.func.isRequired
};

export default function MapInfo({ estabelecimento, open, setOpen, setCoordenadas }) {
  const dispatch = useDispatch();

  const horarios = useSelector((state) => state?.horarios?.horarios) || [];

  const cliente = useSelector((state) => state?.usuarios?.estabelecimento) || undefined;

  const latitudeEstabelecimento = estabelecimento?.latitude;
  const longitudeEstabelecimento = estabelecimento?.longitude;

  const latitudeCliente = useSelector((state) => state?.usuarios?.latitude);
  const longitudeCliente = useSelector((state) => state?.usuarios?.longitude);

  // Coordenadas para calcular a rota entre o cliente e o estabelecimento
  const coordenadasPesquisa = {
    latitudeEstabelecimento: Number.parseFloat(latitudeEstabelecimento),
    longitudeEstabelecimento: Number.parseFloat(longitudeEstabelecimento),
    latitudeCliente: Number.parseFloat(latitudeCliente),
    longitudeCliente: Number.parseFloat(longitudeCliente)
  };

  const [activeStep, setActiveStep] = useState(0);

  const initialAgendamento = useMemo(() => {
    return {
      especialidade: '',
      horario: undefined,
      horarioAtendimento: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
      horarioHora: dayjs(),
      funcionario: undefined
    };
  }, []);

  const [agendamento, setAgendamento] = useState(initialAgendamento);

  // Perfil do funcionario selecionadp
  const [funcionario, setFuncionario] = useState(undefined);

  // Obtendo os horários
  useEffect(() => {
    if (estabelecimento !== undefined) {
      dispatch(
        getHorariosByEstabelecimentoIdAndStatus({
          estabelecimentoId: estabelecimento?.id,
          status: AgendamentoStatus.DISPONÍVEL
        })
      );
    }
  }, [dispatch, estabelecimento]);

  // Quando muda a especialidade, realiza uma nova pesquisa
  useEffect(() => {
    if (agendamento.especialidade !== '') {
      dispatch(
        getHorariosByEstabelecimentoIdAndStatusAndEspecialidade({
          estabelecimentoId: estabelecimento?.id,
          especialidade: agendamento.especialidade,
          status: AgendamentoStatus.DISPONÍVEL
        })
      );
    }
  }, [agendamento.especialidade, dispatch, estabelecimento?.id]);

  // Redefinindo o estado geral quando muda de estabelecimento
  useEffect(() => {
    setActiveStep(0);
    setAgendamento(initialAgendamento);
  }, [estabelecimento, initialAgendamento]);

  const steps = [
    {
      component: (
        <StepInfo
          imagem={estabelecimento?.usuario?.imagem}
          info={estabelecimento?.horarioFuncionamento}
          subInfo={estabelecimento?.descricao}
          alignItems="flex-start"
        />
      ),
      block: false
    },
    { component: <StepFiltros data={agendamento} setData={setAgendamento} />, block: false },
    {
      component: funcionario ? (
        <StepInfo
          imagem={funcionario?.usuario?.imagem}
          info={funcionario?.usuario?.nome}
          subInfo={funcionario?.especialidade}
          descricao={`CRM ${funcionario?.crm}`}
        />
      ) : (
        <StepHorarios
          data={agendamento}
          setData={setAgendamento}
          setFuncionario={setFuncionario}
          horarios={horarios}
        />
      ),
      block: true // Bloqueia o next button para impedir que o usuário avance sem ter escolhido uma opção
    },
    {
      component: (
        <StepConfirmar
          title="Deseja confirmar a consulta?"
          funcionarioNome={agendamento?.horario?.funcionario?.usuario?.nome}
          horarioAtendimento={formatDate(agendamento?.horario?.horarioAtendimento)}
          descricao={agendamento?.horario?.descricao}
        />
      ),
      block: false
    }
    // {
    //   component: (
    //     <StepConfirmar
    //       title="Consulta confirmada com sucesso!"
    //       funcionarioNome={agendamento?.horario?.funcionario?.usuario?.nome}
    //       horarioAtendimento={formatDate(agendamento?.horario?.horarioAtendimento)}
    //       descricao="Lembre-se de chegar com 30 minutos de antecedência."
    //     />
    //   ),
    //   block: false
    // }
  ];

  const handleReset = useCallback(() => {
    setOpen(false);
    setAgendamento(initialAgendamento);
    setFuncionario(undefined);
    setActiveStep(0);
  }, [initialAgendamento, setOpen]);

  const handleConfirm = useCallback(() => {
    const horario = {
      ...agendamento.horario,
      cliente: { ...cliente },
      status: AgendamentoStatus.AGENDADO,
      horarioAgendamento: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
      mensagemSucesso: 'Consulta agendada com sucesso!'
    };
    dispatch(updateHorario({ horario }));
    handleReset();
  }, [agendamento.horario, cliente, dispatch, handleReset]);

  // Redefinindo quando fecha o drawer
  useEffect(() => {
    if (!open) {
      handleReset();
    }
  }, [handleReset, open]);

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
        <PerfilCard
          estabelecimento={estabelecimento}
          subtitle={estabelecimento?.usuario?.endereco}
          hasMenu
          menu={
            <Box width="20rem">
              <MenuItem>
                <Typography noWrap>
                  Telefone:{' '}
                  <a
                    href={`tel:+55${estabelecimento?.usuario?.telefone}`}
                    style={{ color: colors.primaryDarkColor }}
                  >
                    {estabelecimento?.usuario?.telefone}
                  </a>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography noWrap>
                  Email:{' '}
                  <a
                    href={`mailto:${estabelecimento?.usuario?.email}`}
                    style={{ color: colors.primaryDarkColor }}
                  >
                    {estabelecimento?.usuario?.email}
                  </a>
                </Typography>
              </MenuItem>
            </Box>
          }
        >
          {/* Steps */}
          {/* Definindo uma altura fixa para criar efeito scroll */}
          <Box sx={{ height: '23rem', overflow: 'auto' }}>{steps[activeStep].component}</Box>
          {/* Steps Buttons */}
          <HorizontalContainer
            style={{ padding: '0.5rem', justifyContent: 'flex-end', alignItems: 'end' }}
          >
            {/* Mostra o botão de rotas apenas quando exibe a informação do estabelecimento */}
            {activeStep === 0 && (
              <HorizontalContainer style={{ marginRight: 'auto' }}>
                <RouteButton
                  onClick={() => {
                    setCoordenadas({ ...coordenadasPesquisa });
                    setOpen(false);
                  }}
                />
              </HorizontalContainer>
            )}
            <StepButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              onReset={handleReset}
              stepsNumber={steps.length}
              nextStepLabel="Agendar"
              disableNextButton={steps[activeStep].block && agendamento?.horario === undefined}
              // isSetupFinished={activeStep === steps.length - 1} // Omite o next button quando atinge o último step (confirmar)
              hasCustomReturnStep={funcionario !== undefined} // Quando houver um funcionário selecionado, retorna para o mesmo step (horarios)
              onCustomReturnStep={() => setFuncionario(undefined)} // Remove funcionário, mas mantém no mesmo step anterior (horarios)
              onCallApi={handleConfirm}
            />
          </HorizontalContainer>
        </PerfilCard>
      </VerticalContainer>
    </Drawer>
  );
}
