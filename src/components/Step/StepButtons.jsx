import { useCallback, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
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
  onCallApi: PropTypes.func,
  isCallingApi: PropTypes.bool,
  hasCustomReturnStep: PropTypes.bool,
  onCustomReturnStep: PropTypes.func
};

export default function StepButtons({
  activeStep,
  setActiveStep,
  onReset,
  stepsNumber,
  nextStepLabel = 'Avançar',
  disableNextButton = false,
  isSetupFinished = false,
  onValidateForm,
  onCallApi,
  isCallingApi = false,
  hasCustomReturnStep,
  onCustomReturnStep
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = useCallback(() => {
    onValidateForm && onValidateForm();
    if (onCallApi && isCallingApi) {
      setIsLoading(true);
      onCallApi();
      setIsLoading(false);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }, [onValidateForm, onCallApi, isCallingApi, setActiveStep]);

  const handleBack = () => {
    if (activeStep === 0 || isSetupFinished) {
      onReset();
    } else if (hasCustomReturnStep && onCustomReturnStep) {
      onCustomReturnStep();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Button variant="contained" color="error" onClick={handleBack} sx={{ mr: 1 }}>
        Voltar
      </Button>
      {/* Omite o next button quando atinge o último step */}
      {!isSetupFinished && (
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={disableNextButton || isLoading}
          sx={{
            '&.Mui-disabled': {
              color: colors.secondaryGrayColor
            }
          }}
        >
          {isLoading ? (
            <CircularProgress size="1rem" sx={{ color: colors.primaryWhiteColor }} />
          ) : activeStep === stepsNumber - 1 ? (
            'Finalizar'
          ) : (
            nextStepLabel
          )}
        </Button>
      )}
    </Box>
  );
}
