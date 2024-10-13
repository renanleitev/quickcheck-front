import Input, { InputType } from '../../../../components/Input/Input';
import PropTypes from 'prop-types';

StepFinal.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepFinal({ data, setData }) {
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
