import Input from '../../Input/Input';
import { comorbidadesOptions, sexoOptions } from '../../../config/enums';
import { numeroCartaoSUSRegex, numeroCartaoSUSFormat } from '../../../config/validationRegex';
import PropTypes from 'prop-types';

StepSaude.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default function StepSaude({ data, setData, errors }) {
  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="comorbidades"
        placeholder="Comorbidades"
        selectList={comorbidadesOptions}
        select
      />
      <Input
        data={data}
        setData={setData}
        keyName="sexo"
        select
        selectList={sexoOptions}
        placeholder="Sexo"
      />
      <Input
        data={data}
        setData={setData}
        keyName="numeroCartaoSUS"
        placeholder="Número do Cartão do SUS"
        error={errors?.errorSaude}
        errorText={errors?.errorSaudeText}
        regex={numeroCartaoSUSRegex}
        format={numeroCartaoSUSFormat}
      />
    </>
  );
}
