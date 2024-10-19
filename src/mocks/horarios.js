import { medicos } from './funcionarios';
import { hospitais } from './estabelecimentos';

export const horarios = [
  {
    id: 0,
    horarioAtendimento: new Date().toISOString(),
    horarioAgendamento: new Date().toISOString(),
    status: 'DISPONIVEL',
    funcionario: medicos[0],
    estabelecimento: hospitais[0]
  },
  {
    id: 1,
    horarioAtendimento: new Date().toISOString(),
    horarioAgendamento: new Date().toISOString(),
    status: 'DISPONIVEL',
    funcionario: medicos[1],
    estabelecimento: hospitais[0]
  },
  {
    id: 2,
    horarioAtendimento: new Date().toISOString(),
    horarioAgendamento: new Date().toISOString(),
    status: 'DISPONIVEL',
    funcionario: medicos[2],
    estabelecimento: hospitais[0]
  }
];
