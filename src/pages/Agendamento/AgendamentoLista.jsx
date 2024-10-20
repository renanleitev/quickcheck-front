import { useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import formatDate from '../../hooks/formatDate';

import { horarios } from '../../mocks/horarios';

export default function AgendamentoLista() {
  // Expandir a linha oculta
  const [open, setOpen] = useState(false);

  // Paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  // Configurações da tabela
  const columnWidth = 150;
  const labelRowsPerPage = 'Resultados por página';

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {/* Cabeçalho */}
        <TableHead>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            {/* Espaço reservado para o ícone de expandir a linha oculta */}
            <TableCell />
            <TableCell sx={{ minWidth: columnWidth }}>Horário</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Médico</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Especialidade</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Hospital/Clínica</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Telefone</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Endereço</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Status</TableCell>
          </TableRow>
        </TableHead>
        {/* Resultados */}
        <TableBody>
          {horarios.map((horario) => (
            <>
              {/* Linha padrão - sempre visível */}
              <TableRow
                key={horario.nome}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* Ícone para expandir a linha oculta */}
                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                {/* Informações relevantes */}
                <TableCell component="th" scope="row">
                  {formatDate(horario.horarioAtendimento)}
                </TableCell>
                <TableCell>{horario.funcionario.nome}</TableCell>
                <TableCell>{horario.funcionario.especialidade}</TableCell>
                <TableCell>{horario.estabelecimento.nome}</TableCell>
                <TableCell>{horario.estabelecimento.telefone}</TableCell>
                <TableCell>{horario.estabelecimento.endereco}</TableCell>
                <TableCell>{horario.status}</TableCell>
              </TableRow>
              {/* Linha oculta - expande quando o usuário clica no ícone */}
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box width="80vw" p="2rem">
                      <Typography variant="h6">{horario.descricao}</Typography>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
        {/* Paginação */}
        <TableFooter>
          <TableRow sx={{ width: '100%' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={horarios.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': labelRowsPerPage
                  },
                  native: true
                }
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
