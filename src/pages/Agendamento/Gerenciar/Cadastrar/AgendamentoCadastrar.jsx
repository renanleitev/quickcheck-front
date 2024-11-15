import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Input, { InputType } from '../../../../components/Input/Input';
import InputHora from '../../../../components/Input/InputHora';
import { VerticalContainer, HorizontalContainer } from '../../../../config/GlobalStyle';
import { formatCalendarDate } from '../../../../hooks/formatDate';
import colors from '../../../../config/colors';
import { AgendamentoStatus } from '../../../../config/enums';
import { especialidadesOptions } from '../../../../config/enums';
import { getFuncionariosOptions } from '../../../../store/modules/funcionarios/reducer';
import { createHorario } from '../../../../store/modules/horarios/reducer';
import InputDescricao from '../../../../components/Input/Content/InputDescricao';

AgendamentoCadastrar.propTypes = {
  setOpen: PropTypes.func.isRequired
};

export default function AgendamentoCadastrar({ setOpen }) {
  // A entidade aqui é o estabelecimento, já que somente ele pode cadastrar ou editar horários
  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;
  const funcionarios = useSelector((state) => state?.funcionarios?.funcionarios) || [];

  const dispatch = useDispatch();

  const funcionariosOptions = funcionarios.map((funcionario) => {
    return {
      data: funcionario ?? undefined,
      value: funcionario?.usuario?.nome ?? '',
      label: funcionario?.usuario?.nome ?? ''
    };
  });

  // Horário que é alterado pelo usuário antes de inserir no banco de dados
  const initialData = {
    horarioAtendimento: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
    horarioHora: dayjs(),
    horarioAgendamento: '',
    prontuario: '',
    descricao: '',
    status: AgendamentoStatus.DISPONÍVEL,
    estabelecimento: entidade,
    especialidade: especialidadesOptions[0].value,
    cliente: undefined,
    funcionario: undefined,
    funcionarioNome: ''
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
    const funcionario = funcionariosOptions.find(f => f.value === data.funcionarioNome);
    const dataHorario = {
      ...data,
      funcionario: funcionario.data,
      horarioAtendimento: `${data.horarioAtendimento}T${hora}`
    };
    dispatch(createHorario({ horario: dataHorario }));
    setData({ ...initialData });
    setOpen(false);
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
          keyName="funcionarioNome"
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
        <InputHora
          data={data}
          setData={setData}
          hora={dayjs(data.horarioHora)}
          keyName='horarioHora'
        />
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
