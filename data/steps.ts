import { Step } from '../types';

export const STEPS: Step[] = [
  // --- MESTRADO ---
  {
    id: 'm-01',
    mode: 'mestrado',
    order: 1,
    title: 'Planejar Prazo e Calendário',
    short: 'Planejamento',
    description: 'O início da jornada exige organização. Defina seu cronograma macro considerando os 24 meses típicos do mestrado.',
    whatToDo: [
      'Ler o Regimento do Programa.',
      'Conversar com o orientador sobre expectativas.',
      'Criar um cronograma reverso a partir da data limite.',
    ],
    inputs: ['Calendário Acadêmico', 'Regimento Interno'],
    prerequisites: ['Matrícula inicial'],
    deadlines: ['Mês 1'],
    checklist: [
      { id: 'm-01-c1', text: 'Li o regimento interno' },
      { id: 'm-01-c2', text: 'Reunião inicial com orientador realizada' },
      { id: 'm-01-c3', text: 'Cronograma preliminar montado' }
    ]
  },
  {
    id: 'm-02',
    mode: 'mestrado',
    order: 2,
    title: 'Manter Matrícula Ativa',
    short: 'Matrícula',
    description: 'A cada semestre é necessário renovar o vínculo com a instituição, matriculando-se em disciplinas ou em "Elaboração de Dissertação".',
    whatToDo: [
      'Ficar atento às datas do calendário acadêmico.',
      'Realizar matrícula online no sistema.',
      'Confirmar com a secretaria se está tudo certo.'
    ],
    inputs: ['Login no sistema acadêmico'],
    prerequisites: ['Semestre anterior regular'],
    deadlines: ['Semestralmente'],
    checklist: [
      { id: 'm-02-c1', text: 'Matrícula Semestre 1' },
      { id: 'm-02-c2', text: 'Matrícula Semestre 2' },
      { id: 'm-02-c3', text: 'Matrícula Semestre 3' },
      { id: 'm-02-c4', text: 'Matrícula Semestre 4' }
    ]
  },
  {
    id: 'm-03',
    mode: 'mestrado',
    order: 3,
    title: 'Formalizar Plano de Estudo',
    short: 'Plano de Estudo',
    description: 'Documento que define quais disciplinas serão cursadas e o tema provisório da pesquisa.',
    whatToDo: [
      'Selecionar disciplinas obrigatórias e eletivas.',
      'Assinar formulário junto com o orientador.',
      'Entregar na secretaria do programa.'
    ],
    inputs: ['Formulário de Plano de Estudo'],
    prerequisites: ['Definição do tema'],
    deadlines: ['Até o final do 1º Trimestre'],
    checklist: [
      { id: 'm-03-c1', text: 'Disciplinas definidas' },
      { id: 'm-03-c2', text: 'Documento assinado e entregue' }
    ]
  },
  {
    id: 'm-04',
    mode: 'mestrado',
    order: 4,
    title: 'Integralizar Créditos',
    short: 'Créditos',
    description: 'Cumprimento da carga horária mínima em disciplinas exigida pelo programa para depositar a dissertação.',
    whatToDo: [
      'Cursar disciplinas obrigatórias.',
      'Cursar disciplinas eletivas suficientes.',
      'Manter CR (Coeficiente de Rendimento) acima do mínimo.'
    ],
    inputs: ['Frequência nas aulas', 'Trabalhos finais'],
    prerequisites: ['Matrícula em disciplinas'],
    deadlines: ['Até o Mês 12 ou 18'],
    checklist: [
      { id: 'm-04-c1', text: 'Créditos obrigatórios concluídos' },
      { id: 'm-04-c2', text: 'Créditos eletivos concluídos' }
    ]
  },
  {
    id: 'm-05',
    mode: 'mestrado',
    order: 5,
    title: 'Exigência de Língua (Inglês)',
    short: 'Proficiência',
    description: 'Comprovação de leitura e compreensão em língua inglesa.',
    whatToDo: [
      'Realizar prova de proficiência interna ou apresentar certificado externo (TOEFL, IELTS, etc.).',
      'Solicitar aproveitamento na secretaria.'
    ],
    inputs: ['Certificado de proficiência'],
    prerequisites: ['Nenhum'],
    deadlines: ['Até o Mês 12'],
    checklist: [
      { id: 'm-05-c1', text: 'Exame realizado/Certificado obtido' },
      { id: 'm-05-c2', text: 'Protocolado na secretaria' }
    ]
  },
  {
    id: 'm-06',
    mode: 'mestrado',
    order: 6,
    title: 'Projeto e Ética',
    short: 'Comitê de Ética',
    description: 'Se sua pesquisa envolve seres humanos ou animais, é obrigatória a aprovação no comitê de ética.',
    whatToDo: [
      'Submeter projeto na Plataforma Brasil (humanos) ou CEUA (animais).',
      'Aguardar parecer e responder pendências.'
    ],
    inputs: ['Projeto de pesquisa detalhado', 'TCLE'],
    prerequisites: ['Projeto definido'],
    deadlines: ['Antes da coleta de dados'],
    checklist: [
      { id: 'm-06-c1', text: 'Submissão realizada' },
      { id: 'm-06-c2', text: 'Aprovação obtida' }
    ]
  },
  {
    id: 'm-07',
    mode: 'mestrado',
    order: 7,
    title: 'Marco Intermediário / Qualificação',
    short: 'Qualificação',
    description: 'Momento de apresentar o andamento da pesquisa para uma banca. Verifique se seu programa exige qualificação formal no Mestrado.',
    whatToDo: [
      'Escrever relatório de qualificação.',
      'Definir banca com orientador.',
      'Agendar data e reservar sala.'
    ],
    inputs: ['Texto preliminar da dissertação'],
    prerequisites: ['Créditos (geralmente)', 'Projeto aprovado'],
    deadlines: ['Mês 12 a 18'],
    checklist: [
      { id: 'm-07-c1', text: 'Texto enviado para banca' },
      { id: 'm-07-c2', text: 'Apresentação realizada' }
    ]
  },
  {
    id: 'm-08',
    mode: 'mestrado',
    order: 8,
    title: 'Solicitar Defesa',
    short: 'Solicitar Defesa',
    description: 'Procedimentos burocráticos para marcar a defesa final da dissertação.',
    whatToDo: [
      'Orientador deve dar o "de acordo" na versão final.',
      'Convite formal aos membros da banca.',
      'Envio do exemplar para a banca.'
    ],
    inputs: ['Dissertação completa', 'Formulário de solicitação de defesa'],
    prerequisites: ['Qualificação', 'Créditos', 'Proficiência'],
    deadlines: ['30 a 60 dias antes do prazo final'],
    checklist: [
      { id: 'm-08-c1', text: 'Banca confirmada' },
      { id: 'm-08-c2', text: 'Documentação entregue na secretaria' }
    ]
  },
  {
    id: 'm-09',
    mode: 'mestrado',
    order: 9,
    title: 'Pós-Defesa e Diploma',
    short: 'Finalização',
    description: 'Após a defesa, ainda há passos cruciais para obter o diploma.',
    whatToDo: [
      'Realizar correções sugeridas pela banca.',
      'Entregar versão final para repositório institucional.',
      'Solicitar expedição de diploma.'
    ],
    inputs: ['Versão final em PDF', 'Ata de defesa assinada'],
    prerequisites: ['Aprovação na defesa'],
    deadlines: ['Até 60 dias após a defesa'],
    checklist: [
      { id: 'm-09-c1', text: 'Correções efetuadas' },
      { id: 'm-09-c2', text: 'Depósito legal realizado' },
      { id: 'm-09-c3', text: 'Diploma solicitado' }
    ]
  },

  // --- DOUTORADO ---
  {
    id: 'd-01',
    mode: 'doutorado',
    order: 1,
    title: 'Planejar Prazo e Calendário',
    short: 'Planejamento',
    description: 'O Doutorado é uma maratona de 48 meses. O planejamento inicial é vital para não se perder.',
    whatToDo: [
      'Alinhar cronograma de 4 anos com orientador.',
      'Identificar períodos de coleta de dados e sanduíche (exterior).'
    ],
    inputs: ['Regimento', 'Calendário'],
    prerequisites: ['Matrícula'],
    deadlines: ['Mês 1'],
    checklist: [
      { id: 'd-01-c1', text: 'Cronograma macro definido' }
    ]
  },
  {
    id: 'd-02',
    mode: 'doutorado',
    order: 2,
    title: 'Manter Matrícula Ativa',
    short: 'Matrícula',
    description: 'Renovação semestral obrigatória.',
    whatToDo: ['Realizar matrícula todo semestre.'],
    inputs: ['Sistema Acadêmico'],
    prerequisites: [],
    deadlines: ['Semestralmente (8 vezes)'],
    checklist: [
      { id: 'd-02-c1', text: 'Matrículas do 1º ano' },
      { id: 'd-02-c2', text: 'Matrículas do 2º ano' },
      { id: 'd-02-c3', text: 'Matrículas do 3º ano' },
      { id: 'd-02-c4', text: 'Matrículas do 4º ano' }
    ]
  },
  {
    id: 'd-03',
    mode: 'doutorado',
    order: 3,
    title: 'Formalizar Plano de Estudo',
    short: 'Plano',
    description: 'Definição da trajetória acadêmica e estrutura da tese.',
    whatToDo: ['Definir disciplinas.', 'Esboçar estrutura da tese.'],
    inputs: ['Formulário do PPG'],
    prerequisites: [],
    deadlines: ['Mês 3'],
    checklist: [{ id: 'd-03-c1', text: 'Plano entregue' }]
  },
  {
    id: 'd-04',
    mode: 'doutorado',
    order: 4,
    title: 'Integralizar Créditos',
    short: 'Créditos',
    description: 'Cursar disciplinas avançadas.',
    whatToDo: ['Concluir créditos obrigatórios e optativos.'],
    inputs: [],
    prerequisites: [],
    deadlines: ['Até Mês 24'],
    checklist: [{ id: 'd-04-c1', text: 'Todos os créditos cumpridos' }]
  },
  {
    id: 'd-05',
    mode: 'doutorado',
    order: 5,
    title: 'Proficiências: Inglês + Outra',
    short: 'Idiomas',
    description: 'Geralmente exigem-se duas línguas estrangeiras para o doutorado.',
    whatToDo: ['Comprovar Inglês.', 'Comprovar segunda língua (Espanhol, Francês, etc.).'],
    inputs: ['Certificados'],
    prerequisites: [],
    deadlines: ['Até Mês 24'],
    checklist: [
      { id: 'd-05-c1', text: 'Inglês aprovado' },
      { id: 'd-05-c2', text: 'Segunda língua aprovada' }
    ]
  },
  {
    id: 'd-06',
    mode: 'doutorado',
    order: 6,
    title: 'Projeto Aprovado e Ética',
    short: 'Ética',
    description: 'Aprovação do projeto detalhado e submissão aos comitês de ética pertinentes.',
    whatToDo: ['Submissão Plataforma Brasil/CEUA.'],
    inputs: ['Projeto', 'TCLE'],
    prerequisites: [],
    deadlines: ['Antes da coleta (Mês 12-18)'],
    checklist: [{ id: 'd-06-c1', text: 'Aprovação ética obtida' }]
  },
  {
    id: 'd-07',
    mode: 'doutorado',
    order: 7,
    title: 'Atividades Obrigatórias',
    short: 'Seminários',
    description: 'Participação em grupos de pesquisa, seminários de tese ou estágio docência.',
    whatToDo: ['Estágio docência (obrigatório para bolsistas).', 'Apresentar em seminários internos.'],
    inputs: ['Relatórios de atividades'],
    prerequisites: [],
    deadlines: ['Ao longo do curso'],
    checklist: [{ id: 'd-07-c1', text: 'Estágio docência cumprido' }]
  },
  {
    id: 'd-08',
    mode: 'doutorado',
    order: 8,
    title: 'Produção Científica Mínima',
    short: 'Publicações',
    description: 'Submissão e/ou aceite de artigos em periódicos qualificados (Qualis).',
    whatToDo: ['Escrever artigos parciais.', 'Submeter para revistas ou congressos.'],
    inputs: ['Manuscritos', 'Comprovantes de submissão/aceite'],
    prerequisites: ['Dados preliminares'],
    deadlines: ['Mês 30 a 40'],
    checklist: [
      { id: 'd-08-c1', text: 'Artigo 1 submetido/aceito' },
      { id: 'd-08-c2', text: 'Artigo 2 submetido/aceito' }
    ]
  },
  {
    id: 'd-09',
    mode: 'doutorado',
    order: 9,
    title: 'Solicitar Qualificação',
    short: 'Agendar Qualif.',
    description: 'Preparação para o exame de qualificação do doutorado.',
    whatToDo: ['Finalizar texto de qualificação.', 'Marcar banca.'],
    inputs: ['Relatório de Qualificação'],
    prerequisites: ['Créditos', 'Proficiência'],
    deadlines: ['Mês 24 a 30'],
    checklist: [{ id: 'd-09-c1', text: 'Banca agendada' }]
  },
  {
    id: 'd-10',
    mode: 'doutorado',
    order: 10,
    title: 'Exame de Qualificação',
    short: 'Qualificação',
    description: 'Defesa do projeto avançado e resultados preliminares.',
    whatToDo: ['Apresentar para a banca.', 'Receber feedback para a tese final.'],
    inputs: ['Apresentação PPT'],
    prerequisites: [],
    deadlines: ['Data marcada'],
    checklist: [{ id: 'd-10-c1', text: 'Aprovado na qualificação' }]
  },
  {
    id: 'd-11',
    mode: 'doutorado',
    order: 11,
    title: 'Solicitar Defesa de Tese',
    short: 'Solicitar Defesa',
    description: 'Envio da tese final para a banca avaliadora.',
    whatToDo: ['Revisão final do texto.', 'Envio para membros externos e internos.'],
    inputs: ['Tese completa'],
    prerequisites: ['Produção científica mínima', 'Qualificação'],
    deadlines: ['Mês 46'],
    checklist: [{ id: 'd-11-c1', text: 'Tese enviada' }]
  },
  {
    id: 'd-12',
    mode: 'doutorado',
    order: 12,
    title: 'Pós-Defesa e Diploma',
    short: 'Finalização',
    description: 'Ajustes finais pós-defesa e burocracia do diploma.',
    whatToDo: ['Ajustes finais.', 'Depósito legal.', 'Entregar "produto" se for doutorado profissional.'],
    inputs: ['Versão final'],
    prerequisites: ['Defesa Aprovada'],
    deadlines: ['Mês 48+'],
    checklist: [
      { id: 'd-12-c1', text: 'Depósito final realizado' },
      { id: 'd-12-c2', text: 'Diploma solicitado' }
    ]
  },
];
