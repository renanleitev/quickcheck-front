import Input, { InputType } from '../../Input/Input';
import { UserRoles } from '../../../config/enums';
import PropTypes from 'prop-types';

StepPessoal.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  role: PropTypes.string
};

export default function StepPessoal({ data, setData, role }) {
  return (
    <>
      <Input data={data} setData={setData} keyName="nome" placeholder="Nome" />
      {role === UserRoles.ESTABELECIMENTO ? (
        <Input
          data={data}
          setData={setData}
          keyName="cnpj"
          placeholder="CNPJ"
          inputType={InputType.NUMBER}
        />
      ) : (
        <Input
          data={data}
          setData={setData}
          keyName="cpf"
          placeholder="CPF"
          inputType={InputType.NUMBER}
        />
      )}
      <Input
        data={data}
        setData={setData}
        keyName="nascimento"
        inputType={InputType.DATE}
        placeholder="Data de Nascimento"
      />
    </>
  );
}
