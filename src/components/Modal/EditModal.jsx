import { Box, Button, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import colors from '../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../config/GlobalStyle';
import Input from '../Input/Input';

EditModal.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: colors.primaryWhiteColor,
  border: `2px solid ${colors.primaryGrayColor}`,
  p: 4
};

export default function EditModal({ data, setData, open, onClose, keyName, label }) {
  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="edit-modal-title"
          variant="h6"
          component="h2"
          color={colors.primaryDarkColor}
          textAlign="center"
          marginBottom="1rem"
        >
          {label}
        </Typography>
        <VerticalContainer style={{ rowGap: '2rem' }}>
          <Input data={data} setData={setData} keyName={keyName} multiline rows={10} />
          <HorizontalContainer>
            <Button variant="contained" color="success" onClick={() => onClose()}>
              Editar
            </Button>
          </HorizontalContainer>
        </VerticalContainer>
      </Box>
    </Modal>
  );
}
