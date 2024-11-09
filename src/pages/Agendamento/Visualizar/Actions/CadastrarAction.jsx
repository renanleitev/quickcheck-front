import { useState } from 'react';
import { Button } from '@mui/material';
import AgendamentoCriar from '../../Gerenciar/Criar/AgendamentoCriar';
import EditModal from '../../../../components/Modal/EditModal';

export default function CadastrarAction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="info"
        sx={{ marginRight: '0.5rem' }}
        onClick={() => setOpen(true)}
      >
        Cadastrar
      </Button>
      <EditModal open={open} onClose={() => setOpen(false)}>
        <AgendamentoCriar setOpen={setOpen} />
      </EditModal>
    </>
  );
}
