import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

StepButtons.propTypes = {
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  stepsNumber: PropTypes.number.isRequired,
  nextStepLabel: PropTypes.string,
  disableNextButton: PropTypes.bool,
  hideNextButton: PropTypes.bool
};

export default function StepButtons({
  activeStep,
  setActiveStep,
  onReset,
  stepsNumber,
  nextStepLabel = 'Avançar',
  disableNextButton = false,
  hideNextButton = false
}) {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0 || activeStep === stepsNumber - 1) {
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
      {!hideNextButton && (
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={disableNextButton}
          sx={{
            '&.Mui-disabled': {
              color: colors.secondaryGrayColor
            }
          }}
        >
          {activeStep === stepsNumber - 1 ? 'Finalizar' : nextStepLabel}
        </Button>
      )}
    </Box>
  );
}
