import { Avatar, Box, CardHeader, Checkbox } from '@mui/material';
import Input from '../../../Input/Input';
import { VerticalContainer, HorizontalContainer } from '../../../../config/GlobalStyle';
import { especialidadesOptions } from '../../../../config/enums';
import colors from '../../../../config/colors';
import PropTypes from 'prop-types';
import formatDate from '../../../../hooks/formatDate';

StepHorarios.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  horarios: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default function StepHorarios({ data, setData, horarios }) {
  return (
    <VerticalContainer style={{ rowGap: '0rem', padding: '1rem' }}>
      <Input
        data={data}
        setData={setData}
        keyName="especialidade"
        placeholder="Especialidade"
        select
        selectList={especialidadesOptions}
      />
      {horarios.map((horario) => {
        return (
          <HorizontalContainer
            key={horario.id}
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ backgroundColor: colors.primaryWhiteColor, color: colors.primaryColor }}
                  aria-label="estabelecimento-nome"
                >
                  {horario?.funcionario?.nome.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={horario?.funcionario?.nome}
              titleTypographyProps={{ color: colors.primaryWhiteColor }}
              subheader={formatDate(horario?.horarioAtendimento)}
              subheaderTypographyProps={{ color: colors.primaryWhiteColor }}
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
    </VerticalContainer>
  );
}
