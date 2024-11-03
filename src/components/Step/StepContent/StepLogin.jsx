import Input, { InputType } from '../../Input/Input';
import PropTypes from 'prop-types';

StepLogin.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  hasRepetirSenha: PropTypes.bool,
  errors: PropTypes.object
};

export default function StepLogin({ data, setData, errors, hasRepetirSenha = true }) {
  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="email"
        placeholder="Email"
        error={errors?.errorEmail}
        errorText={errors?.errorEmailText}
      />
      <Input
        data={data}
        setData={setData}
        keyName="senha"
        placeholder="Senha"
        inputType={InputType.PASSWORD}
        error={errors?.errorSenha}
        errorText={errors?.errorSenhaText}
      />
      {hasRepetirSenha && (
        <Input
          data={data}
          setData={setData}
          keyName="repetirSenha"
          placeholder="Repetir Senha"
          inputType={InputType.PASSWORD}
          error={errors?.errorRepetirSenha}
          errorText={errors?.errorRepetirSenhaText}
        />
      )}
    </>
  );
}
