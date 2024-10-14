import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

StepButtons.propTypes = {
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  setUserRole: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default function StepButtons({ activeStep, setActiveStep, setUserRole, steps }) {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      setUserRole('');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Button variant="contained" color="error" onClick={handleBack} sx={{ mr: 1 }}>
        Voltar
      </Button>
      <Button variant="contained" onClick={handleNext}>
        {activeStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
      </Button>
    </Box>
  );
}
