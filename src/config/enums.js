import { comorbidades } from '../mocks/comorbidades';
import { especialidades } from '../mocks/especialidades';

// https://mui.com/material-ui/react-text-field/#select
export const especialidadesOptions = especialidades.map((especialidade) => {
  return { value: especialidade, label: especialidade };
});

export const AgendamentoStatus = {
  DISPONÍVEL: 'DISPONÍVEL',
  AGENDADO: 'AGENDADO',
  CONCLUÍDO: 'CONCLUÍDO',
  CANCELADO: 'CANCELADO',
  PENDENTE: 'PENDENTE'
};

export const agendamentoStatusOptions = [
  { value: AgendamentoStatus.AGENDADO, label: 'Agendado' },
  { value: AgendamentoStatus.DISPONÍVEL, label: 'Disponivel' },
  { value: AgendamentoStatus.CANCELADO, label: 'Cancelado' },
  { value: AgendamentoStatus.CONCLUÍDO, label: 'Concluído' },
  { value: AgendamentoStatus.PENDENTE, label: 'Pendente' }
];

export const UserRoles = {
  CLIENTE: 'CLIENTE',
  FUNCIONARIO: 'FUNCIONARIO',
  ESTABELECIMENTO: 'ESTABELECIMENTO'
};

export const userLabels = {
  [UserRoles.CLIENTE]: 'Paciente',
  [UserRoles.FUNCIONARIO]: 'Médico',
  [UserRoles.ESTABELECIMENTO]: 'Hospital/Clínica'
};

export const roleOptions = [
  { value: UserRoles.CLIENTE, label: userLabels[UserRoles.CLIENTE] },
  { value: UserRoles.FUNCIONARIO, label: userLabels[UserRoles.FUNCIONARIO] },
  { value: UserRoles.ESTABELECIMENTO, label: userLabels[UserRoles.ESTABELECIMENTO] }
];

export const sexoOptions = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Feminino' }
];

export const comorbidadesOptions = comorbidades.map((comorbidade) => {
  return { value: comorbidade, label: comorbidade };
});

// Marco Zero Recife
export const defaultCoords = [-8.062255486215344, -34.871117742328956];

// Zoom padrão do mapa
export const zoomLevel = 17;

// Zoom out
export const zoomOutLevel = 14;
