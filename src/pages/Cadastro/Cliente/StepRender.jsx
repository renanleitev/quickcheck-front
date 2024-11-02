import StepPessoal from '../../../components/Step/StepContent/StepPessoal';
import StepContato from '../../../components/Step/StepContent/StepContato';
import StepSaude from '../../../components/Step/StepContent/StepSaude';
import StepLogin from '../../../components/Step/StepContent/StepLogin';
import PropTypes from 'prop-types';

StepRender.propTypes = {
  step: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default function StepRender({ step, data, setData, errors }) {
  switch (step) {
    case 1:
      return <StepContato data={data} setData={setData} />;
    case 2:
      return <StepSaude data={data} setData={setData} />;
    case 3:
      return <StepLogin data={data} setData={setData} />;
    case 0:
    default:
      return <StepPessoal data={data} setData={setData} errors={errors} />;
  }
}
