import Input from '../../Input/Input';
import { especialidadesOptions, sexoOptions } from '../../../config/enums';
import { crmRegex } from '../../../config/validationRegex';
import { HorizontalContainer } from '../../../config/GlobalStyle';
import { estadosBrasil } from '../../../mocks/estadosBrasil';
import PropTypes from 'prop-types';

StepProfissao.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default function StepProfissao({ data, setData, errors }) {
  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="especialidade"
        placeholder="Especialidade"
        select
        selectList={especialidadesOptions}
      />
      <Input
        data={data}
        setData={setData}
        keyName="sexo"
        select
        selectList={sexoOptions}
        placeholder="Sexo"
      />
      <HorizontalContainer style={{ flexWrap: 'nowrap', width: '100%' }}>
        <Input
          data={data}
          setData={setData}
          keyName="crm"
          placeholder="CRM"
          error={errors?.errorCrm}
          errorText={errors?.errorCrmText}
          regex={crmRegex}
        />
        <Input
          data={data}
          setData={setData}
          keyName="estadoCrm"
          select
          selectList={estadosBrasil}
          placeholder="Estado"
          inputWidth="40%"
        />
      </HorizontalContainer>
    </>
  );
}
