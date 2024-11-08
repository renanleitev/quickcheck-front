import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { AgendamentoStatus } from '../../../../config/enums';
import UpdateAction from '../Actions/UpdateAction';

export default function EstabelecimentoTable() {
  const horarios = useSelector((state) => state?.horarios?.horarios) || [];

  const dispatch = useDispatch();

  const [horarioData, setHorarioData] = useState({ ...initialHorario });

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
                    onClick={() => {
                      if (rowId === horario?.id) {
                        setHorarioData({ ...initialHorario });
                        setRowId('');
                      } else {
                        setHorarioData({ ...horario });
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
                  <Collapse in={rowId === horario?.id} timeout="auto" unmountOnExit>
                    <Box p="2rem">
                      <UpdateAction
                        horario={horarioData}
                        setHorario={setHorarioData}
                        title="Prontuário"
                        onUpdate={updateHorarioProntuario({ horario: horarioData })}
                        buttonLabel="Prontuário"
                        confirmLabel="Editar"
                        readOnly={false}
                        disabled={horario?.status !== AgendamentoStatus.PENDENTE}
                        keyName="prontuario"
                      />
                      <UpdateAction
                        horario={horarioData}
                        setHorario={setHorarioData}
                        title="Confirmar a consulta?"
                        onUpdate={updateHorarioStatus({
                          horario: { ...horarioData, status: AgendamentoStatus.AGENDADO }
                        })}
                        confirmColor="secondary"
                        buttonLabel="Confirmar"
                        confirmLabel="Confirmar"
                        readOnlyText="Você deseja confirmar a consulta?"
                        disabled={horario?.status !== AgendamentoStatus.PENDENTE}
                        keyName="status"
                      />
                      <UpdateAction
                        horario={horarioData}
                        setHorario={setHorarioData}
                        title="Concluir a consulta?"
                        onUpdate={updateHorarioStatus({
                          horario: { ...horarioData, status: AgendamentoStatus.CONCLUÍDO }
                        })}
                        confirmColor="success"
                        buttonLabel="Concluir"
                        confirmLabel="Concluir"
                        readOnlyText="Você deseja concluir a consulta? Uma vez concluída, não será possível editar o prontuário."
                        disabled={horario?.status !== AgendamentoStatus.AGENDADO}
                        keyName="status"
                      />
                      <UpdateAction
                        horario={horarioData}
                        setHorario={setHorarioData}
                        title="Cancelar a consulta?"
                        onUpdate={updateHorarioStatus({
                          horario: { ...horarioData, status: AgendamentoStatus.CANCELADO }
                        })}
                        confirmColor="error"
                        buttonLabel="Cancelar"
                        confirmLabel="Cancelar"
                        readOnlyText="Você deseja cancelar a consulta? Uma vez cancelada, não será possível agendar ou concluir a consulta."
                        confirmActionColor="error"
                        disabled={
                          horario?.status === AgendamentoStatus.CANCELADO ||
                          horario?.status === AgendamentoStatus.CONCLUÍDO
                        }
                        keyName="status"
                      />
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
