import { medicos } from './funcionarios';
import { hospitais } from './estabelecimentos';

export const horarios = [
  {
    id: `0-${medicos[0].nome}`,
    horarioAtendimento: new Date().toISOString(),
    horarioAgendamento: new Date().toISOString(),
    status: 'DISPONIVEL',
    funcionario: medicos[0],
    estabelecimento: hospitais[0],
    descricao:
      'Lembramos aos pacientes que é recomendado chegar com 30 min de antecedência antes da consulta.'
  },
  {
    id: `1-${medicos[1].nome}`,
    horarioAtendimento: new Date().toISOString(),
    horarioAgendamento: new Date().toISOString(),
    status: 'DISPONIVEL',
    funcionario: medicos[1],
    estabelecimento: hospitais[0],
    descricao:
      'Lembramos aos pacientes que é recomendado chegar com 30 min de antecedência antes da consulta.'
  },
  {
    id: `2-${medicos[2].nome}`,
    horarioAtendimento: new Date().toISOString(),
    horarioAgendamento: new Date().toISOString(),
    status: 'DISPONIVEL',
    funcionario: medicos[2],
    estabelecimento: hospitais[0],
    descricao:
      'Lembramos aos pacientes que é recomendado chegar com 30 min de antecedência antes da consulta.'
  },
  {
    id: `3-${medicos[3].nome}`,
    horarioAtendimento: new Date().toISOString(),
    horarioAgendamento: new Date().toISOString(),
    status: 'DISPONIVEL',
    funcionario: medicos[3],
    estabelecimento: hospitais[0],
    descricao:
      'Lembramos aos pacientes que é recomendado chegar com 30 min de antecedência antes da consulta.'
  }
];
