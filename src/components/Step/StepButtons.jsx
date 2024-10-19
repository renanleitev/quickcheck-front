import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

StepButtons.propTypes = {
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  nextStepLabel: PropTypes.string
};

export default function StepButtons({
  activeStep,
  setActiveStep,
  onReset,
  steps,
  nextStepLabel = 'Avançar'
}) {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      onReset();
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
        {activeStep === steps.length - 1 ? 'Finalizar' : nextStepLabel}
      </Button>
    </Box>
  );
}
