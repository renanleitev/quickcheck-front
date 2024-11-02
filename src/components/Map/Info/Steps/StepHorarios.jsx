import { useState } from 'react';
import { Avatar, Box, CardHeader, Checkbox } from '@mui/material';
import Input from '../../../Input/Input';
import { VerticalContainer, HorizontalContainer } from '../../../../config/GlobalStyle';
import { especialidadesOptions } from '../../../../config/enums';
import colors from '../../../../config/colors';
import PropTypes from 'prop-types';
import formatDate from '../../../../hooks/formatDate';
import StepInfo from './StepInfo';

StepHorarios.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  horarios: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default function StepHorarios({ data, setData, horarios }) {
  const [profile, setProfile] = useState(undefined);

  return (
    <VerticalContainer style={{ rowGap: '0rem', padding: '1rem' }}>
      {profile !== undefined ? (
        <StepInfo
          imagem={profile?.usuario?.imagem}
          info={profile?.usuario?.nome}
          subInfo={profile?.especialidade}
        />
      ) : (
        <>
          <Input
            data={data}
            setData={setData}
            keyName="especialidade"
            placeholder="Especialidade"
            selectList={especialidadesOptions}
            select
          />
          {horarios.map((horario) => {
            return (
              <HorizontalContainer
                key={horario?.horarioAtendimento}
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ backgroundColor: colors.primaryWhiteColor, color: colors.primaryColor }}
                      aria-label="estabelecimento-nome"
                    >
                      {horario?.funcionario?.usuario?.nome.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={horario?.funcionario?.usuario?.nome}
                  titleTypographyProps={{ color: colors.primaryWhiteColor }}
                  subheader={formatDate(horario?.horarioAtendimento)}
                  subheaderTypographyProps={{ color: colors.primaryWhiteColor }}
                  onClick={() => setProfile(horario?.funcionario)}
                  sx={{ cursor: 'pointer' }}
                />
                <Box ml="auto">
                  <Checkbox
                    checked={horario?.id === data?.horario?.id}
                    onChange={() => setData({ ...data, horario })}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                      color: colors.primaryWhiteColor,
                      '&.Mui-checked': {
                        color: colors.primaryWhiteColor
                      }
                    }}
                  />
                </Box>
              </HorizontalContainer>
            );
          })}
        </>
      )}
    </VerticalContainer>
  );
}
