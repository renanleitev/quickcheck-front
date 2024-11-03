import Input from '../../Input/Input';
import PropTypes from 'prop-types';

StepDescricao.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default function StepDescricao({ data, setData, errors }) {
  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="horarioFuncionamento"
        placeholder="Horário de Funcionamento"
        error={errors?.errorHorario}
        errorText={errors?.errorHorarioText}
      />
      <Input
        data={data}
        setData={setData}
        keyName="descricao"
        placeholder="Informações Adicionais"
        error={errors?.errorDescricao}
        errorText={errors?.errorDescricaoText}
      />
    </>
  );
}
