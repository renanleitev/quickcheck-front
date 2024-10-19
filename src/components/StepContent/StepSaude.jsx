import Input, { InputType } from '../Input/Input';
import { comorbidadesOptions, sexoOptions } from '../../config/enums';
import PropTypes from 'prop-types';

StepSaude.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepSaude({ data, setData }) {
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
        inputType={InputType.NUMBER}
      />
    </>
  );
}
