import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import colors from '../../config/colors';
import { textMarshal } from 'text-marshal';

const inputBorderRadius = '10px';

const TextFieldStyled = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    backgroundColor: colors.primaryWhiteColor
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: inputBorderRadius
  },
  '& .MuiSelect-outlined': {
    borderRadius: inputBorderRadius
  },
  '& .MuiFormLabel-root': {
    backgroundColor: colors.primaryWhiteColor,
    borderRadius: inputBorderRadius,
    padding: '0 10px'
  },
  '& .MuiFormLabel-root.Mui-error': {
    color: colors.warningColor
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: colors.warningColor
  }
}));

// eslint-disable-next-line react-refresh/only-export-components
export const InputType = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  PASSWORD: 'password'
};

Input.propTypes = {
  placeholder: PropTypes.string,
  keyName: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
      PropTypes.object
    ])
  ).isRequired,
  setData: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  select: PropTypes.bool,
  selectList: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number])
  ),
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  regex: PropTypes.shape(RegExp),
  format: PropTypes.string
};

function Input({
  placeholder,
  keyName,
  inputType = InputType.TEXT,
  data,
  setData,
  disabled = false,
  inputWidth,
  select = false,
  selectList = [],
  multiline = false,
  rows = 2,
  error = false,
  errorText,
  regex,
  format
}) {
  const handleInput = useCallback(
    (e) => {
      // Se houver um regex, bloqueia o input do usuário quando o valor não corresponde ao regex
      if (regex && e.target.value !== '' && !regex.test(e.target.value)) {
        return;
      }
      // Formata o input no padrão desejado
      if (format) {
        const { marshaltext } = textMarshal({
          input: e.target.value,
          template: format
        });
        e.target.value = String(marshaltext);
      }
      setData({
        ...data,
        [keyName]: e.target.value
      });
    },
    [data, format, keyName, regex, setData]
  );

  return (
    <TextFieldStyled
      type={select ? null : inputType}
      {...(multiline ? { defaultValue: data[keyName] } : { value: data[keyName] })}
      onChange={handleInput}
      label={placeholder}
      placeholder={placeholder}
      disabled={disabled}
      select={select}
      autoComplete="new-password"
      // Deixa o placeholder fixo no topo do input
      slotProps={{
        inputplaceholder: { shrink: true },
        htmlInput: {
          min: 0,
          step: 'any',
          style: {
            borderRadius: inputBorderRadius
          }
        },
        input: {
          style: {
            borderRadius: inputBorderRadius
          }
        }
      }}
      // Textarea
      multiline={multiline}
      rows={rows}
      // Style
      fullWidth
      sx={{
        width: inputWidth
      }}
      // Mensagens de erro
      error={error}
      helperText={error && errorText}
    >
      {selectList.map((selectItem) => {
        return (
          <MenuItem key={selectItem.value} value={selectItem.value}>
            {selectItem.label}
          </MenuItem>
        );
      })}
    </TextFieldStyled>
  );
}

export default Input;
