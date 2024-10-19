import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

StepCount.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired
};

export default function StepCount({ steps, activeStep }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          return (
            <Step
              key={label}
              sx={{
                // https://mui.com/material-ui/api/step/
                // https://mui.com/material-ui/api/step-icon/
                '& .MuiStepLabel-root .Mui-completed': {
                  color: colors.primaryWhiteColor // circle color (COMPLETED)
                },
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                  color: colors.primaryWhiteColor // Just text label (COMPLETED)
                },
                '& .MuiStepLabel-root .Mui-active': {
                  color: colors.primaryWhiteColor // circle color (ACTIVE)
                },
                '& .MuiStepLabel-label': {
                  color: colors.primaryWhiteColor // Just text label (ACTIVE)
                },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                  color: colors.primaryWhiteColor // Just text label (ACTIVE)
                },
                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                  fill: colors.primaryDarkColor // circle's number (ACTIVE)
                }
              }}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
