import { Checkbox, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import Input from '../Input';
import { HorizontalContainer } from '../../../config/GlobalStyle';
import { comorbidadesOptions, sexoOptions } from '../../../config/enums';
import colors from '../../../config/colors';

InputSaude.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  hasCompartilharDados: PropTypes.bool
};

export default function InputSaude({ data, setData, hasCompartilharDados = true }) {
  return (
    <>
      <Input
        data={data}
        setData={setData}
        keyName="comorbidades"
        placeholder="Comorbidades"
        select
        selectList={comorbidadesOptions}
      />
      <Input
        data={data}
        setData={setData}
        keyName="sexo"
        select
        selectList={sexoOptions}
        placeholder="Sexo"
      />
      {hasCompartilharDados && (
        <HorizontalContainer style={{ flexWrap: 'nowrap' }}>
          <Checkbox
            size="small"
            onChange={() => setData({ ...data, compartilharDados: !data.compartilharDados })}
            sx={{
              color: colors.primaryWhiteColor,
              '&.Mui-checked': {
                color: colors.primaryWhiteColor
              }
            }}
          />
          <Typography variant="subtitle2">
            Autorizo que os meus dados pessoais sejam utilizados em conformidade com a{' '}
            <Link
              href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colors.primaryWhiteColor }}
            >
              Lei Geral de Proteção de Dados
            </Link>
            .
          </Typography>
        </HorizontalContainer>
      )}
    </>
  );
}
