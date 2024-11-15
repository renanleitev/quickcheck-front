import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

InputHora.propTypes = {
  hora: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired
};

export default function InputHora({ hora, data, setData, keyName }) {
  const inputBorderRadius = '10px';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Horário"
        value={dayjs(hora)}
        sx={{
          backgroundColor: colors.primaryWhiteColor,
          borderRadius: inputBorderRadius,
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
        }}
        onChange={(value) => {
          setData({ ...data, [keyName]: value.$d });
        }}
      />
    </LocalizationProvider>
  );
}
