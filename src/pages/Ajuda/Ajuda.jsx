import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';
import { faqQuickCheck } from './Perguntas';

Question.propTypes = {
  pergunta: PropTypes.string,
  resposta: PropTypes.string
};

function Question({ pergunta, resposta }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>{pergunta}</AccordionSummary>
      <AccordionDetails>{resposta}</AccordionDetails>
    </Accordion>
  );
}

export default function Ajuda() {
  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h5" sx={{ color: colors.primaryDarkColor }}>
        Perguntas Frequentes
      </Typography>
      {faqQuickCheck.map((q) => (
        <Question pergunta={q.pergunta} resposta={q.resposta} key={q.pergunta} />
      ))}
    </VerticalContainer>
  );
}
