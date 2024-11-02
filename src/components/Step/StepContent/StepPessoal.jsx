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
        <Input data={data} setData={setData} keyName="cnpj" placeholder="CNPJ" />
      ) : (
        <>
          <Input
            data={data}
            setData={setData}
            keyName="cpf"
            placeholder="CPF"
            inputType={InputType.NUMBER}
            error={errors?.errorCpf}
            errorText={errors?.errorCpfText}
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
