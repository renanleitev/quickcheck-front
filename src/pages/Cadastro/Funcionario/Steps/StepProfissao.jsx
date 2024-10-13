import Input, { InputType } from '../../../../components/Input/Input';
import { especialidadesOptions } from '../../../../config/enums';
import { sexoOptions } from '../../../../config/enums';
import PropTypes from 'prop-types';

StepProfissao.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepProfissao({ data, setData }) {
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
      <Input
        data={data}
        setData={setData}
        keyName="crm"
        placeholder="CRM"
        inputType={InputType.NUMBER}
      />
    </>
  );
}
