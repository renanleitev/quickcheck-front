import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const TextFieldStyled = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    backgroundColor: 'white'
  }
}));

// eslint-disable-next-line react-refresh/only-export-components
export const InputType = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  TEXTAREA: 'textarea',
  PASSWORD: 'password'
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
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
  selectList: PropTypes.arrayOf(PropTypes.object)
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
  selectList = []
}) {
  const handleInput = useCallback(
    (e) => {
      setData({
        ...data,
        [keyName]: e.currentTarget.value
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

  const inputBorderRadius = '10px';

  return (
    <TextFieldStyled
      type={select ? null : inputType}
      value={data[keyName]}
      onChange={handleInput}
      placeholder={placeholder}
      disabled={disabled}
      select={select}
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
      multiline={inputType === InputType.TEXTAREA}
      rows={2}
      // Style
      fullWidth
      sx={{
        width: inputWidth,
        '& .MuiSelect-outlined': {
          borderRadius: inputBorderRadius,
        },
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
