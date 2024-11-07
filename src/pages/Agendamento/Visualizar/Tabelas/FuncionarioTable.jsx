import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
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
  Paper
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChipStatus from '../../../../components/Chip/ChipStatus';
import formatDate from '../../../../hooks/formatDate';
import {
  getHorarios,
  updateHorarioProntuario,
  updateHorarioStatus,
  initialHorario
} from '../../../../store/modules/horarios/reducer';
import ActionModal from '../../../../components/Modal/ActionModal';
import { AgendamentoStatus } from '../../../../config/enums';

export default function FuncionarioTable() {
  const horarios = useSelector((state) => state?.horarios?.horarios) || [];

  const dispatch = useDispatch();

  const [horario, setHorario] = useState({ ...initialHorario });

  // Abrir o modal oculto (Prontuário)
  const [openProntuarioModal, setOpenProntuarioModal] = useState(false);

  // Abrir o modal oculto (Concluir Horário)
  const [openConcluirHorarioModal, setOpenConcluirHorarioModal] = useState(false);

  // Abrir o modal oculto (Cancelar Horário)
  const [openCancelarHorarioModal, setOpenCancelarHorarioModal] = useState(false);

  // Expandir a linha oculta
  const [openHiddenRow, setOpenHiddenRow] = useState(false);

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
  const labelRowsPerPage = 'Resultados';

  // Obtendo os horários
  // TODO: Obter os horários de acordo com cada funcionário
  useEffect(() => {
    dispatch(getHorarios());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {/* Cabeçalho */}
        <TableHead>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            {/* Espaço reservado para o ícone de expandir a linha oculta */}
            <TableCell />
            <TableCell sx={{ minWidth: columnWidth }}>Horário</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Paciente</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Comorbidades</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Hospital/Clínica</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Telefone</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Endereço</TableCell>
            <TableCell sx={{ minWidth: columnWidth }}>Status</TableCell>
          </TableRow>
        </TableHead>
        {/* Resultados */}
        <TableBody>
          {horarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((horario) => (
            <>
              {/* Linha padrão - sempre visível */}
              <TableRow
                key={`${horario.id}-${horario?.horarioAtendimento}-1`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* Ícone para expandir a linha oculta */}
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpenHiddenRow(!openHiddenRow)}
                  >
                    {openHiddenRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                {/* Informações relevantes */}
                <TableCell component="th" scope="row">
                  {formatDate(horario?.horarioAtendimento)}
                </TableCell>
                <TableCell>{horario?.cliente?.usuario?.nome}</TableCell>
                {/* Comorbidades é um array */}
                <TableCell>{horario?.cliente?.comorbidades.join(', ')}</TableCell>
                <TableCell>{horario?.estabelecimento?.usuario?.nome}</TableCell>
                <TableCell>{horario.estabelecimento?.usuario?.telefone}</TableCell>
                <TableCell>{horario.estabelecimento?.usuario?.endereco}</TableCell>
                <TableCell>
                  <ChipStatus status={horario?.status} />
                </TableCell>
              </TableRow>
              {/* Linha oculta - expande quando o usuário clica no ícone */}
              <TableRow key={`${horario.id}-${horario?.horarioAtendimento}-2`}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={openHiddenRow} timeout="auto" unmountOnExit>
                    <Box p="2rem">
                      <Button
                        variant="contained"
                        sx={{ marginRight: '0.5rem' }}
                        color="info"
                        onClick={() => {
                          setHorario({ ...horario });
                          setOpenProntuarioModal(true);
                        }}
                        disabled={horario?.status !== AgendamentoStatus.AGENDADO}
                      >
                        Prontuário
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ marginRight: '0.5rem' }}
                        color="success"
                        onClick={() => {
                          setHorario({ ...horario });
                          setOpenConcluirHorarioModal(true);
                        }}
                        disabled={horario?.status !== AgendamentoStatus.AGENDADO}
                      >
                        Concluir
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setHorario({ ...horario });
                          setOpenCancelarHorarioModal(true);
                        }}
                        disabled={horario?.status !== AgendamentoStatus.AGENDADO}
                      >
                        Cancelar
                      </Button>
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
      {/* Prontuário Modal */}
      <ActionModal
        open={openProntuarioModal}
        onClose={() => setOpenProntuarioModal(false)}
        onConfirm={() => {
          setOpenProntuarioModal(false);
          dispatch(updateHorarioProntuario({ horario }));
        }}
        label="Prontuário"
        data={horario}
        setData={setHorario}
        keyName="prontuario"
        confirmLabel="Editar"
      />
      {/* Concluir Horário Modal */}
      <ActionModal
        open={openConcluirHorarioModal}
        onClose={() => setOpenConcluirHorarioModal(false)}
        onConfirm={() => {
          setOpenConcluirHorarioModal(false);
          dispatch(
            updateHorarioStatus({ horario: { ...horario, status: AgendamentoStatus.CONCLUÍDO } })
          );
        }}
        label="Concluir a consulta?"
        data={horario}
        setData={setHorario}
        keyName="status"
        confirmLabel="Concluir"
        readOnly
        readOnlyText="Você deseja concluir a consulta? Uma vez concluída, não será possível editar o prontuário."
      />
      {/* Cencelar Horário Modal */}
      <ActionModal
        open={openCancelarHorarioModal}
        onClose={() => setOpenCancelarHorarioModal(false)}
        onConfirm={() => {
          setOpenCancelarHorarioModal(false);
          dispatch(
            updateHorarioStatus({ horario: { ...horario, status: AgendamentoStatus.CANCELADO } })
          );
        }}
        label="Cancelar a consulta?"
        data={horario}
        setData={setHorario}
        keyName="status"
        confirmLabel="Cancelar"
        readOnly
        readOnlyText="Você deseja cancelar a consulta? Uma vez cancelada, não será possível editar o prontuário."
        confirmColor="error"
      />
    </TableContainer>
  );
}
