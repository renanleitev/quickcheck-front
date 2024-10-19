export const coordsHospitais = [
  // Hospital Portugues
  {
    latitude: -8.063981765052402,
    longitude: -34.89815835626033
  },
  // HOPE - Hospital dos Olhos de Pernambuco
  {
    latitude: -8.065849305122473,
    longitude: -34.89585686840582
  }
];

export const hospitais = [
  {
    id: `0-Hospital Português`,
    nome: 'Hospital Português',
    endereco: 'Av. Gov. Agamenon Magalhães, 4760 - Paissandu, Recife - PE, 52010-075',
    horarioFuncionamento: `Horário de funcionamento: Aberto 24 horas
      \n Pronto-socorro: Aberto 24 horas
      \n Telefone: (81) 3416-1122`,
    imagem:
      'https://s2-g1.glbimg.com/Z4ta-OLtQdwXmNj0ewegM0ez5us=/0x0:1302x781/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/0/q/TKMJ6pQwKWRL8YtSlUYg/hospital-portugues-recife.jpg',
    latitude: coordsHospitais[0].latitude,
    longitude: coordsHospitais[0].longitude
  },
  {
    id: `1-Hospital dos Olhos de Pernambuco`,
    nome: 'Hospital dos Olhos de Pernambuco',
    endereco: 'R. Francisco Alves, 887 - Ilha do Leite, Recife - PE, 50030-230',
    horarioFuncionamento: `Horário de funcionamento: Aberto 24 horas
      \n Pronto-socorro: Aberto 24 horas
      \n Telefone: (81) 3302-2121`,
    imagem: 'https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2024/06/maysa-1100x600-42_1.jpg',
    latitude: coordsHospitais[1].latitude,
    longitude: coordsHospitais[1].longitude
  }
];
