import Input from '../Input/Input';
import PropTypes from 'prop-types';

StepContato.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepContato({ data, setData }) {
  return (
    <>
      <Input data={data} setData={setData} keyName="telefone" placeholder="Telefone" />
      <Input data={data} setData={setData} keyName="endereco" placeholder="Endereço" />
    </>
  );
}
