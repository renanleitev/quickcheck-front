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
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

import ChipStatus from '../../../../components/Chip/ChipStatus';
import formatDate from '../../../../hooks/formatDate';
import {
  getHorariosByEstabelecimentoAndStatus,
  initialHorario
} from '../../../../store/modules/horarios/reducer';
import ProntuarioAction from '../Actions/ProntuarioAction';
import ConfirmarAction from '../Actions/ConfirmarAction';
import ConcluirAction from '../Actions/ConcluirAction';
import CancelarAction from '../Actions/CancelarAction';
import CadastrarAction from '../Actions/CadastrarAction';
import EditarAction from '../Actions/EditarAction';
import EstabelecimentoFilter from '../Filters/EstabelecimentoFilter';

export default function EstabelecimentoTable() {
  const estabelecimento = useSelector((state) => state?.usuarios?.entidade) || undefined;

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

  const initialSearchData = {
    estabelecimentoId: estabelecimento?.id,
    status: '',
    especialidade: '',
    nomeFuncionario: ''
  };

  const [searchData, setSearchData] = useState(initialSearchData);

  // Obtendo os horários
  useEffect(() => {
    dispatch(getHorariosByEstabelecimentoAndStatus(searchData));
  }, []);

  return (
    <>
      <Box sx={{ alignSelf: 'flex-start' }}>
        <CadastrarAction />
        <EstabelecimentoFilter
          data={searchData}
          setData={setSearchData}
          initialData={initialSearchData}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Cabeçalho */}
          <TableHead>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              {/* Espaço reservado para o ícone de expandir a linha oculta */}
              <TableCell>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </TableCell>
              <TableCell sx={{ minWidth: columnWidth }}>Atendimento</TableCell>
              <TableCell sx={{ minWidth: columnWidth }}>Agendamento</TableCell>
              <TableCell sx={{ minWidth: columnWidth }}>Paciente</TableCell>
              <TableCell sx={{ minWidth: columnWidth }}>Comorbidades</TableCell>
              <TableCell sx={{ minWidth: columnWidth }}>Médico</TableCell>
              <TableCell sx={{ minWidth: columnWidth }}>Especialidade</TableCell>
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
                    {horario?.horarioAtendimento ? (
                      formatDate(horario?.horarioAtendimento)
                    ) : (
                      <DoNotDisturbAltIcon />
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {horario?.horarioAgendamento ? (
                      formatDate(horario?.horarioAgendamento)
                    ) : (
                      <DoNotDisturbAltIcon />
                    )}
                  </TableCell>
                  <TableCell>
                    {horario?.cliente?.usuario?.nome ?? <DoNotDisturbAltIcon />}
                  </TableCell>
                  {/* Comorbidades é um array */}
                  <TableCell>
                    {horario?.cliente?.comorbidades.join(', ') ?? <DoNotDisturbAltIcon />}
                  </TableCell>
                  <TableCell>
                    {horario?.funcionario?.usuario?.nome ?? <DoNotDisturbAltIcon />}
                  </TableCell>
                  <TableCell>
                    {horario?.funcionario?.especialidade ?? <DoNotDisturbAltIcon />}
                  </TableCell>
                  <TableCell>
                    <ChipStatus status={horario?.status} />
                  </TableCell>
                </TableRow>
                {/* Linha oculta - expande quando o usuário clica no ícone */}
                <TableRow key={`${horario.id}-${horario?.horarioAtendimento}-2`}>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={rowId === horario?.id} timeout="auto" unmountOnExit>
                      <Box p="2rem">
                        <EditarAction horario={horarioData} />
                        <ProntuarioAction
                          horario={horarioData}
                          setHorario={setHorarioData}
                          status={horario?.status}
                        />
                        <ConfirmarAction
                          horario={horarioData}
                          setHorario={setHorarioData}
                          status={horario?.status}
                        />
                        <ConcluirAction
                          horario={{ ...horarioData }}
                          setHorario={setHorarioData}
                          status={horario?.status}
                        />
                        <CancelarAction
                          horario={horarioData}
                          setHorario={setHorarioData}
                          status={horario?.status}
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
    </>
  );
}
