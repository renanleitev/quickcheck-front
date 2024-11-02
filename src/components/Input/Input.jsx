import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import colors from '../../config/colors';

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
  selectList: PropTypes.arrayOf([PropTypes.object, PropTypes.string, PropTypes.number]),
  multiline: PropTypes.bool,
  rows: PropTypes.number
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
  rows = 2
}) {
  const handleInput = useCallback(
    (e) => {
      setData({
        ...data,
        [keyName]: e.target.value
      });
    },
    [data, keyName, setData]
  );

  // const isError = () => {
  //   if (typeof data[keyName] === 'string' && data[keyName] === '') {
  //     return true;
  //   }
  //   if (typeof data[keyName] === 'number' && data[keyName] === 0) {
  //     return true;
  //   }
  //   return false;
  // };
  // const error = isError();
  // const errorText = `${placeholder} não pode ser vazio`;

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
      // Fix placeholder on top of input
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
      // Error text
      // error={error}
      // helperText={error && errorText}
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
