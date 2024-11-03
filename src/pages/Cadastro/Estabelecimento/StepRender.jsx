import StepPessoal from '../../../components/Step/StepContent/StepPessoal';
import StepContato from '../../../components/Step/StepContent/StepContato';
import StepDescricao from '../../../components/Step/StepContent/StepDescricao';
import StepLogin from '../../../components/Step/StepContent/StepLogin';
import { UserRoles } from '../../../config/enums';
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
      return <StepContato data={data} setData={setData} errors={errors} />;
    case 2:
      return <StepDescricao data={data} setData={setData} errors={errors} />;
    case 3:
      return <StepLogin data={data} setData={setData} errors={errors} />;
    case 0:
    default:
      return (
        <StepPessoal
          data={data}
          setData={setData}
          role={UserRoles.ESTABELECIMENTO}
          errors={errors}
        />
      );
  }
}
