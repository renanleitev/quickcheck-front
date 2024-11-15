import PropTypes from 'prop-types';

import Input from '../Input';
import { telefoneFormat, telefoneRegex } from '../../../config/validationRegex';

InputContato.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default function InputContato({ data, setData, errors }) {
  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="telefone"
        placeholder="Telefone"
        error={errors?.errorTelefone}
        errorText={errors?.errorTelefoneText}
        regex={telefoneRegex}
        format={telefoneFormat}
      />
      <Input
        data={data}
        setData={setData}
        keyName="endereco"
        placeholder="Endereço"
        error={errors?.errorEndereco}
        errorText={errors?.errorEnderecoText}
      />
      {/* TODO: Substituir por upload de imagens BLOB */}
      <Input data={data} setData={setData} keyName="imagem" placeholder="Imagem (Opcional)" />
    </>
  );
}
