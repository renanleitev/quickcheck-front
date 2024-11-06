import { useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Input from '../../Input/Input';
import { HorizontalContainer } from '../../../config/GlobalStyle';
import EditModal from '../../Modal/EditModal';
import PropTypes from 'prop-types';
import colors from '../../../config/colors';

StepDescricao.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default function StepDescricao({ data, setData, errors }) {
  // Abrir o modal oculto
  const [openHorarioModal, setOpenHorarioModal] = useState(false);
  const [openDescricaoModal, setOpenDescricaoModal] = useState(false);

  const editButtonStyle = {
    backgroundColor: colors.infoColor,
    color: colors.primaryWhiteColor,
    ':hover': {
      backgroundColor: colors.primaryColor
    }
  };

  return (
    <>
      <HorizontalContainer style={{ flexWrap: 'nowrap', width: '100%' }}>
        <Input
          data={data}
          setData={setData}
          keyName="horarioFuncionamento"
          placeholder="Horário de Funcionamento"
          error={errors?.errorHorario}
          errorText={errors?.errorHorarioText}
        />
        <IconButton
          sx={editButtonStyle}
          onClick={() => setOpenHorarioModal(true)}
        >
          <EditIcon />
        </IconButton>
        <EditModal
          data={data}
          setData={setData}
          keyName="horarioFuncionamento"
          label="Horário de Funcionamento"
          open={openHorarioModal}
          onClose={() => setOpenHorarioModal(false)}
        />
      </HorizontalContainer>
      <HorizontalContainer style={{ flexWrap: 'nowrap', width: '100%' }}>
        <Input
          data={data}
          setData={setData}
          keyName="descricao"
          placeholder="Informações Adicionais"
          error={errors?.errorDescricao}
          errorText={errors?.errorDescricaoText}
        />
        <IconButton
          sx={editButtonStyle}
          onClick={() => setOpenDescricaoModal(true)}
        >
          <EditIcon />
        </IconButton>
        <EditModal
          data={data}
          setData={setData}
          keyName="descricao"
          label="Informações Adicionais"
          open={openDescricaoModal}
          onClose={() => setOpenDescricaoModal(false)}
        />
      </HorizontalContainer>
    </>
  );
}
