import Input from '../Input/Input';
import PropTypes from 'prop-types';

StepDescricao.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepDescricao({ data, setData }) {
  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="horarioFuncionamento"
        placeholder="Horário de Funcionamento"
      />
      <Input
        data={data}
        setData={setData}
        keyName="descricao"
        placeholder="Informações Adicionais"
      />
    </>
  );
}
