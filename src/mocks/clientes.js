import { UserRoles } from '../config/enums';

export const clientes = [
  {
    nome: 'Fulano de Tal',
    cpf: 99999999999,
    idade: 27,
    nascimento: new Date().toISOString(),
    sexo: 'M',
    email: 'fulanodetal@email.com',
    senha: '123456',
    telefone: '(99) 9999-9999',
    endereco: 'Rua da Saudade, 999, Aflitos, Recife',
    comorbidades: 'Hipertensão',
    numeroCartaoSUS: '999-9999-9999',
    imagem: '',
    role: UserRoles.CLIENTE
  }
];
