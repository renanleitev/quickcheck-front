import Input from '../../Input/Input';
import PropTypes from 'prop-types';

StepContato.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default function StepContato({ data, setData, errors }) {
  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="telefone"
        placeholder="Telefone"
        error={errors?.errorTelefone}
        errorText={errors?.errorTelefoneText}
      />
      <Input
        data={data}
        setData={setData}
        keyName="endereco"
        placeholder="Endereço"
        error={errors?.errorEndereco}
        errorText={errors?.errorEnderecoText}
      />
    </>
  );
}
