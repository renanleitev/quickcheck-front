import { useState } from 'react';
import { Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PropTypes from 'prop-types';

import AgendamentoCadastrar from '../../Gerenciar/Cadastrar/AgendamentoCadastrar';
import EditModal from '../../../../components/Modal/EditModal';

CadastrarAction.propTypes = {
  funcionarioData: PropTypes.object
};

export default function CadastrarAction({ funcionarioData }) {
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
        <PostAddIcon sx={{ marginLeft: '0.5rem', marginBottom: '0.1rem' }} />
      </Button>
      <EditModal open={open} onClose={() => setOpen(false)}>
        <AgendamentoCadastrar setOpen={setOpen} funcionarioData={funcionarioData} />
      </EditModal>
    </>
  );
}
