import { useCallback } from 'react';
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
  isSetupFinished: PropTypes.bool,
  onValidateForm: PropTypes.func,
};

export default function StepButtons({
  activeStep,
  setActiveStep,
  onReset,
  stepsNumber,
  nextStepLabel = 'Avançar',
  disableNextButton = false,
  isSetupFinished = false,
  onValidateForm
}) {
  const handleNext = useCallback(() => {
    onValidateForm();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [onValidateForm, setActiveStep]);

  const handleBack = () => {
    if (activeStep === 0 || isSetupFinished) {
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
      {!isSetupFinished && (
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
