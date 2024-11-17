import { Container, Typography, Box, Paper } from '@mui/material';

export default function Sobre() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Sobre o QuickCheck
        </Typography>
        <Box marginBottom={2}>
          <Typography variant="body1" paragraph>
            O QuickCheck é um aplicativo inovador projetado para facilitar o processo de marcação de
            consultas médicas. Nossa missão é simplificar a vida dos usuários, proporcionando uma
            plataforma intuitiva e eficiente para encontrar médicos, agendar consultas e gerenciar o
            histórico de visitas.
          </Typography>
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h5" gutterBottom>
            Funcionalidades Principais
          </Typography>
          <Typography variant="body1">
            • Agendamento rápido e fácil de consultas com médicos especializados.
            <br />
            • Possibilidade de escolher profissionais com base em localização, especialidade e
            avaliações de outros pacientes.
            <br />
            • Notificações automáticas para lembrar os usuários das consultas marcadas.
            <br />
            • Histórico detalhado de consultas anteriores para fácil acompanhamento.
            <br />• Opções de pagamento seguro e suporte para planos de saúde.
          </Typography>
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h5" gutterBottom>
            Por que escolher o QuickCheck?
          </Typography>
          <Typography variant="body1">
            O QuickCheck foi desenvolvido pensando na praticidade e na experiência do usuário. Com
            uma interface moderna e amigável, permite que você agende consultas em minutos,
            garantindo acesso rápido aos melhores profissionais de saúde. Seja para uma consulta de
            rotina ou para atender a uma emergência, o QuickCheck é a solução ideal para facilitar
            seu cuidado com a saúde.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Contato
          </Typography>
          <Typography variant="body1">
            Caso tenha dúvidas ou queira saber mais sobre o QuickCheck, entre em contato através do
            nosso e-mail: contato@quickcheck.com.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
