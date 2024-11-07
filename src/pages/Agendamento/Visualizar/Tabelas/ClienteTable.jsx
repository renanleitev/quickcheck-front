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
import formatDate from '../../../../hooks/formatDate';
import ChipStatus from '../../../../components/Chip/ChipStatus';
import {
  getHorarios,
  initialHorario,
  updateHorarioStatus
} from '../../../../store/modules/horarios/reducer';
import ActionModal from '../../../../components/Modal/ActionModal';
import { AgendamentoStatus } from '../../../../config/enums';

export default function ClienteTable() {
  const horarios = useSelector((state) => state?.horarios?.horarios) || [];

  const dispatch = useDispatch();

  const [horario, setHorario] = useState({ ...initialHorario });

  // Abrir o modal oculto (Remarcar Horário)
  const [openRemarcarHorarioModal, setOpenRemarcarHorarioModal] = useState(false);

  // Abrir o modal oculto (Cancelar Horário)
  const [openCancelarHorarioModal, setOpenCancelarHorarioModal] = useState(false);

  // Expandir a linha oculta quando o id da linha for igual ao horário selecionado
  const [rowId, setRowId] = useState('');

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
  // TODO: Obter os horários de acordo com cada cliente
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
          {horarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((horario) => (
            <>
              {/* Linha padrão - sempre visível */}
              <TableRow
                key={horario?.horarioAtedimento}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* Ícone para expandir a linha oculta */}
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      if (rowId === horario?.id) {
                        setHorario({ ...initialHorario });
                        setRowId('');
                      } else {
                        setHorario({ ...horario });
                        setRowId(horario?.id);
                      }
                    }}
                  >
                    {rowId === horario?.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                {/* Informações relevantes */}
                <TableCell component="th" scope="row">
                  {formatDate(horario?.horarioAtendimento)}
                </TableCell>
                <TableCell>{horario?.funcionario?.usuario?.nome}</TableCell>
                <TableCell>{horario?.funcionario?.especialidade}</TableCell>
                <TableCell>{horario?.estabelecimento?.usuario?.nome}</TableCell>
                <TableCell>{horario.estabelecimento?.usuario?.telefone}</TableCell>
                <TableCell>{horario.estabelecimento?.usuario?.endereco}</TableCell>
                <TableCell>
                  <ChipStatus status={horario?.status} />
                </TableCell>
              </TableRow>
              {/* Linha oculta - expande quando o usuário clica no ícone */}
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={rowId === horario?.id} timeout="auto" unmountOnExit>
                    <Box p="2rem">
                      <Button
                        variant="contained"
                        sx={{ marginRight: '0.5rem' }}
                        onClick={() => setOpenRemarcarHorarioModal(true)}
                        disabled={horario?.status !== AgendamentoStatus.AGENDADO}
                      >
                        Remarcar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ marginRight: '0.5rem' }}
                        onClick={() => setOpenCancelarHorarioModal(true)}
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
      {/* Remarcar Horário Modal */}
      <ActionModal
        open={openRemarcarHorarioModal}
        onClose={() => setOpenRemarcarHorarioModal(false)}
        onConfirm={() => {
          setOpenRemarcarHorarioModal(false);
          dispatch(
            updateHorarioStatus({ horario: { ...horario, status: AgendamentoStatus.PENDENTE } })
          );
        }}
        label="Remarcar a consulta?"
        data={horario}
        setData={setHorario}
        keyName="status"
        confirmLabel="Remarcar"
        readOnly
        readOnlyText="Você deseja remarcar a consulta? O médico precisará confirmar o novo horário."
      />
      {/* Cencelar Horário Modal */}
      <ActionModal
        open={openCancelarHorarioModal}
        onClose={() => setOpenCancelarHorarioModal(false)}
        onConfirm={() => {
          setOpenCancelarHorarioModal(false);
          dispatch(
            updateHorarioStatus({ horario: { ...horario, status: AgendamentoStatus.DISPONÍVEL } })
          );
        }}
        label="Cancelar a consulta?"
        data={horario}
        setData={setHorario}
        keyName="status"
        confirmLabel="Cancelar"
        readOnly
        readOnlyText="Você deseja cancelar a consulta? Uma vez cancelada, será necessário marcar novamente a consulta."
        confirmColor="error"
      />
    </TableContainer>
  );
}
