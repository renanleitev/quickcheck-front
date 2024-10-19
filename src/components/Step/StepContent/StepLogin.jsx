import Input, { InputType } from '../../Input/Input';
import PropTypes from 'prop-types';

StepLogin.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepLogin({ data, setData }) {
  return (
    <>
      <Input data={data} setData={setData} keyName="email" placeholder="Email" />
      <Input
        data={data}
        setData={setData}
        keyName="senha"
        placeholder="Senha"
        inputType={InputType.PASSWORD}
      />
      <Input
        data={data}
        setData={setData}
        keyName="repetirSenha"
        placeholder="Repetir Senha"
        inputType={InputType.PASSWORD}
      />
    </>
  );
}
