import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Input, { InputType } from '../../../../Input/Input';
import InputHora from '../../../../Input/InputHora';
import { especialidadesOptions } from '../../../../../config/enums';
import { HorizontalContainer, VerticalContainer } from '../../../../../config/GlobalStyle';
import colors from '../../../../../config/colors';

StepFiltros.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepFiltros({ data, setData }) {
  const inputWidth = '90%';

  return (
    <VerticalContainer style={{ width: '100%', rowGap: '1rem' }}>
      <Typography variant="h4" color={colors.primaryWhiteColor}>
        Pesquisar
      </Typography>
      <VerticalContainer style={{ width: '100%', rowGap: '2rem' }}>
        <Input
          data={data}
          setData={setData}
          keyName="nomeFuncionario"
          placeholder="Médico"
          inputWidth={inputWidth}
        />
        <Input
          data={data}
          setData={setData}
          keyName="especialidade"
          placeholder="Especialidade"
          selectList={especialidadesOptions}
          select
          inputWidth={inputWidth}
        />
        <HorizontalContainer style={{ width: inputWidth, flexWrap: 'nowrap' }}>
          <Input
            data={data}
            setData={setData}
            placeholder="Data"
            keyName="horarioAtendimento"
            inputType={InputType.DATE}
          />
          <InputHora
            data={data}
            setData={setData}
            hora={dayjs(data.horarioHora)}
            keyName="horarioHora"
          />
        </HorizontalContainer>
      </VerticalContainer>
    </VerticalContainer>
  );
}
