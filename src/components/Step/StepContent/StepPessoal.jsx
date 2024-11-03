import Input, { InputType } from '../../Input/Input';
import { UserRoles } from '../../../config/enums';
import {
  cpfRegex,
  cpfFormat,
  cnpjRegex,
  cnpjFormat,
  onlyLettersRegex
} from '../../../config/validationRegex';
import { estabelecimentosOptions } from '../../../mocks/estabelecimentos';
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
        regex={onlyLettersRegex}
      />
      {role === UserRoles.ESTABELECIMENTO ? (
        <>
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
          <Input
            data={data}
            setData={setData}
            keyName="tipo"
            placeholder="Tipo"
            select
            selectList={estabelecimentosOptions}
          />
        </>
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
            error={errors?.errorIdade}
            errorText={errors?.errorIdadeText}
          />
        </>
      )}
    </>
  );
}
