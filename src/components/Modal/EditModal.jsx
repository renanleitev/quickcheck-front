import { Box, Modal } from '@mui/material';
import colors from '../../config/colors';
import PropTypes from 'prop-types';

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

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

export default function EditModal({ open, onClose, children }) {
  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
