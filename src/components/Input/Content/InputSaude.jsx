import Input from '../Input';
import { comorbidadesOptions, sexoOptions } from '../../../config/enums';
import { numeroCartaoSUSRegex, numeroCartaoSUSFormat } from '../../../config/validationRegex';
import PropTypes from 'prop-types';

InputSaude.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default function InputSaude({ data, setData, errors }) {
  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="comorbidades"
        placeholder="Comorbidades"
        select
        selectList={comorbidadesOptions}
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
