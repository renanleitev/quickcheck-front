import Input, { InputType } from '../../Input/Input';
import { UserRoles } from '../../../config/enums';
import PropTypes from 'prop-types';

StepPessoal.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  role: PropTypes.string,
  errors: PropTypes.object
};

export default function StepPessoal({ data, setData, role, errors }) {
  // Regex progressivo (valida conforme o usuário digita os números e os caracteres especiais)
  const cpfRegex =
    /^(\d{0,3}|\d{3}\.?\d{0,3}|\d{3}\.\d{3}\.?\d{0,3}|\d{3}\.\d{3}\.\d{3}-?\d{0,2})$/;
  const cnpjRegex =
    /^(\d{0,2}|\d{2}\.?\d{0,3}|\d{2}\.\d{3}\.?\d{0,3}|\d{2}\.\d{3}\.\d{3}\/?\d{0,4}|\d{2}\.\d{3}\.\d{3}\/\d{4}-?\d{0,2})$/;

  // Formato específico para CPF e CNPJ
  const cpfFormat = "XXX.XXX.XXX-XX";
  const cnpjFormat = "XX.XXX.XXX/XXXX-XX";

  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="nome"
        placeholder="Nome"
        error={errors?.errorNome}
        errorText={errors?.errorNomeText}
      />
      {role === UserRoles.ESTABELECIMENTO ? (
        <Input
          data={data}
          setData={setData}
          keyName="cnpj"
          placeholder="CNPJ"
          error={errors?.errorCnpj}
          errorText={errors?.errorCnpjText}
          regex={cnpjRegex}
          format={cnpjFormat}
        />
      ) : (
        <>
          <Input
            data={data}
            setData={setData}
            keyName="cpf"
            placeholder="CPF"
            error={errors?.errorCpf}
            errorText={errors?.errorCpfText}
            regex={cpfRegex}
            format={cpfFormat}
          />
          <Input
            data={data}
            setData={setData}
            keyName="nascimento"
            inputType={InputType.DATE}
            placeholder="Data de Nascimento"
          />
        </>
      )}
    </>
  );
}
