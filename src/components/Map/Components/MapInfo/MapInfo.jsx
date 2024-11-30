import { useState, useEffect, useCallback } from 'react';
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
import { searchHorarios, updateHorario } from '../../../../store/modules/horarios/reducer';
import PerfilCard from '../../../Card/PerfilCard';
import { AgendamentoStatus } from '../../../../config/enums';
import RouteButton from '../../../Button/RouteButton';
import fetchStatus from '../../../../config/fetchStatus';
import { setEstabelecimentoCoords } from '../../../../store/modules/estabelecimentos/reducer';

MapInfo.propTypes = {
  estabelecimento: PropTypes.object,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  agendamento: PropTypes.object.isRequired,
  setAgendamento: PropTypes.func.isRequired,
  initialAgendamento: PropTypes.object.isRequired
};

export default function MapInfo({
  estabelecimento,
  open,
  setOpen,
  agendamento,
  setAgendamento,
  initialAgendamento
}) {
  const dispatch = useDispatch();

  const horarios = useSelector((state) => state?.horarios?.horarios) || [];

  const updateFetchStatus =
    useSelector((state) => state?.horarios?.updateFetchStatus) || fetchStatus.IDLE;

  const cliente = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const [activeStep, setActiveStep] = useState(0);

  // Perfil do funcionario selecionadp
  const [funcionario, setFuncionario] = useState(undefined);

  // Redefinindo o estado geral quando muda de estabelecimento
  useEffect(() => {
    setActiveStep(0);
    setAgendamento(initialAgendamento);
  }, [initialAgendamento, setAgendamento]);

  // Redefinindo a aplicação para o estado inicial
  const handleReset = useCallback(() => {
    setOpen(false);
    setAgendamento(initialAgendamento);
    setFuncionario(undefined);
    setActiveStep(0);
  }, [initialAgendamento, setAgendamento, setOpen]);

  // Pesquisando horários de acordo com os filtros aplicados
  const handleSearch = useCallback(() => {
    // Horário que será salvo no banco de dados
    const hora = dayjs(agendamento.horarioHora).format('HH:mm:ss');
    dispatch(
      searchHorarios({
        ...agendamento,
        nomeEstabelecimento: estabelecimento?.nome ?? '',
        horarioAtendimento: `${agendamento.horarioAtendimento}T${hora}` // Pesquisando horários a partir dessa data
      })
    );
    setActiveStep(activeStep + 1);
  }, [activeStep, agendamento, dispatch, estabelecimento?.nome]);

  // Confirmando o agendamento
  const handleConfirm = useCallback(() => {
    const horario = {
      ...agendamento.horario,
      cliente: { ...cliente },
      status: AgendamentoStatus.AGENDADO,
      horarioAgendamento: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
      mensagemSucesso: 'Consulta agendada com sucesso!'
    };
    dispatch(updateHorario({ horario }));
    setOpen(false);
  }, [activeStep, agendamento.horario, cliente, dispatch, updateFetchStatus]);

  const steps = [
    // Card com imagem do estabelecimento
    {
      component: (
        <StepInfo
          imagem={estabelecimento?.usuario?.imagem}
          info={estabelecimento?.horarioFuncionamento}
          subInfo={estabelecimento?.descricao}
          alignItems="flex-start"
        />
      ),
      block: false,
      onCallApi: () => {},
      isCallingApi: false,
      nextButtonLabel: 'Agendar'
    },
    // Filtros de pesquisa (para filtrar os horários disponíveis)
    {
      component: <StepFiltros data={agendamento} setData={setAgendamento} />,
      onCallApi: handleSearch,
      block: false,
      isCallingApi: true, // Chama a API para pesquisar os horários disponíveis
      nextButtonLabel: 'Pesquisar'
    },
    // Lista dos horários disponíveis, sendo possível ver o perfil do médico
    {
      component: funcionario ? (
        <StepInfo
          imagem={funcionario?.usuario?.imagem}
          info={funcionario?.usuario?.nome}
          subInfo={funcionario?.especialidade}
          descricao={`CRM ${funcionario?.crm}`}
          objectFit="contain"
        />
      ) : (
        <StepHorarios
          data={agendamento}
          setData={setAgendamento}
          setFuncionario={setFuncionario}
          horarios={horarios}
        />
      ),
      block: true, // Bloqueia o next button para impedir que o usuário avance sem ter escolhido uma opção
      onCallApi: () => {},
      isCallingApi: false,
      nextButtonLabel: 'Agendar'
    },
    // Confirmando a consulta
    {
      component: (
        <StepConfirmar
          title="Deseja confirmar a consulta?"
          funcionarioNome={agendamento?.horario?.funcionario?.usuario?.nome}
          horarioAtendimento={formatDate(agendamento?.horario?.horarioAtendimento)}
          descricao={agendamento?.horario?.descricao}
        />
      ),
      block: false,
      onCallApi: handleConfirm,
      isCallingApi: true, // Chama a API para confirmar a consulta
      nextButtonLabel: 'Confirmar'
    },
    // Adicionando um step extra para confirmar a consulta
    {}
  ];

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
          entidade={estabelecimento}
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
                    dispatch(
                      setEstabelecimentoCoords({
                        latitude: Number.parseFloat(estabelecimento?.latitude ?? 0),
                        longitude: Number.parseFloat(estabelecimento?.longitude ?? 0)
                      })
                    );
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
              nextStepLabel={steps[activeStep].nextButtonLabel}
              disableNextButton={steps[activeStep].block && agendamento?.horario === undefined}
              isSetupFinished={activeStep === steps.length - 1} // Omite o next button quando atinge o último step (confirmar)
              hasCustomReturnStep={funcionario !== undefined} // Quando houver um funcionário selecionado, retorna para o mesmo step (horarios)
              onCustomReturnStep={() => setFuncionario(undefined)} // Remove funcionário, mas mantém no mesmo step anterior (horarios)
              onCallApi={steps[activeStep].onCallApi}
              isCallingApi={steps[activeStep].isCallingApi}
            />
          </HorizontalContainer>
        </PerfilCard>
      </VerticalContainer>
    </Drawer>
  );
}
