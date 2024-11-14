import { Avatar, Box, CardHeader, Checkbox, Typography } from '@mui/material';
import { VerticalContainer, HorizontalContainer } from '../../../../config/GlobalStyle';
import colors from '../../../../config/colors';
import PropTypes from 'prop-types';
import formatDate from '../../../../hooks/formatDate';
import EmptyState from '../../../EmptyState/EmptyState';

StepHorarios.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  setFuncionario: PropTypes.func.isRequired,
  horarios: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default function StepHorarios({ data, setData, setFuncionario, horarios }) {
  return (
    <VerticalContainer style={{ rowGap: '0rem', padding: '1rem' }}>
      <Typography variant="h5" color={colors.primaryWhiteColor}>
        Horários
      </Typography>
      {horarios.length === 0 && (
        <Box p="2rem">
          <EmptyState title="Nenhum horário disponível" />
        </Box>
      )}
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
                  src={horario?.funcionario?.usuario?.imagem}
                >
                  {horario?.funcionario?.usuario?.nome.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={horario?.funcionario?.usuario?.nome}
              titleTypographyProps={{ color: colors.primaryWhiteColor }}
              subheader={formatDate(horario?.horarioAtendimento)}
              subheaderTypographyProps={{ color: colors.primaryWhiteColor }}
              onClick={() => setFuncionario({ ...horario?.funcionario })}
              sx={{ cursor: 'pointer', width: '80%' }}
            />
            <Box ml="auto">
              <Checkbox
                checked={horario?.id === data?.horario?.id}
                onChange={() => setData({ ...data, horario: { ...horario } })}
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
    </VerticalContainer>
  );
}
