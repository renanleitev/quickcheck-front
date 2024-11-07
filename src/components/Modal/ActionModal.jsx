import { Box, Button, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import colors from '../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../config/GlobalStyle';
import Input from '../Input/Input';

ActionModal.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  readOnlyText: PropTypes.string,
  readOnly: PropTypes.bool,
  confirmColor: PropTypes.string
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

export default function ActionModal({
  data,
  setData,
  open,
  onClose,
  onConfirm,
  confirmLabel = 'Confirmar',
  keyName,
  label,
  readOnly = false,
  readOnlyText,
  confirmColor = 'success'
}) {
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
          {readOnly ? (
            <Typography color={colors.primaryDarkColor}>{readOnlyText}</Typography>
          ) : (
            <Input data={data} setData={setData} keyName={keyName} multiline rows={10} />
          )}
          <HorizontalContainer>
            <Button variant="contained" color="info" onClick={() => onClose()}>
              Voltar
            </Button>
            <Button variant="contained" color={confirmColor} onClick={() => onConfirm()}>
              {confirmLabel}
            </Button>
          </HorizontalContainer>
        </VerticalContainer>
      </Box>
    </Modal>
  );
}
