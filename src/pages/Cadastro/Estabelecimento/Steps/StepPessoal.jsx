import Input, { InputType } from '../../../../components/Input/Input';
import PropTypes from 'prop-types';

StepPessoal.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepPessoal({ data, setData }) {
  return (
    <>
      <Input data={data} setData={setData} keyName="nome" placeholder="Nome" />
      <Input
        data={data}
        setData={setData}
        keyName="cnpj"
        placeholder="CNPJ"
        inputType={InputType.NUMBER}
      />
    </>
  );
}
