import StepPessoal from '../../../components/StepContent/StepPessoal';
import StepContato from '../../../components/StepContent/StepContato';
import StepSaude from '../../../components/StepContent/StepSaude';
import StepLogin from '../../../components/StepContent/StepLogin';
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
      return <StepSaude data={data} setData={setData} />;
    case 3:
      return <StepLogin data={data} setData={setData} />;
    case 0:
    default:
      return <StepPessoal data={data} setData={setData} />;
  }
}
