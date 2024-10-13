import StepPessoal from './Steps/StepPessoal';
import StepContato from './Steps/StepContato';
import StepDescricao from './Steps/StepDescricao';
import StepFinal from './Steps/StepFinal';
import PropTypes from 'prop-types';

StepRender.propTypes = {
  step: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default function StepRender({ step, data, setData }) {
  switch (step) {
    case 1:
      return <StepContato data={data} setData={setData} />;
    case 2:
      return <StepDescricao data={data} setData={setData} />;
    case 3:
      return <StepFinal data={data} setData={setData} />;
    case 0:
    default:
      return <StepPessoal data={data} setData={setData} />;
  }
}
