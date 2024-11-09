import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Input, { InputType } from '../../../../components/Input/Input';
import { VerticalContainer, HorizontalContainer } from '../../../../config/GlobalStyle';
import { formatCalendarDate } from '../../../../hooks/formatDate';
import colors from '../../../../config/colors';
import { AgendamentoStatus } from '../../../../config/enums';
import { especialidadesOptions } from '../../../../config/enums';
import { getFuncionariosOptions } from '../../../../store/modules/funcionarios/reducer';
import { createHorario } from '../../../../store/modules/horarios/reducer';
import InputDescricao from '../../../../components/Input/Content/InputDescricao';
import PropTypes from 'prop-types';

AgendamentoCriar.propTypes = {
  setOpen: PropTypes.func.isRequired
};

export default function AgendamentoCriar({ setOpen }) {
  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;
  const funcionarios = useSelector((state) => state?.funcionarios?.funcionarios) || [];

  const dispatch = useDispatch();

  const funcionariosOptions = funcionarios.map((funcionario) => {
    return {
      value: funcionario ?? undefined,
      label: funcionario?.usuario?.nome ?? ''
    };
  });

  // Horário que é alterado pelo usuário antes de inserir no banco de dados
  const initialData = {
    horarioAtendimento: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
    horarioHora: '',
    horarioAgendamento: '',
    prontuario: '',
    descricao: '',
    status: AgendamentoStatus.DISPONÍVEL,
    estabelecimento: entidade,
    especialidade: especialidadesOptions[0].value,
    cliente: undefined,
    funcionario: funcionariosOptions[0]?.value ?? undefined
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    dispatch(
      getFuncionariosOptions({
        estabelecimentoNome: entidade?.usuario?.nome,
        estabelecimentoTipo: entidade?.tipo,
        especialidade: data.especialidade
      })
    );
  }, [data.especialidade, dispatch, entidade?.tipo, entidade?.usuario?.nome]);

  const handleCreateHorario = () => {
    // Horário que será salvo no banco de dados
    const hora = dayjs(data.horarioHora).format('HH:mm:ss');
    const dataHorario = {
      ...data,
      horarioAtendimento: `${data.horarioAtendimento}T${hora}`
    };
    dispatch(createHorario({ horario: dataHorario }));
    setData({ ...initialData });
  };

  const inputWidth = '90%';
  const buttonWidth = '12rem';
  const buttonHeight = '3rem';

  return (
    <VerticalContainer style={{ marginTop: '2rem' }}>
      <Typography variant="h4" color={colors.primaryDarkColor}>
        Criar Consulta
      </Typography>
      <HorizontalContainer style={{ width: inputWidth, flexWrap: 'nowrap' }}>
        <Input
          data={data}
          setData={setData}
          placeholder="Especialidade"
          keyName="especialidade"
          inputWidth={inputWidth}
          select
          selectList={especialidadesOptions}
        />
        <Input
          data={data}
          setData={setData}
          placeholder="Médico"
          keyName="funcionario"
          inputWidth={inputWidth}
          select
          selectList={funcionariosOptions}
          disabled={funcionariosOptions.length === 0}
        />
      </HorizontalContainer>
      <HorizontalContainer style={{ width: inputWidth, flexWrap: 'nowrap' }}>
        <Input
          data={data}
          setData={setData}
          keyName="horarioAtendimento"
          inputType={InputType.DATE}
          placeholder="Data"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Horário"
            onChange={(value) => {
              setData({ ...data, horarioHora: value.$d });
            }}
          />
        </LocalizationProvider>
      </HorizontalContainer>
      <HorizontalContainer style={{ width: inputWidth, flexWrap: 'nowrap' }}>
        <InputDescricao data={data} setData={setData} hasHorarioFuncionamento={false} />
      </HorizontalContainer>
      <HorizontalContainer style={{ paddingBottom: '2rem' }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpen(false)}
          sx={{ width: buttonWidth, height: buttonHeight }}
        >
          Fechar
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ width: buttonWidth, height: buttonHeight }}
          onClick={handleCreateHorario}
        >
          Cadastrar
        </Button>
      </HorizontalContainer>
    </VerticalContainer>
  );
}
