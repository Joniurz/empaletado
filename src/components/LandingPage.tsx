/**
 * @file LandingPage.tsx
 * @description Componente de página inicial (Landing Page) da plataforma.
 * Apresenta uma proposta de valor clara ("Encontre a paleta de cores ideal para a sua identidade de marca"),
 * heróis interativos estilizados, chamadas para ação (CTAs) de fluxo de descoberta e explorador,
 * e uma seção de exibição de paletas de alta fidelidade em destaque.
 */

import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Grid } from 'lucide-react';
import { PALETTES } from '../data';
import PaletteCard from './PaletteCard';

interface LandingPageProps {
  // Callback disparado para transicionar a tela/visão ativa da aplicação
  onNavigate: (view: 'landing' | 'explorer' | 'quiz' | 'detail') => void;
  // Callback disparado ao selecionar um card de paleta em destaque
  onSelectPalette: (id: string) => void;
  // Callback disparado ao copiar com sucesso um código de cor, invocando o Toast
  onCopySuccess: (colorHex: string) => void;
}

export default function LandingPage({
  onNavigate,
  onSelectPalette,
  onCopySuccess,
}: LandingPageProps) {
  // Busca 3 paletas estáticas representativas de alta aderência para compor a seção de destaque inicial
  const featuredIds = ['tech_indigo', 'terra_warmth', 'nordic_frost'];
  const featuredPalettes = PALETTES.filter((p) => featuredIds.includes(p.id));

  return (
    <div className="flex flex-col w-full">
      {/* Seção Hero com animação de entrada sutil */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        {/* Grade de fundo sutil desenhada inteiramente via gradiente e máscara radial de CSS */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Conteúdo de Texto e Botões de CTA */}
          <div className="flex-1 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 tracking-wide uppercase mb-6"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Harmonia Cromática &bull; Curadoria Profissional
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.1] mb-6"
            >
              Encontre a paleta de cores ideal para a sua{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-600">
                identidade de marca
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-lg text-zinc-600 leading-relaxed mb-8 max-w-2xl"
            >
              Explore dezenas de combinações construídas por especialistas ou descubra a sugestão perfeita baseada nas diretrizes de segmento, estilo e emoção da marca. Uma curadoria de cores precisa e harmônica.
            </motion.p>

            {/* Ações primárias de navegação */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => onNavigate('quiz')}
                className="group flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 hover:shadow-indigo-600/20 active:scale-98 transition-all"
                id="hero-cta-quiz"
              >
                Descobrir minha paleta ideal
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate('explorer')}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-8 py-4 text-sm font-bold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 active:scale-98 transition-all"
                id="hero-cta-explorer"
              >
                <Grid className="h-4 w-4" />
                Explorar Coleções
              </button>
            </motion.div>
          </div>

          {/* Cartão de Amostragem de Alta Precisão (Amostra Digital e Cores de Destaque) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square bg-zinc-50 rounded-2xl border border-zinc-150 p-6 shadow-2xl shadow-indigo-900/5 overflow-hidden">
              <div className="flex flex-col h-full justify-between gap-4">
                
                {/* Cabeçalho da amostragem digital */}
                <div className="flex justify-between items-center pb-4 border-b border-zinc-200">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">AMOSTRA DE PRECISÃO</span>
                    <span className="text-sm font-bold text-zinc-900">Tech Indigo Active</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">
                    RECOMENDADA
                  </span>
                </div>

                {/* Bloco principal de cor da tela */}
                <div className="flex-grow rounded-xl bg-indigo-600 flex flex-col justify-end p-5 text-white transition-all hover:opacity-95">
                  <span className="font-mono text-[10px] tracking-widest uppercase opacity-75 mb-1 font-semibold">COR PRINCIPAL</span>
                  <span className="font-mono text-base font-bold">#4648D4</span>
                </div>

                {/* Blocos secundários de apoio cromático */}
                <div className="grid grid-cols-2 gap-4 h-1/3">
                  <div className="rounded-xl bg-sky-500 flex flex-col justify-end p-4 text-white hover:opacity-95 transition-all">
                    <span className="font-mono text-[9px] tracking-widest uppercase opacity-75 font-semibold">DESTAQUE</span>
                    <span className="font-mono text-xs font-bold">#39B8FD</span>
                  </div>
                  <div className="rounded-xl bg-[#c0c1ff] flex flex-col justify-end p-4 text-indigo-950 border border-indigo-200/50 hover:opacity-95 transition-all">
                    <span className="font-mono text-[9px] tracking-widest uppercase opacity-75 font-semibold">APOIO</span>
                    <span className="font-mono text-xs font-bold">#C0C1FF</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção das Paletas em Destaque */}
      <section className="bg-zinc-50 py-16 lg:py-24 border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                Paletas em Destaque
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-500 mt-2 max-w-xl">
                Uma seleção curada para inspiração imediata de acordo com a psicologia das cores clássica.
              </p>
            </div>
            <button
              onClick={() => onNavigate('explorer')}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition"
              id="view-all-featured"
            >
              Ver Todas as Paletas &rarr;
            </button>
          </div>

          {/* Grid de Paletes Reutilizáveis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPalettes.map((palette) => (
              <PaletteCard
                key={palette.id}
                palette={palette}
                onSelect={onSelectPalette}
                onCopySuccess={onCopySuccess}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
