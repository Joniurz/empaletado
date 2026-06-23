import { Palette, QuizAnswers, RecommendationResult } from './types';

export const PALETTES: Palette[] = [
  {
    id: 'tech_indigo',
    name: 'Tech Indigo',
    style: 'moderna',
    emotions: ['confiança', 'inovação'],
    segments: ['tech', 'creative'],
    colors: ['#0F172A', '#3B82F6', '#6063EE', '#C0C1FF', '#FAFAFF'],
    colorNames: ['Azul Escuro Espacial', 'Azul Elétrico', 'Indigo Digital', 'Lilás Suave', 'Branco Canvas'],
    usage: {
      primary: '#0F172A',
      secondary: '#6063EE',
      accent: '#3B82F6',
      background: '#FAFAFF'
    },
    description: 'Uma combinação ideal para startups de SaaS e criadores de produtos digitais que buscam um equilíbrio perfeito entre estabilidade técnica e dinamismo futurista.'
  },
  {
    id: 'ocean_trust',
    name: 'Ocean Trust',
    style: 'elegante',
    emotions: ['confiança', 'tranquilidade'],
    segments: ['tech', 'finance', 'health'],
    colors: ['#001E2F', '#006591', '#39B8FD', '#EEF0FF', '#FFFFFF'],
    colorNames: ['Abismo Oceânico', 'Azul Marinho Corporativo', 'Céu de Verão', 'Gelo Polar', 'Branco Puro'],
    usage: {
      primary: '#001E2F',
      secondary: '#006591',
      accent: '#39B8FD',
      background: '#FFFFFF'
    },
    description: 'Inspirada na clareza do oceano, transmite uma imagem profissional, sólida e pacífica. Perfeita para plataformas financeiras e portais de telemedicina.'
  },
  {
    id: 'terra_warmth',
    name: 'Terra Warmth',
    style: 'elegante',
    emotions: ['tranquilidade', 'sofisticação'],
    segments: ['health', 'retail', 'creative'],
    colors: ['#301400', '#904900', '#FFB783', '#FFDCC5', '#FFFFFF'],
    colorNames: ['Chocolate Amargo', 'Âmbar Escuro', 'Pêssego Vibrante', 'Néctar Suave', 'Branco Gesso'],
    usage: {
      primary: '#301400',
      secondary: '#904900',
      accent: '#FFB783',
      background: '#FFFFFF'
    },
    description: 'Tons terrosos e acolhedores que trazem uma sensação orgânica e premium. Excelente para spas, marcas de bem-estar de alto padrão e cafeterias gourmet.'
  },
  {
    id: 'vibrant_neon',
    name: 'Vibrant Neon',
    style: 'vibrante',
    emotions: ['energia', 'alegria'],
    segments: ['creative', 'retail', 'tech'],
    colors: ['#120136', '#035AA6', '#400082', '#F900BF', '#FAFAFF'],
    colorNames: ['Roxo Retrowave', 'Azul Royal Elétrico', 'Violeta Imperial', 'Pink Cyber', 'Branco Fluorescente'],
    usage: {
      primary: '#120136',
      secondary: '#400082',
      accent: '#F900BF',
      background: '#FAFAFF'
    },
    description: 'Uma paleta de altíssima octanagem visual, perfeita para estúdios criativos de ponta, marcas de streetwear ou aplicativos de entretenimento jovem.'
  },
  {
    id: 'minimal_studio',
    name: 'Minimalist Studio',
    style: 'minimalista',
    emotions: ['sofisticação', 'tranquilidade'],
    segments: ['creative', 'retail', 'tech'],
    colors: ['#121212', '#3E3E3E', '#7A7A7A', '#EAEAEA', '#FFFFFF'],
    colorNames: ['Preto absoluto', 'Carvão Mineral', 'Cinza Concreto', 'Alumínio Escovado', 'Branco Studio'],
    usage: {
      primary: '#121212',
      secondary: '#7A7A7A',
      accent: '#3E3E3E',
      background: '#FFFFFF'
    },
    description: 'A pureza da escala monocromática para focar a atenção na arquitetura de conteúdo e no design de produto. Ideal para estúdios de arquitetura e e-commerces de moda.'
  },
  {
    id: 'eco_green',
    name: 'Eco Green',
    style: 'moderna',
    emotions: ['tranquilidade', 'inovação'],
    segments: ['health', 'creative', 'tech'],
    colors: ['#0B291A', '#10B981', '#A7F3D0', '#F0FDF4', '#FFFFFF'],
    colorNames: ['Floresta Amazônica', 'Esmeralda Ativo', 'Menta Fresca', 'Orvalho da Manhã', 'Branco Puro'],
    usage: {
      primary: '#0B291A',
      secondary: '#10B981',
      accent: '#A7F3D0',
      background: '#FFFFFF'
    },
    description: 'Simboliza crescimento, ecologia e frescor tecnológico. Altamente recomendada para marcas de agrotech, cosméticos veganos e clínicas de reabilitação.'
  },
  {
    id: 'corporate_navy',
    name: 'Corporate Navy',
    style: 'minimalista',
    emotions: ['confiança'],
    segments: ['finance', 'tech', 'education'],
    colors: ['#0E1E38', '#1E3A8A', '#3B82F6', '#93C5FD', '#F8FAFC'],
    colorNames: ['Azul Imperial', 'Azul Marinho Clássico', 'Azul Link', 'Gelo Claro', 'Fundo Office'],
    usage: {
      primary: '#0E1E38',
      secondary: '#1E3A8A',
      accent: '#3B82F6',
      background: '#F8FAFC'
    },
    description: 'O padrão internacional de credibilidade e autoridade. Traz a segurança necessária para sistemas bancários tradicionais e plataformas de ensino corporativo.'
  },
  {
    id: 'creative_sunset',
    name: 'Creative Sunset',
    style: 'vibrante',
    emotions: ['alegria', 'energia'],
    segments: ['creative', 'retail', 'education'],
    colors: ['#3F0C1F', '#9D174D', '#F43F5E', '#FECDD3', '#FFF5F7'],
    colorNames: ['Cereja Escura', 'Framboesa Intensa', 'Rosa Pôr do Sol', 'Pétala de Rosa', 'Nuvem Rosa'],
    usage: {
      primary: '#3F0C1F',
      secondary: '#9D174D',
      accent: '#F43F5E',
      background: '#FFF5F7'
    },
    description: 'Uma transição calorosa e apaixonante de rosas e vermelhos. Evoca entusiasmo, paixão criativa e excelente retenção visual para marcas de varejo jovem.'
  },
  {
    id: 'educ_gold',
    name: 'Educ Gold',
    style: 'elegante',
    emotions: ['confiança', 'alegria'],
    segments: ['education', 'creative'],
    colors: ['#1E293B', '#D97706', '#F59E0B', '#FEF3C7', '#FFFDF5'],
    colorNames: ['Slate Intelecto', 'Âmbar Acadêmico', 'Ouro Vibrante', 'Pergaminho Suave', 'Papel Fino'],
    usage: {
      primary: '#1E293B',
      secondary: '#D97706',
      accent: '#F59E0B',
      background: '#FFFDF5'
    },
    description: 'Une a seriedade intelectual do cinza ardósia com a luz inspiradora do amarelo âmbar. Ideal para escolas de artes, cursinhos premium e e-learning.'
  },
  {
    id: 'luxury_gold',
    name: 'Luxury Gold',
    style: 'elegante',
    emotions: ['sofisticação'],
    segments: ['retail', 'creative'],
    colors: ['#111111', '#85581A', '#D4AF37', '#F3E5AB', '#FFFDF9'],
    colorNames: ['Obsidiana', 'Bronze Antigo', 'Ouro Polido', 'Champagne', 'Marfim Nobre'],
    usage: {
      primary: '#111111',
      secondary: '#85581A',
      accent: '#D4AF37',
      background: '#FFFDF9'
    },
    description: 'O epítome do luxo e do requinte. Projetada para joalherias, marcas de alta costura, marcas pessoais de consultoria executiva ou produtos exclusivos.'
  },
  {
    id: 'berry_fresh',
    name: 'Berry Fresh',
    style: 'vibrante',
    emotions: ['alegria', 'energia'],
    segments: ['health', 'retail', 'creative'],
    colors: ['#2E0214', '#800020', '#E0115F', '#FADADD', '#FFFBFD'],
    colorNames: ['Mirtilo Escuro', 'Vinho Burgundy', 'Groselha Ácida', 'Iogurte de Morango', 'Creme de Amoras'],
    usage: {
      primary: '#2E0214',
      secondary: '#800020',
      accent: '#E0115F',
      background: '#FFFBFD'
    },
    description: 'Frutada e exuberante. Perfeita para marcas de smoothies, alimentos naturais ativos, cosméticos modernos e marcas de bem-estar com espírito audaz.'
  },
  {
    id: 'nordic_frost',
    name: 'Nordic Frost',
    style: 'minimalista',
    emotions: ['tranquilidade', 'confiança'],
    segments: ['tech', 'health', 'finance'],
    colors: ['#1C2541', '#3A506B', '#5BC0BE', '#EAEFF2', '#FFFFFF'],
    colorNames: ['Noite Polar', 'Aço Escandinavo', 'Gelo Glacial', 'Névoa Nórdica', 'Neve Fresca'],
    usage: {
      primary: '#1C2541',
      secondary: '#3A506B',
      accent: '#5BC0BE',
      background: '#FFFFFF'
    },
    description: 'Tons frios e nítidos que remetem a precisão e silêncio. Ideal para marcas de design industrial, utilitários minimalistas ou clínicas dermatológicas.'
  },
  {
    id: 'neon_cyber',
    name: 'Neon Cyber',
    style: 'vibrante',
    emotions: ['inovação', 'energia'],
    segments: ['creative', 'tech'],
    colors: ['#03001E', '#7303C0', '#EC38BC', '#FDEFF9', '#FFFFFF'],
    colorNames: ['Vácuo Espacial', 'Roxo Holográfico', 'Neon Magenta', 'Algodão Doce', 'Branco Radiante'],
    usage: {
      primary: '#03001E',
      secondary: '#7303C0',
      accent: '#EC38BC',
      background: '#FFFFFF'
    },
    description: 'Conectada ao espírito cyberpunk e Web3. Ideal para agências de vanguarda tecnológica, criadores de jogos indie e eventos de arte interativa.'
  },
  {
    id: 'pastel_dream',
    name: 'Pastel Dream',
    style: 'minimalista',
    emotions: ['tranquilidade', 'sofisticação'],
    segments: ['creative', 'education', 'health'],
    colors: ['#4C3F54', '#8E8296', '#C5B9CD', '#F1EAFF', '#FFF9FF'],
    colorNames: ['Ametista Escura', 'Lavanda Acinzentada', 'Mármore Lilás', 'Bruma Suave', 'Seda de Algodão'],
    usage: {
      primary: '#4C3F54',
      secondary: '#8E8296',
      accent: '#C5B9CD',
      background: '#FFF9FF'
    },
    description: 'Delicada e com alto refinamento tonal. Traz calma profunda e elegância silenciosa, indicada para marcas infantis sofisticadas, planejadores de casamento e psicoterapeutas.'
  },
  {
    id: 'warm_organic',
    name: 'Warm Organic',
    style: 'elegante',
    emotions: ['tranquilidade', 'alegria'],
    segments: ['health', 'retail', 'education'],
    colors: ['#271300', '#78350F', '#D97706', '#FEF3C7', '#FFFAEE'],
    colorNames: ['Café Torrado', 'Tijolo Rústico', 'Mostarda Quente', 'Trigo Maduro', 'Fundo Linho'],
    usage: {
      primary: '#271300',
      secondary: '#78350F',
      accent: '#D97706',
      background: '#FFFAEE'
    },
    description: 'Uma jornada aconchegante pelo calor da terra. Ideal para padarias artesanais, marcas de roupas de linho sustentáveis e projetos pedagógicos comunitários.'
  }
];

// RULES MAPPING (Obrigatória - Determinística, sem IA ou machine learning!)
// Segmento -> Estilo -> Emoção -> Palette IDs
export const SUGGESTION_RULES: Record<string, Record<string, Record<string, string[]>>> = {
  tech: {
    moderna: {
      'confiança': ['tech_indigo', 'ocean_trust'],
      'inovação': ['tech_indigo', 'neon_cyber'],
      'tranquilidade': ['ocean_trust', 'nordic_frost'],
      'energia': ['tech_indigo', 'vibrant_neon']
    },
    elegante: {
      'confiança': ['ocean_trust', 'corporate_navy'],
      'sofisticação': ['ocean_trust', 'terra_warmth'],
      'tranquilidade': ['ocean_trust']
    },
    vibrante: {
      'energia': ['vibrant_neon', 'neon_cyber'],
      'inovação': ['neon_cyber', 'tech_indigo'],
      'alegria': ['vibrant_neon']
    },
    minimalista: {
      'sofisticação': ['minimal_studio', 'nordic_frost'],
      'confiança': ['corporate_navy', 'nordic_frost'],
      'tranquilidade': ['nordic_frost']
    }
  },
  health: {
    moderna: {
      'tranquilidade': ['eco_green', 'nordic_frost'],
      'inovação': ['eco_green', 'tech_indigo'],
      'confiança': ['ocean_trust', 'eco_green']
    },
    elegante: {
      'tranquilidade': ['terra_warmth', 'warm_organic'],
      'sofisticação': ['terra_warmth', 'pastel_dream'],
      'confiança': ['ocean_trust']
    },
    vibrante: {
      'energia': ['berry_fresh', 'vibrant_neon'],
      'alegria': ['berry_fresh', 'warm_organic']
    },
    minimalista: {
      'tranquilidade': ['nordic_frost', 'pastel_dream'],
      'sofisticação': ['pastel_dream', 'minimal_studio'],
      'confiança': ['nordic_frost']
    }
  },
  finance: {
    moderna: {
      'confiança': ['ocean_trust', 'tech_indigo'],
      'inovação': ['tech_indigo']
    },
    elegante: {
      'confiança': ['corporate_navy', 'ocean_trust'],
      'sofisticação': ['ocean_trust', 'luxury_gold']
    },
    vibrante: {
      'energia': ['vibrant_neon'],
      'alegria': ['vibrant_neon']
    },
    minimalista: {
      'confiança': ['corporate_navy', 'minimal_studio'],
      'sofisticação': ['minimal_studio', 'nordic_frost']
    }
  },
  retail: {
    moderna: {
      'confiança': ['ocean_trust'],
      'energia': ['vibrant_neon', 'creative_sunset'],
      'alegria': ['creative_sunset']
    },
    elegante: {
      'sofisticação': ['luxury_gold', 'terra_warmth'],
      'tranquilidade': ['terra_warmth']
    },
    vibrante: {
      'energia': ['creative_sunset', 'vibrant_neon'],
      'alegria': ['creative_sunset', 'berry_fresh']
    },
    minimalista: {
      'sofisticação': ['minimal_studio', 'luxury_gold'],
      'tranquilidade': ['pastel_dream']
    }
  },
  education: {
    moderna: {
      'confiança': ['corporate_navy', 'educ_gold'],
      'inovação': ['tech_indigo', 'educ_gold'],
      'alegria': ['educ_gold']
    },
    elegante: {
      'confiança': ['educ_gold', 'corporate_navy'],
      'sofisticação': ['educ_gold', 'pastel_dream']
    },
    vibrante: {
      'energia': ['creative_sunset', 'vibrant_neon'],
      'alegria': ['creative_sunset', 'educ_gold']
    },
    minimalista: {
      'tranquilidade': ['pastel_dream', 'nordic_frost'],
      'sofisticação': ['pastel_dream', 'minimal_studio']
    }
  },
  creative: {
    moderna: {
      'inovação': ['tech_indigo', 'neon_cyber'],
      'confiança': ['tech_indigo', 'ocean_trust'],
      'energia': ['neon_cyber']
    },
    elegante: {
      'sofisticação': ['luxury_gold', 'terra_warmth'],
      'tranquilidade': ['terra_warmth', 'pastel_dream']
    },
    vibrante: {
      'energia': ['vibrant_neon', 'creative_sunset'],
      'alegria': ['creative_sunset', 'berry_fresh'],
      'inovação': ['neon_cyber']
    },
    minimalista: {
      'sofisticação': ['minimal_studio', 'pastel_dream'],
      'tranquilidade': ['pastel_dream', 'minimal_studio']
    }
  }
};

// ==========================================
// DYNAMIC PALETTES GENERATOR
// ==========================================

const NAMES_PREFIX = {
  moderna: ['Apex', 'Nexus', 'Volt', 'Aero', 'Nova', 'Cyber', 'Flux', 'Quantum', 'Vortex', 'SaaS', 'Pixel', 'Synapse'],
  elegante: ['Aurum', 'Opus', 'Veritas', 'Silk', 'Ivory', 'Satin', 'Noble', 'Grand', 'Royal', 'Serene', 'Velvet', 'Prism'],
  vibrante: ['Neon', 'Pulse', 'Hyper', 'Blast', 'Solar', 'Fever', 'Flash', 'Zenith', 'Echo', 'Primal', 'Cosmic', 'Active'],
  minimalista: ['Pure', 'Slate', 'Alloy', 'Mono', 'Breeze', 'Stark', 'Raw', 'Void', 'Quartz', 'Nordic', 'Calm', 'Muted']
};

const NAMES_SUFFIX = {
  confiança: ['Anchor', 'Shield', 'Trust', 'Forge', 'Sentry', 'Alliance', 'Sovereign', 'Guardian'],
  energia: ['Ignite', 'Surge', 'Velocity', 'Drive', 'Spark', 'Kinetic', 'Thrust', 'Ovation'],
  tranquilidade: ['Oasis', 'Haven', 'Orchard', 'Flow', 'Mist', 'Bloom', 'Lagoon', 'Bower'],
  inovação: ['Engine', 'Orbit', 'Matrix', 'Lab', 'Catalyst', 'Synthetix', 'Vector', 'Horizon'],
  alegria: ['Radiance', 'Glow', 'Jubilee', 'Fiesta', 'Cheer', 'Beaming', 'Vibe', 'Chroma'],
  sofisticação: ['Studio', 'Atelier', 'Gallery', 'Couture', 'Estate', 'Luxe', 'Elite', 'Crown']
};

const segmentsList = ['tech', 'health', 'finance', 'retail', 'education', 'creative'];
const stylesList = ['moderna', 'elegante', 'vibrante', 'minimalista'];
const emotionsList = ['confiança', 'energia', 'tranquilidade', 'inovação', 'alegria', 'sofisticação'];

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const y = Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    const val = Math.round(255 * (l - a * y));
    return val.toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getBaseHue(segment: string, emotion: string, index: number): number {
  let hue = 220;
  if (segment === 'tech') hue = 225;
  else if (segment === 'health') hue = 145;
  else if (segment === 'finance') hue = 210;
  else if (segment === 'retail') hue = 15;
  else if (segment === 'education') hue = 40;
  else if (segment === 'creative') hue = 290;

  if (emotion === 'confiança') hue = (hue + 210) / 2;
  else if (emotion === 'energia') hue = 10;
  else if (emotion === 'tranquilidade') hue = 140;
  else if (emotion === 'inovação') hue = 260;
  else if (emotion === 'alegria') hue = 45;
  else if (emotion === 'sofisticação') hue = 280;

  hue = (hue + index * 35) % 360;
  return Math.round(hue);
}

// Expand the SUGGESTION_RULES keys to ensure full coverage
for (const seg of segmentsList) {
  if (!SUGGESTION_RULES[seg]) {
    SUGGESTION_RULES[seg] = {};
  }
  for (const sty of stylesList) {
    if (!SUGGESTION_RULES[seg][sty]) {
      SUGGESTION_RULES[seg][sty] = {};
    }
    for (const emo of emotionsList) {
      if (!SUGGESTION_RULES[seg][sty][emo]) {
        SUGGESTION_RULES[seg][sty][emo] = [];
      }
    }
  }
}

const descSegmentMap: Record<string, string> = {
  tech: 'focado em plataformas digitais de alta performance e startups inovadoras.',
  health: 'desenhado para evocar bem-estar, equilíbrio clínico e vitalidade humana.',
  finance: 'ideal para instituições financeiras e canais corporativos que exigem sobriedade.',
  retail: 'otimizado para atrair a atenção de consumidores em e-commerces e vitrines físicas.',
  education: 'perfeito para ambientes de aprendizagem, escolas criativas e portais acadêmicos.',
  creative: 'direcionado para estúdios de design, marcas de moda e campanhas de impacto visual.'
};

const descStyleMap: Record<string, string> = {
  minimalista: 'Apresenta um design de contraste refinado e escala tonal limpa.',
  elegante: 'Traz tons ricos e sofisticados com acabamento estético de alto padrão.',
  vibrante: 'Irradia energia pura e dinamismo visual com tons altamente saturados.',
  moderna: 'Usa um esquema cromático futurista, sintonizado com as últimas tendências do mercado SaaS.'
};

const descEmotionMap: Record<string, string> = {
  confiança: 'transmite uma imagem sólida de integridade, autoridade e segurança de dados.',
  energia: 'estimula a ação rápida, o entusiasmo ativo e a energia competitiva.',
  tranquilidade: 'proporciona conforto relaxante, serenidade mental e equilíbrio restaurador.',
  inovação: 'antecipa tendências com um olhar de disrupção, curiosidade e progresso constante.',
  alegria: 'irradia vibrações acolhedoras, simpatia direta e otimismo convidativo.',
  sofisticação: 'reforça um posicionamento exclusivo de luxo, precisão e distinção elitizada.'
};

// Generate 288 unique color palettes and populate SUGGESTION_RULES & PALETTES
for (const segment of segmentsList) {
  for (const style of stylesList) {
    for (const emotion of emotionsList) {
      for (let variation = 0; variation < 2; variation++) {
        const id = `gen_${segment}_${style}_${emotion}_${variation}`;
        const hue = getBaseHue(segment, emotion, variation);
        
        let s = 65;
        let l1 = 15, l2 = 45, l3 = 60, l4 = 90, l5 = 98;
        
        if (style === 'minimalista') {
          s = 10;
          l1 = 18; l2 = 45; l3 = 30; l4 = 88; l5 = 98;
        } else if (style === 'elegante') {
          s = 35;
          l1 = 15; l2 = 35; l3 = 58; l4 = 91; l5 = 98;
        } else if (style === 'vibrante') {
          s = 85;
          l1 = 12; l2 = 45; l3 = 58; l4 = 87; l5 = 98;
        } else { // moderna
          s = 68;
          l1 = 15; l2 = 50; l3 = 65; l4 = 90; l5 = 98;
        }

        const color1 = hslToHex(hue, s, l1);
        const color2 = hslToHex((hue + 20) % 360, Math.max(10, s - 10), l2);
        const color3 = hslToHex((hue + 50) % 360, Math.max(10, s + 10), l3);
        const color4 = hslToHex(hue, Math.max(5, s - 15), l4);
        const color5 = hslToHex((hue + 10) % 360, Math.max(2, s - 20), l5);

        const colors = [color1, color2, color3, color4, color5];

        let primaryName = 'Preto Mineral';
        if (style !== 'minimalista') {
          if (hue < 30 || hue > 330) primaryName = 'Borgonha Profundo';
          else if (hue < 80) primaryName = 'Bronze Nobre';
          else if (hue < 160) primaryName = 'Floresta Intensa';
          else if (hue < 260) primaryName = 'Abismo Oceânico';
          else primaryName = 'Ametista Profunda';
        }
        
        let secName = 'Névoa Suave';
        if (hue < 30 || hue > 330) secName = 'Carmesim Ativo';
        else if (hue < 80) secName = 'Mostarda Quente';
        else if (hue < 160) secName = 'Menta Vibrante';
        else if (hue < 260) secName = 'Azul Cobalto';
        else secName = 'Púrpura Místico';

        const colorNames = [
          primaryName,
          secName,
          'Brilho de Destaque',
          'Névoa de Apoio',
          'Fundo Premium'
        ];

        const usage = {
          primary: color1,
          secondary: color2,
          accent: color3,
          background: color5
        };

        const prefixList = NAMES_PREFIX[style as keyof typeof NAMES_PREFIX] || NAMES_PREFIX['moderna'];
        const suffixList = NAMES_SUFFIX[emotion as keyof typeof NAMES_SUFFIX] || NAMES_SUFFIX['confiança'];
        
        const prefix = prefixList[(segment.charCodeAt(0) + variation) % prefixList.length];
        const suffix = suffixList[(segment.charCodeAt(1) + variation) % suffixList.length];
        
        let name = `${prefix} ${suffix}`;
        if (variation > 0) {
          const modifiers = ['Plus', 'Pro', 'Studio', 'Elite', 'Prime', 'Ultra', 'Core', 'Vibe'];
          const mod = modifiers[(segment.charCodeAt(2) + variation) % modifiers.length];
          name = `${prefix} ${suffix} ${mod}`;
        }

        const description = `${descStyleMap[style]} Um esquema ${descSegmentMap[segment]} que ${descEmotionMap[emotion]}`;

        PALETTES.push({
          id,
          name,
          style: style as any,
          emotions: [emotion],
          segments: [segment],
          colors,
          colorNames,
          usage,
          description
        });
        
        SUGGESTION_RULES[segment][style][emotion].push(id);
      }
    }
  }
}

/**
 * Deterministic recommendation generator based on rules.
 * No probabilistic or random element. Guaranteed 100% reproducible.
 */
export function getRecommendation(answers: QuizAnswers): RecommendationResult {
  const { segment, emotions, audience } = answers;
  
  // Convert 1-5 personality sliders to style tag
  // We prioritize:
  // traditionalInnovative > 4: 'moderna' or 'vibrante' (depending on playfulSerious)
  // playfulSerious < 2.5 && traditionalInnovative > 3: 'vibrante'
  // playfulSerious > 4 && accessiblePremium > 3.5: 'elegante'
  // traditionalInnovative < 3.5 && playfulSerious > 3: 'minimalista' (or elegante)
  // Else default style to 'moderna'
  let calculatedStyle: 'moderna' | 'elegante' | 'vibrante' | 'minimalista' = 'moderna';
  
  if (answers.personality.traditionalInnovative >= 4) {
    if (answers.personality.playfulSerious <= 2.5) {
      calculatedStyle = 'vibrante';
    } else {
      calculatedStyle = 'moderna';
    }
  } else if (answers.personality.playfulSerious >= 4) {
    if (answers.personality.accessiblePremium >= 3.5) {
      calculatedStyle = 'elegante';
    } else {
      calculatedStyle = 'minimalista';
    }
  } else if (answers.personality.accessiblePremium >= 4) {
    calculatedStyle = 'elegante';
  } else if (answers.personality.playfulSerious <= 2) {
    calculatedStyle = 'vibrante';
  } else if (answers.personality.traditionalInnovative <= 2.5) {
    calculatedStyle = 'minimalista';
  }

  // 1. Core Rule matching
  let recommendedId: string | null = null;
  const segmentRules = SUGGESTION_RULES[segment] || SUGGESTION_RULES['tech'];
  const styleRules = segmentRules[calculatedStyle] || segmentRules['moderna'];

  // Look for first matched emotion
  for (const emo of emotions) {
    const emoLower = emo.toLowerCase();
    const matchedIds = styleRules[emoLower];
    if (matchedIds && matchedIds.length > 0) {
      recommendedId = matchedIds[0]; // first option is primary
      break;
    }
  }

  // 2. First Fallback: matched style but any emotion from answers or style's keys
  if (!recommendedId) {
    const keys = Object.keys(styleRules);
    if (keys.length > 0) {
      const matchedIds = styleRules[keys[0]];
      if (matchedIds && matchedIds.length > 0) {
        recommendedId = matchedIds[0];
      }
    }
  }

  // 3. Second Fallback: search in total PALETTES list matching current segment
  if (!recommendedId) {
    const candidates = PALETTES.filter(p => p.segments.includes(segment));
    if (candidates.length > 0) {
      // Find candidate matching style
      const withStyle = candidates.find(p => p.style === calculatedStyle);
      recommendedId = withStyle ? withStyle.id : candidates[0].id;
    }
  }

  // 4. Absolute Fallback
  if (!recommendedId) {
    recommendedId = 'tech_indigo';
  }

  const recommendedPalette = PALETTES.find(p => p.id === recommendedId) || PALETTES[0];

  // Dynamic but completely deterministic explanation based on Segment, Style, Emotion, and Audience
  const industryLabelMap: Record<string, string> = {
    tech: 'Tecnologia & Software',
    health: 'Saúde & Bem-estar',
    finance: 'Finanças & Seguros',
    retail: 'Varejo & E-commerce',
    education: 'Educação',
    creative: 'Design & Criativo'
  };

  const styleLabelMap: Record<string, string> = {
    moderna: 'moderno e inovador',
    elegante: 'elegante e refinado',
    vibrante: 'vibrante e cheio de energia',
    minimalista: 'minimalista e de alta precisão'
  };

  const audienceLabelMap: Record<string, string> = {
    genz_millennials: 'gerações conectadas como a Gen Z e Millennials',
    professionals_b2b: 'profissionais qualificados e parceiros corporativos (B2B)',
    general_family: 'um público amplo, integrado por famílias e consumidores em geral'
  };

  const industryName = industryLabelMap[segment] || segment;
  const styleDesc = styleLabelMap[recommendedPalette.style] || 'equilibrado';
  const emotionsList = emotions.join(' e ');
  const audienceDesc = audienceLabelMap[audience] || 'seus clientes ideais';

  const explanation = `Com base nas respostas para "${answers.brandName}" no setor de ${industryName}, nossa matriz determinística selecionou a paleta "${recommendedPalette.name}". Ela apresenta um perfil visual ${styleDesc}, perfeitamente sintonizado com os valores de ${emotionsList} que sua marca busca irradiar. Esta combinação foi estrategicamente mapeada para obter excelente ressonância com ${audienceDesc}, oferecendo contraste adequado e sofisticação cromática previsível para todas as aplicações de interface.`;

  // Select 3 alternatives that are DIFFERENT from recommendedPalette
  // Deterministic selector: candidates with same segment, or same style, excluding the chosen one.
  let alternatives = PALETTES.filter(p => p.id !== recommendedPalette.id);
  
  // Sort by matching segment first, then style, to get deterministic top 3
  alternatives.sort((a, b) => {
    const aSegMatch = a.segments.includes(segment) ? 1 : 0;
    const bSegMatch = b.segments.includes(segment) ? 1 : 0;
    if (aSegMatch !== bSegMatch) return bSegMatch - aSegMatch;

    const aStyleMatch = a.style === calculatedStyle ? 1 : 0;
    const bStyleMatch = b.style === calculatedStyle ? 1 : 0;
    return bStyleMatch - aStyleMatch;
  });

  return {
    recommendedPalette,
    explanation,
    alternatives: alternatives.slice(0, 3)
  };
}
