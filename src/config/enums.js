// https://mui.com/material-ui/react-text-field/#select
export const especialidadesOptions = [
  { value: 'Cardiologia', label: 'Cardiologia' },
  { value: 'Pediatria', label: 'Pediatria' },
  { value: 'Neurologia', label: 'Neurologia' },
  { value: 'Endocrinologia', label: 'Endocrinologia' }
];

export const UserRoles = {
  CLIENTE: 'cliente',
  FUNCIONARIO: 'funcionario',
  ESTABELECIMENTO: 'estabelecimento'
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

export const comorbidadesOptions = [
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hipertensao', label: 'Hipertensão' },
  { value: 'obesidade', label: 'Obesidade' }
];

export const defaultList = ['Login', 'Cadastro', 'Ajuda', 'Sobre'];

export const clienteList = [
  'Minhas consultas',
  'Histórico de consultas',
  'Meu Perfil',
  'Ajuda',
  'Sobre',
  'Logout'
];

// Marco Zero Recife
export const defaultCoords = [-8.062255486215344, -34.871117742328956];

// Zoom padrão do mapa
export const zoomLevel = 17;
