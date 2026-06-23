/**
 * @file types.ts
 * @description Definições de tipos e interfaces TypeScript para o ecossistema do Empaletado.
 * Define a estrutura das paletas de cores, respostas do quiz de marca e recomendações cromáticas.
 */

/**
 * Representa os papéis sugeridos de aplicação de cores em uma interface ou identidade visual.
 */
export interface ColorUsage {
  primary: string;    // Código HEX para a cor primária / fundo principal
  secondary: string;  // Código HEX para a cor secundária / elementos de suporte
  accent: string;     // Código HEX para destaque / botões de ação (CTA)
  background: string; // Código HEX para superfícies, cartões ou fundos alternativos
}

/**
 * Estrutura principal de uma Paleta de Cores curada.
 */
export interface Palette {
  id: string;         // Identificador exclusivo da paleta
  name: string;       // Nome descritivo e inspirador (ex: "Tech Indigo Active")
  style: 'moderna' | 'elegante' | 'vibrante' | 'minimalista'; // Estilo de design predominante
  emotions: string[]; // Sentimentos que a paleta evoca (ex: ['confiança', 'inovação'])
  segments: string[]; // Setores mercadológicos ideais (ex: ['tech', 'creative'])
  colors: string[];   // Lista de códigos HEX ordinais contendo as cores da paleta
  colorNames?: string[]; // Nomes poéticos correspondentes a cada cor individualmente
  usage: ColorUsage;  // Regras de distribuição de uso recomendadas para simulações
  description: string; // Parágrafo descritivo abordando a teoria por trás da combinação
}

/**
 * Respostas coletadas no questionário interativo de marca (Brand Quiz).
 */
export interface QuizAnswers {
  brandName: string;   // Nome da empresa ou marca informada pelo usuário
  segment: string;     // Setor selecionado de atuação (ex: 'tech', 'health')
  personality: {       // Escala de personalidade da marca (valores de 1 a 5)
    playfulSerious: number;        // Descontraído (1) vs. Sério (5)
    traditionalInnovative: number; // Tradicional (1) vs. Inovador (5)
    accessiblePremium: number;     // Acessível (1) vs. Premium / Sofisticado (5)
  };
  emotions: string[];  // Lista de emoções prioritárias selecionadas pelo usuário (máximo 3)
  audience: string;    // Público-alvo prioritário da marca
}

/**
 * Resultado gerado pelo algoritmo de sugestão de paleta de marca.
 */
export interface RecommendationResult {
  recommendedPalette: Palette; // A paleta ideal identificada pelo algoritmo
  explanation: string;         // Justificativa detalhada de por que essa paleta atende à marca
  alternatives: Palette[];     // Paletas alternativas que também se alinham ao perfil
}
