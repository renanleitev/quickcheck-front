import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { UserRoles, userLabels } from '../../config/enums';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as colors from '../../config/colors';

CadastroOptions.propTypes = {
  handleChange: PropTypes.func.isRequired
};

const StyledRadio = styled(Radio)(() => ({
  '&.Mui-checked': {
    color: colors.primaryWhiteColor
  }
}));

export default function CadastroOptions({ handleChange }) {
  return (
    <FormControl>
      <Typography variant="h6" marginBottom="1rem">
        Escolha uma das opções
      </Typography>
      <RadioGroup
        aria-labelledby="usuario-opcao-label"
        defaultValue={UserRoles.CLIENTE}
        name="radio-buttons-group"
        onChange={handleChange}>
        <FormControlLabel
          value={UserRoles.CLIENTE}
          control={<StyledRadio />}
          label={userLabels[UserRoles.CLIENTE]}
        />
        <FormControlLabel
          value={UserRoles.FUNCIONARIO}
          control={<StyledRadio />}
          label={userLabels[UserRoles.FUNCIONARIO]}
        />
        <FormControlLabel
          value={UserRoles.ESTABELECIMENTO}
          control={<StyledRadio />}
          label={userLabels[UserRoles.ESTABELECIMENTO]}
        />
      </RadioGroup>
    </FormControl>
  );
}
