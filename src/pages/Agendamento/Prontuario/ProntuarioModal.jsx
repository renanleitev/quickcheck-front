import { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import colors from '../../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../../config/GlobalStyle';
import Input from '../../../components/Input/Input';

ProntuarioModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  prontuario: PropTypes.string.isRequired
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

export default function ProntuarioModal({ open, onClose, prontuario }) {
  const initialData = { prontuario };
  const [data, setData] = useState({ ...initialData });
  const [editProntuario, setEditProntuario] = useState(false);

  const handleClose = () => {
    setEditProntuario(false);
    onClose();
  };

  const handleCancel = () => {
    setData({ ...initialData, prontuario });
    setEditProntuario(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="prontuario-modal-title"
      aria-describedby="prontuario-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="prontuario-modal-title"
          variant="h6"
          component="h2"
          color={colors.primaryDarkColor}
          textAlign="center"
          marginBottom="1rem"
        >
          Prontuário
        </Typography>
        <VerticalContainer style={{ rowGap: '2rem' }}>
          {editProntuario ? (
            <Input data={data} setData={setData} keyName="prontuario" multiline rows={10} />
          ) : (
            <Typography
              id="prontuario-modal-description"
              sx={{ mt: 2 }}
              color={colors.primaryDarkColor}
            >
              {prontuario}
            </Typography>
          )}
          <HorizontalContainer>
            {editProntuario && (
              <Button variant="contained" color="error" onClick={handleCancel}>
                Cancelar
              </Button>
            )}
            <Button variant="contained" color="success" onClick={() => setEditProntuario(true)}>
              Editar
            </Button>
          </HorizontalContainer>
        </VerticalContainer>
      </Box>
    </Modal>
  );
}
