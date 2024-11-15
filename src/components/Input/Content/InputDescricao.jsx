import { useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

import Input from '../Input';
import { HorizontalContainer } from '../../../config/GlobalStyle';
import ActionModal from '../../Modal/ActionModal';
import colors from '../../../config/colors';

InputDescricao.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object,
  hasHorarioFuncionamento: PropTypes.bool,
  hasProntuario: PropTypes.bool
};

export default function InputDescricao({
  data,
  setData,
  errors,
  hasHorarioFuncionamento = true,
  hasProntuario = false
}) {
  // Abrir o modal oculto
  const [openHorarioModal, setOpenHorarioModal] = useState(false);
  const [openDescricaoModal, setOpenDescricaoModal] = useState(false);
  const [openProntuarioModal, setOpenProntuarioModal] = useState(false);

  const editButtonStyle = {
    backgroundColor: colors.infoColor,
    color: colors.primaryWhiteColor,
    ':hover': {
      backgroundColor: colors.primaryColor
    }
  };

  return (
    <>
      {hasHorarioFuncionamento && (
        <HorizontalContainer style={{ flexWrap: 'nowrap', width: '100%' }}>
          <Input
            data={data}
            setData={setData}
            keyName="horarioFuncionamento"
            placeholder="Horário de Funcionamento"
            error={errors?.errorHorario}
            errorText={errors?.errorHorarioText}
          />
          <IconButton sx={editButtonStyle} onClick={() => setOpenHorarioModal(true)}>
            <EditIcon />
          </IconButton>
          <ActionModal
            data={data}
            setData={setData}
            keyName="horarioFuncionamento"
            title="Horário de Funcionamento"
            open={openHorarioModal}
            onConfirm={() => setOpenHorarioModal(false)}
            onClose={() => setOpenHorarioModal(false)}
          />
        </HorizontalContainer>
      )}
      {hasProntuario && (
        <HorizontalContainer style={{ flexWrap: 'nowrap', width: '100%' }}>
          <Input
            data={data}
            setData={setData}
            keyName="prontuario"
            placeholder="Prontuário"
            error={errors?.errorHorario}
            errorText={errors?.errorHorarioText}
          />
          <IconButton sx={editButtonStyle} onClick={() => setOpenProntuarioModal(true)}>
            <EditIcon />
          </IconButton>
          <ActionModal
            data={data}
            setData={setData}
            keyName="prontuario"
            title="Prontuário"
            open={openProntuarioModal}
            onConfirm={() => setOpenProntuarioModal(false)}
            onClose={() => setOpenProntuarioModal(false)}
          />
        </HorizontalContainer>
      )}
      <HorizontalContainer style={{ flexWrap: 'nowrap', width: '100%' }}>
        <Input
          data={data}
          setData={setData}
          keyName="descricao"
          placeholder="Informações Adicionais"
          error={errors?.errorDescricao}
          errorText={errors?.errorDescricaoText}
        />
        <IconButton sx={editButtonStyle} onClick={() => setOpenDescricaoModal(true)}>
          <EditIcon />
        </IconButton>
        <ActionModal
          data={data}
          setData={setData}
          keyName="descricao"
          title="Informações Adicionais"
          open={openDescricaoModal}
          onConfirm={() => setOpenDescricaoModal(false)}
          onClose={() => setOpenDescricaoModal(false)}
        />
      </HorizontalContainer>
    </>
  );
}
