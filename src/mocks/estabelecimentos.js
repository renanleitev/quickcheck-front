// http://tabnet.datasus.gov.br/cgi/cnes/tipo_estabelecimento.htm
export const estabelecimentosOptions = [
  {
    value: 'Hospital Geral',
    label: 'Hospital Geral',
    descricao:
      'Hospital destinado à prestação de atendimento nas especialidades básicas, por especialistas e/ou outras especialidades médicas. Pode dispor de serviço de Urgência/Emergência. Deve dispor também de SADT de média complexidade. Podendo Ter ou não SIPAC.'
  },
  {
    value: 'Hospital Especializado',
    label: 'Hospital Especializado',
    descricao:
      'Hospital destinado à prestação de assistência à saúde em uma única especialidade/área. Pode dispor de serviço de Urgência/Emergência e SADT. Podendo Ter ou não SIPAC. Geralmente de referência regional, macro regional ou estadual.'
  },
  {
    value: 'Consultório',
    label: 'Consultório',
    descricao:
      'Local destinado à prestação de assistência médica ou odontológica ou de outros profissionais de saúde de nível superior.'
  },
  {
    value: 'Posto de Saúde',
    label: 'Posto de Saúde',
    descricao:
      'Unidade destinada à prestação de assistência a uma determinada população, de forma programada ou não, por profissional de nível médio, com a presença intermitente ou não do profissional médico.'
  },
  {
    value: 'Centro de Saúde/Unidade Básica de Saúde',
    label: 'Centro de Saúde/Unidade Básica de Saúde',
    descricao:
      'Unidade para realização de atendimentos de atenção básica e integral a uma população, de forma programada ou não, nas especialidades básicas, podendo oferecer assistência odontológica e de outros profissionais de nível superior. A assistência deve ser permanente e prestada por médico generalista ou especialista nestas áreas. Podendo ou não oferecer: SADT e Pronto atendimento 24 Horas.'
  },
  {
    value: 'Policlínica',
    label: 'Policlínica',
    descricao:
      'Unidade de saúde para prestação de atendimento ambulatorial em várias especialidades, incluindo ou não as especialidades básicas, podendo ainda ofertar outras especialidades não médicas. Podendo ou não oferecer: SADT e Pronto atendimento 24 Horas.'
  },
  {
    value: 'Unidade Mista',
    label: 'Unidade Mista',
    descricao:
      'Unidade de saúde básica destinada à prestação de atendimento em atenção básica e integral à saúde, de forma programada ou não, nas especialidades básicas, podendo oferecer assistência odontológica e de outros profissionais, com unidade de internação, sob administração única. A assistência médica deve ser permanente e prestada por médico especialista ou generalista. Pode dispor de urgência/emergência e SADT básico ou de rotina. Geralmente nível hierárquico 5.'
  },
  {
    value: 'Pronto Socorro Geral',
    label: 'Pronto Socorro Geral',
    descricao:
      'Unidade destinada à prestação de assistência a pacientes com ou sem risco de vida, cujos agravos necessitam de atendimento imediato. Podendo ter ou não internação.'
  },
  {
    value: 'Pronto Socorro Especializado',
    label: 'Pronto Socorro Especializado',
    descricao:
      'Unidade destinada à prestação de assistência em uma ou mais especialidades, a pacientes com ou sem risco de vida, cujos agravos necessitam de atendimento imediato.'
  },
  {
    value: 'Unidade Móvel Fluvial',
    label: 'Unidade Móvel Fluvial',
    descricao:
      'Barco/navio equipado como unidade de saúde, contendo no mínimo um consultório médico e uma sala de curativos, podendo ter consultório odontológico.'
  },
  {
    value: 'Clínica Especializada/Amb. Especializado',
    label: 'Clínica Especializada/Amb. Especializado',
    descricao:
      'Clínica Especializada destinada à assistência ambulatorial em apenas uma especialidade/área da assistência. (Centro Psicossocial/Reabilitação etc..)'
  },
  {
    value: 'Unidade de Serviço de Apoio de Diagnose e Terapia',
    label: 'Unidade de Serviço de Apoio de Diagnose e Terapia',
    descricao:
      'Unidades isoladas onde são realizadas atividades que auxiliam a determinação de diagnóstico e/ou complementam o tratamento e a reabilitação do paciente.'
  },
  {
    value: 'Farmácia',
    label: 'Farmácia',
    descricao:
      'Estabelecimento de saúde isolado em que é feita a dispensação de medicamentos básicos/essenciais (Programa Farmácia Popular) ou medicamentos excepcionais / alto custo previstos na Política Nacional de Assistência Farmacêutica.'
  },
  {
    value: 'Unidade de Vigilância em Saúde',
    label: 'Unidade de Vigilância em Saúde',
    descricao:
      'É o estabelecimento isolado que realiza trabalho de campo a partir de casos notificados e seus contatos, tendo como objetivos: identificar fontes e modo de transmissão; grupos expostos a maior risco; fatores determinantes; confirmar o diagnóstico e determinar as principais características epidemiológicas, orientando medidas de prevenção e controle a fim de impedir a ocorrência de novos eventos e/ou o estabelecimento de saúde isolado responsável pela execução de um conjunto de ações, capaz de eliminar, diminuir ou prevenir riscos à saúde capaz de eliminar, diminuir ou prevenir riscos à saúde e de intervir nos problemas sanitários decorrentes do meio ambiente, da produção e circulação de bens e da prestação de serviços de interesse da saúde.'
  },
  {
    value: 'Cooperativa',
    label: 'Cooperativa',
    descricao:
      'Unidade administrativa que disponibiliza seus profissionais cooperados para prestarem atendimento em estabelecimento de saúde.'
  },
  {
    value: 'Centro de Parto Normal Isolado',
    label: 'Centro de Parto Normal Isolado',
    descricao:
      'Unidade intra-hospitalar ou isolada, especializada no atendimento da mulher no período gravídico puerperal, conforme especificações da PT/MS 985/99.'
  },
  {
    value: 'Hospital /Dia- Isolado',
    label: 'Hospital /Dia- Isolado',
    descricao:
      'Unidades especializadas no atendimento de curta duração com caráter intermediário entre a assistência ambulatorial e a internação.'
  },
  {
    value: 'Central de Regulação de Serviços de Saúde',
    label: 'Central de Regulação de Serviços de Saúde',
    descricao:
      'É a unidade responsável pela avaliação, processamento e agendamento das solicitações de atendimento, garantindo o acesso dos usuários do SUS, mediante um planejamento de referência e contra-referência.'
  },
  {
    value: 'Laboratório Central de Saúde Pública - LACEN',
    label: 'Laboratório Central de Saúde Pública - LACEN',
    descricao:
      'Estabelecimento de Saúde que integra o Sistema Nacional de Laboratórios de Saúde Pública - SISLAB, em conformidade com normalização vigente.'
  },
  {
    value: 'Secretaria de Saúde',
    label: 'Secretaria de Saúde',
    descricao:
      'Unidade gerencial/administrativa e/ ou que dispõe de serviços de saúde, como vigilância em Saúde (Vigilância epidemiológica e ambiental; vigilância sanitária), Regulação de Serviços de Saúde.'
  }
];
