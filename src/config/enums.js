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
  { value: UserRoles.ESTABELECIMENTO, label: userLabels[UserRoles.ESTABELECIMENTO] },
];

export const sexoOptions = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Feminino' },
];

export const comorbidadesOptions = [
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hipertensao', label: 'Hipertensão' },
  { value: 'obesidade', label: 'Obesidade' }
];