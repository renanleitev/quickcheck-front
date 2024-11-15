import { Typography } from '@mui/material';
import Input, { InputType } from '../../../../Input/Input';
import { especialidadesOptions } from '../../../../../config/enums';
import { HorizontalContainer, VerticalContainer } from '../../../../../config/GlobalStyle';
import colors from '../../../../../config/colors';
import PropTypes from 'prop-types';

StepFiltros.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepFiltros({ data, setData }) {
  const inputWidth = '90%';

  return (
    <VerticalContainer style={{ width: '100%', rowGap: '1rem' }}>
      <Typography variant="h5" color={colors.primaryWhiteColor}>
        Pesquisar
      </Typography>
      <VerticalContainer style={{ width: '100%', rowGap: '2rem' }}>
        <Input
          data={data}
          setData={setData}
          keyName="nome"
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
            keyName="dataInicial"
            inputType={InputType.DATE}
            placeholder="Início (Opcional)"
          />
          <Input
            data={data}
            setData={setData}
            keyName="dataFinal"
            inputType={InputType.DATE}
            placeholder="Fim (Opcional)"
          />
        </HorizontalContainer>
      </VerticalContainer>
    </VerticalContainer>
  );
}
