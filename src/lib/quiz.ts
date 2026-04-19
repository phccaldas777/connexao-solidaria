export type QuestionType = "single" | "multi";

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options: { value: string; label: string }[];
}

export interface Step {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

export const STEPS: Step[] = [
  {
    id: "sensorial",
    title: "Ambiente sensorial",
    subtitle: "Como você se sente em relação ao ambiente físico de trabalho?",
    questions: [
      {
        id: "noise",
        label: "Qual seu nível de conforto com barulho no ambiente?",
        type: "single",
        options: [
          { value: "silence", label: "Preciso de silêncio total" },
          { value: "low", label: "Ruídos baixos são ok" },
          { value: "moderate", label: "Barulho moderado não me incomoda" },
          { value: "high", label: "Lido bem com ambientes barulhentos" },
        ],
      },
      {
        id: "light",
        label: "Como você prefere a iluminação?",
        type: "single",
        options: [
          { value: "natural", label: "Luz natural e suave" },
          { value: "indirect", label: "Luz controlada e indireta" },
          { value: "any", label: "Não tenho preferência forte" },
          { value: "bright", label: "Qualquer iluminação serve" },
        ],
      },
      {
        id: "space",
        label: "Que tipo de espaço de trabalho você prefere?",
        type: "single",
        options: [
          { value: "private", label: "Sala individual e fechada" },
          { value: "semi", label: "Espaço semi-privado com divisórias" },
          { value: "mixed", label: "Misto, com áreas abertas e fechadas" },
          { value: "open", label: "Espaço aberto e compartilhado" },
        ],
      },
    ],
  },
  {
    id: "comunicacao",
    title: "Comunicação",
    subtitle: "Como você prefere se comunicar no trabalho?",
    questions: [
      {
        id: "channel",
        label: "Qual forma de comunicação você prefere?",
        type: "single",
        options: [
          { value: "written", label: "Apenas por escrito (e-mail, chat)" },
          { value: "writtenmeet", label: "Escrito com reuniões ocasionais" },
          { value: "mixed", label: "Misto entre escrito e verbal" },
          { value: "verbal", label: "Principalmente verbal e presencial" },
        ],
      },
      {
        id: "instructions",
        label: "Como você prefere receber instruções?",
        type: "single",
        options: [
          { value: "detailed", label: "Escritas e bem detalhadas" },
          { value: "visual", label: "Com exemplos visuais" },
          { value: "verbalsum", label: "Explicação verbal com resumo escrito" },
          { value: "general", label: "Apenas direcionamento geral" },
        ],
      },
      {
        id: "feedback",
        label: "Como você prefere receber feedback?",
        type: "single",
        options: [
          { value: "writtentime", label: "Por escrito, com tempo para processar" },
          { value: "examples", label: "Com exemplos visuais" },
          { value: "direct", label: "De forma direta e objetiva" },
          { value: "casual", label: "Informal, no dia a dia" },
        ],
      },
    ],
  },
  {
    id: "rotina",
    title: "Rotina e estrutura",
    subtitle: "Como você prefere organizar seu trabalho?",
    questions: [
      {
        id: "schedule",
        label: "Qual tipo de horário funciona melhor para você?",
        type: "single",
        options: [
          { value: "fixed", label: "Horário fixo e previsível" },
          { value: "regular", label: "Horário regular com alguma flexibilidade" },
          { value: "flexdeliver", label: "Horário flexível com entregas definidas" },
          { value: "flex", label: "Totalmente flexível" },
        ],
      },
      {
        id: "changes",
        label: "Como você lida com mudanças inesperadas?",
        type: "single",
        options: [
          { value: "notice", label: "Preciso de aviso com antecedência" },
          { value: "small", label: "Mudanças pequenas são ok" },
          { value: "support", label: "Consigo me adaptar com suporte" },
          { value: "easy", label: "Lido bem com mudanças" },
        ],
      },
      {
        id: "breaks",
        label: "Como você prefere fazer pausas?",
        type: "single",
        options: [
          { value: "scheduled", label: "Pausas regulares e programadas" },
          { value: "needed", label: "Pausas quando necessário, sem rigidez" },
          { value: "few", label: "Poucas pausas longas" },
          { value: "none", label: "Prefiro trabalhar sem interrupções" },
        ],
      },
    ],
  },
  {
    id: "tarefas",
    title: "Tarefas",
    subtitle: "Que tipo de trabalho combina com você?",
    questions: [
      {
        id: "kind",
        label: "Que tipo de tarefa você prefere?",
        type: "multi",
        options: [
          { value: "manual", label: "Manuais e técnicas" },
          { value: "analytical", label: "Analíticas e lógicas" },
          { value: "creative", label: "Criativas e visuais" },
          { value: "organizational", label: "Organizacionais e administrativas" },
        ],
      },
      {
        id: "detail",
        label: "Qual nível de detalhe você prefere?",
        type: "single",
        options: [
          { value: "high", label: "Muito detalhe e precisão" },
          { value: "medium", label: "Equilíbrio entre detalhe e visão geral" },
          { value: "overview", label: "Foco no panorama geral" },
          { value: "varies", label: "Depende da tarefa" },
        ],
      },
      {
        id: "learning",
        label: "Como você prefere aprender algo novo?",
        type: "single",
        options: [
          { value: "reading", label: "Lendo materiais escritos" },
          { value: "watching", label: "Assistindo demonstrações" },
          { value: "doing", label: "Praticando passo a passo" },
          { value: "mentor", label: "Com apoio de uma pessoa mentora" },
        ],
      },
    ],
  },
  {
    id: "social",
    title: "Interação social",
    subtitle: "Como você se sente em relação ao convívio no trabalho?",
    questions: [
      {
        id: "team",
        label: "Você prefere trabalhar:",
        type: "single",
        options: [
          { value: "alone", label: "Sozinho(a), com foco total" },
          { value: "smallteam", label: "Em pequenos grupos" },
          { value: "team", label: "Em equipe colaborativa" },
          { value: "varies", label: "Depende do projeto" },
        ],
      },
      {
        id: "frequency",
        label: "Qual frequência de interação social funciona para você?",
        type: "single",
        options: [
          { value: "rare", label: "Pouca interação" },
          { value: "moderate", label: "Interação moderada e previsível" },
          { value: "regular", label: "Interação regular ao longo do dia" },
          { value: "constant", label: "Contato constante" },
        ],
      },
      {
        id: "public",
        label: "Como você se sente com contato com público?",
        type: "single",
        options: [
          { value: "no", label: "Prefiro evitar" },
          { value: "minimal", label: "Pouco contato, situações claras" },
          { value: "ok", label: "Me sinto confortável" },
          { value: "love", label: "Gosto muito de atender pessoas" },
        ],
      },
    ],
  },
];

// Compute compatibility scores per professional area based on answers.
export interface AreaScore {
  name: string;
  score: number;
  description: string;
}

export function computeResults(answers: Record<string, string | string[]>) {
  const a = (id: string) => answers[id];
  const has = (id: string, v: string) => {
    const x = a(id);
    return Array.isArray(x) ? x.includes(v) : x === v;
  };

  // Helper to clamp 30..98
  const clamp = (n: number) => Math.max(30, Math.min(98, Math.round(n)));

  const sensorialCalm =
    (has("noise", "silence") ? 25 : has("noise", "low") ? 18 : 8) +
    (has("light", "natural") || has("light", "indirect") ? 18 : 8) +
    (has("space", "private") ? 22 : has("space", "semi") ? 14 : 6);

  const writtenPref =
    (has("channel", "written") ? 22 : has("channel", "writtenmeet") ? 16 : 8) +
    (has("instructions", "detailed") ? 18 : 12) +
    (has("feedback", "writtentime") ? 16 : 10);

  const structurePref =
    (has("schedule", "fixed") ? 22 : has("schedule", "regular") ? 16 : 8) +
    (has("changes", "notice") ? 20 : has("changes", "small") ? 14 : 8) +
    (has("breaks", "scheduled") ? 14 : 10);

  const detailPref =
    (has("detail", "high") ? 22 : has("detail", "medium") ? 14 : 8);

  const solo =
    (has("team", "alone") ? 22 : has("team", "smallteam") ? 14 : 6) +
    (has("frequency", "rare") ? 18 : has("frequency", "moderate") ? 12 : 4) +
    (has("public", "no") ? 14 : has("public", "minimal") ? 10 : 2);

  const social =
    (has("team", "team") ? 22 : has("team", "smallteam") ? 14 : 4) +
    (has("public", "love") ? 20 : has("public", "ok") ? 14 : 4);

  const areas: AreaScore[] = [
    {
      name: "Tecnologia",
      score: clamp(40 + sensorialCalm * 0.5 + writtenPref * 0.7 + (has("kind", "analytical") ? 15 : 0) + detailPref * 0.4),
      description: "Desenvolvimento, dados e infraestrutura — ambientes geralmente calmos e estruturados.",
    },
    {
      name: "Ciência e Pesquisa",
      score: clamp(35 + structurePref * 0.6 + detailPref * 0.6 + (has("learning", "reading") ? 15 : 0) + solo * 0.4),
      description: "Investigação, análise e método — ideal para foco profundo e atenção a detalhes.",
    },
    {
      name: "Administração",
      score: clamp(35 + structurePref * 0.7 + (has("kind", "organizational") ? 18 : 0) + writtenPref * 0.4),
      description: "Organização, processos e rotinas previsíveis com entregas claras.",
    },
    {
      name: "Design",
      score: clamp(30 + (has("kind", "creative") ? 22 : 0) + (has("instructions", "visual") ? 14 : 0) + sensorialCalm * 0.3),
      description: "Trabalho visual e criativo, com referências claras e espaço para concentração.",
    },
    {
      name: "Escrita e Conteúdo",
      score: clamp(35 + writtenPref * 0.8 + (has("learning", "reading") ? 14 : 0) + solo * 0.3),
      description: "Produção de textos, edição e curadoria — comunicação no seu ritmo.",
    },
    {
      name: "Trabalho manual e técnico",
      score: clamp(35 + (has("kind", "manual") ? 22 : 0) + structurePref * 0.4 + detailPref * 0.4),
      description: "Atividades práticas, manuais ou técnicas, com etapas bem definidas.",
    },
    {
      name: "Atendimento e Pessoas",
      score: clamp(20 + social * 0.9 + (has("kind", "organizational") ? 6 : 0)),
      description: "Áreas com contato humano frequente — melhor para quem gosta de interagir.",
    },
  ];

  areas.sort((x, y) => y.score - x.score);

  // Radar profile (5 axes that match the questionnaire steps)
  const radar = [
    { axis: "Sensorial", value: clamp(sensorialCalm * 1.4) },
    { axis: "Comunicação", value: clamp(writtenPref * 1.4) },
    { axis: "Rotina", value: clamp(structurePref * 1.4) },
    { axis: "Tarefas", value: clamp(40 + detailPref * 1.5 + (has("kind", "analytical") || has("kind", "creative") ? 15 : 5)) },
    { axis: "Social", value: clamp(20 + social * 1.6) },
  ];

  return { areas, radar };
}
