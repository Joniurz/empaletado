/**
 * @file PaletteDetail.tsx
 * @description Componente de detalhamento aprofundado de uma paleta selecionada.
 * Exibe conversões cromáticas detalhadas em HEX, RGB e HSL de forma interativa.
 * Renderiza simulações ao vivo de painéis de dados (Widgets), marcas e logos, 
 * e componentes de interface (CTA Buttons) utilizando as cores específicas de uso sugeridas.
 * Oferece também recomendações horizontais de paletas correlacionadas.
 */

import { useState, useMemo } from 'react';
import { Palette } from '../types';
import { PALETTES } from '../data';
import { hexToRgb, hexToHsl } from '../utils';
import { ArrowLeft, Copy, Check, FileCode, LayoutDashboard, Gem } from 'lucide-react';

interface PaletteDetailProps {
  paletteId: string;
  // Callback para voltar à galeria/visão anterior
  onBack: () => void;
  // Callback para navegar para uma paleta correlacionada
  onSelectPalette: (id: string) => void;
  // Callback acionado após cópia bem sucedida de cor para o Toast global
  onCopySuccess: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export default function PaletteDetail({
  paletteId,
  onBack,
  onSelectPalette,
  onCopySuccess,
}: PaletteDetailProps) {
  // Controle de estado para gerenciar o feedback interno de cópia por formato
  const [copiedFormat, setCopiedFormat] = useState<{ color: string; format: string } | null>(null);

  // Memoização para encontrar a paleta atualmente selecionada
  const palette = useMemo(() => {
    return PALETTES.find((p) => p.id === paletteId) || PALETTES[0];
  }, [paletteId]);

  // Filtra paletas correlacionadas compartilhando estilos semelhantes para sugestões horizontais
  const relatedPalettes = useMemo(() => {
    return PALETTES.filter((p) => p.id !== palette.id)
      .sort((a, b) => {
        const aMatch = a.style === palette.style ? 1 : 0;
        const bMatch = b.style === palette.style ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 3);
  }, [palette]);

  /**
   * Trata a cópia de cores sob demanda para os formatos HEX, RGB e HSL.
   */
  const handleCopy = (color: string, format: 'hex' | 'rgb' | 'hsl') => {
    let textToCopy = color;
    if (format === 'rgb') {
      textToCopy = hexToRgb(color).str;
    } else if (format === 'hsl') {
      textToCopy = hexToHsl(color).str;
    }

    navigator.clipboard.writeText(textToCopy);
    onCopySuccess(textToCopy); // Dispara o Toast no nó raiz App.tsx
    setCopiedFormat({ color, format });
    setTimeout(() => setCopiedFormat(null), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-10 w-full">
      {/* Botão de Retorno com micro-animação em hover */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-indigo-600 transition mb-8 group"
        id="detail-back-btn"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Voltar para a Galeria
      </button>

      {/* Cartão de Título Principal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-zinc-100 pb-8">
        <div>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Fidelidade Cromática
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight mt-3 mb-2">
            {palette.name}
          </h1>
          <p className="font-sans text-sm text-zinc-500 max-w-3xl leading-relaxed">
            {palette.description}
          </p>
        </div>

        {/* Informações adicionais de estilos e emoções */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-zinc-100 text-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200">
            Estilo: {palette.style}
          </span>
          {palette.emotions.map((emo) => (
            <span
              key={emo}
              className="text-xs font-bold uppercase tracking-wider bg-indigo-50/50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100/50"
            >
              {emo}
            </span>
          ))}
        </div>
      </div>

      {/* Bento Grid de Cores e Formatos Técnicos */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-16">
        {palette.colors.map((color, index) => {
          const rgb = hexToRgb(color);
          const hsl = hexToHsl(color);
          const isCopied = (fmt: string) => copiedFormat?.color === color && copiedFormat?.format === fmt;

          // Mapeamento de papéis e regras sugeridas de aplicação cromática
          let roleLabel = 'Apoio';
          if (color === palette.usage.primary) roleLabel = 'Primária / Fundo';
          else if (color === palette.usage.secondary) roleLabel = 'Secundária';
          else if (color === palette.usage.accent) roleLabel = 'Destaque / Botões';
          else if (color === palette.usage.background) roleLabel = 'Superfície / Base';

          return (
            <div
              key={`${color}-detail-${index}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-150 bg-white p-6 shadow-xs hover:shadow-md transition-all h-80 lg:col-span-1"
            >
              {/* Bloco de Cor Superior */}
              <div
                style={{ backgroundColor: color }}
                className="absolute inset-x-0 top-0 h-20 border-b border-zinc-100"
              />

              <div className="h-16" />

              {/* Informações de nomes poéticos e papéis */}
              <div className="flex-grow flex flex-col justify-end">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
                    {palette.colorNames ? palette.colorNames[index] : `Cor ${index + 1}`}
                  </span>
                  <span className="text-[9px] font-bold bg-zinc-50 border border-zinc-100 text-zinc-500 px-2 py-0.5 rounded-md">
                    {roleLabel}
                  </span>
                </div>

                {/* Grade de Copiar Formatos Técnicos */}
                <div className="space-y-2 mt-2">
                  {/* HEX Code */}
                  <div className="flex justify-between items-center text-xs border-b border-zinc-50 pb-1.5">
                    <span className="font-bold text-zinc-400 font-mono uppercase text-[9px]">HEX</span>
                    <button
                      onClick={() => handleCopy(color, 'hex')}
                      className="font-mono font-bold text-zinc-800 hover:text-indigo-600 transition flex items-center gap-1"
                    >
                      {color.toUpperCase()}
                      {isCopied('hex') ? (
                        <Check className="h-3 w-3 text-emerald-500 stroke-[3]" />
                      ) : (
                        <Copy className="h-3 w-3 text-zinc-300 group-hover:text-zinc-400" />
                      )}
                    </button>
                  </div>

                  {/* RGB Code */}
                  <div className="flex justify-between items-center text-xs border-b border-zinc-50 pb-1.5">
                    <span className="font-bold text-zinc-400 font-mono uppercase text-[9px]">RGB</span>
                    <button
                      onClick={() => handleCopy(color, 'rgb')}
                      className="font-mono text-zinc-500 hover:text-indigo-600 transition flex items-center gap-1 text-[11px]"
                    >
                      {rgb.r},{rgb.g},{rgb.b}
                      {isCopied('rgb') ? (
                        <Check className="h-3 w-3 text-emerald-500 stroke-[3]" />
                      ) : (
                        <Copy className="h-3 w-3 text-zinc-300" />
                      )}
                    </button>
                  </div>

                  {/* HSL Code */}
                  <div className="flex justify-between items-center text-xs pb-0.5">
                    <span className="font-bold text-zinc-400 font-mono uppercase text-[9px]">HSL</span>
                    <button
                      onClick={() => handleCopy(color, 'hsl')}
                      className="font-mono text-zinc-500 hover:text-indigo-600 transition flex items-center gap-1 text-[11px]"
                    >
                      {hsl.h}°,{hsl.s}%,{hsl.l}%
                      {isCopied('hsl') ? (
                        <Check className="h-3 w-3 text-emerald-500 stroke-[3]" />
                      ) : (
                        <Copy className="h-3 w-3 text-zinc-300" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SIMULAÇÕES DE COMPONENTES DE INTERFACE EM TEMPO REAL */}
      <div className="mb-20">
        <h2 className="font-sans text-2xl font-black text-zinc-950 tracking-tight mb-8">
          Simulações de Uso em Tempo Real
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Mockup de Dashboard / Gráficos de vendas */}
          <div className="bg-white rounded-2xl p-6 border border-zinc-150 shadow-xs flex flex-col items-center justify-center min-h-[360px]">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
              <LayoutDashboard className="h-3.5 w-3.5" />
              DASHBOARD WIDGET
            </span>

            <div
              className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg border"
              style={{
                backgroundColor: palette.usage.primary,
                borderColor: palette.colors[1] || palette.colors[0]
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold tracking-wider text-white">Vendas Ativas</h3>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.usage.accent }} />
                </div>
                <div className="mb-8">
                  <span className="text-3xl font-black text-white block">$15,480.00</span>
                  <span className="text-[10px] text-white/60 block mt-1">Margem de crescimento mensal</span>
                </div>

                {/* Gráfico de Barras Minimalista */}
                <div className="h-16 flex items-end gap-2.5">
                  <div className="flex-1 bg-white/10 rounded-t h-1/3" />
                  <div className="flex-1 bg-white/10 rounded-t h-2/3" />
                  <div className="flex-1 bg-white/10 rounded-t h-1/2" />
                  <div className="flex-1 rounded-t h-5/6" style={{ backgroundColor: palette.usage.accent }} />
                  <div className="flex-1 bg-white/10 rounded-t h-3/5" />
                </div>
              </div>
              <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-t border-white/10">
                <span className="text-[10px] text-white/50">Atualizado às 10:30 UTC</span>
                <button
                  className="text-[10px] font-bold text-white px-3 py-1.5 rounded-md transition"
                  style={{ backgroundColor: palette.usage.secondary }}
                  onClick={() => onCopySuccess('Exportação de dados da simulação executada!', 'info')}
                >
                  Exportar
                </button>
              </div>
            </div>
          </div>

          {/* Mockup de Logo / Assinatura de Marca */}
          <div className="bg-white rounded-2xl p-6 border border-zinc-150 shadow-xs flex flex-col items-center justify-center min-h-[360px]">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
              <Gem className="h-3.5 w-3.5" />
              MARCA &amp; LOGO
            </span>

            <div
              className="w-40 h-40 rounded-full flex items-center justify-center relative overflow-hidden shadow-inner"
              style={{
                background: `linear-gradient(135deg, ${palette.usage.primary} 0%, ${palette.colors[1] || palette.colors[0]} 100%)`
              }}
            >
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center relative z-10 shadow"
                style={{
                  backgroundColor: palette.usage.accent,
                  transform: 'rotate(45deg)'
                }}
              >
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: palette.usage.primary }} />
              </div>
            </div>

            <div className="mt-6 text-center">
              <h4 className="font-sans font-bold text-zinc-900 text-sm tracking-wider uppercase">NEXUS</h4>
              <span className="text-[9px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                {palette.name} Style
              </span>
            </div>
          </div>

          {/* Componentes Web Ativos / Teste de Contraste */}
          <div className="bg-white rounded-2xl p-6 border border-zinc-150 shadow-xs flex flex-col items-center justify-center min-h-[360px]">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
              <FileCode className="h-3.5 w-3.5" />
              COMPONENTES WEB
            </span>

            <div className="w-full max-w-sm rounded-xl p-6 border border-zinc-150 bg-zinc-50">
              <h3 className="font-sans font-extrabold text-base mb-2" style={{ color: palette.usage.primary }}>
                Explorar o Futuro
              </h3>
              <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                Utilize este canvas digital para visualizar o comportamento dinâmico do design de botões e links.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-white hover:opacity-95 transition"
                  style={{ backgroundColor: palette.usage.secondary }}
                  onClick={() => onCopySuccess('Ação primária simulada com sucesso!', 'info')}
                >
                  Começar Agora
                </button>
                <button
                  className="w-full py-2.5 rounded-lg text-xs font-bold transition border bg-white"
                  style={{
                    borderColor: palette.usage.accent,
                    color: palette.usage.primary
                  }}
                  onClick={() => onCopySuccess('Ação secundária simulada com sucesso!', 'info')}
                >
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECOMENDAÇÕES DE PALETAS CORRELACIONADAS */}
      <div>
        <h2 className="font-sans text-xl font-black text-zinc-950 tracking-tight mb-8">
          Paletas Relacionadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPalettes.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectPalette(rel.id)}
              className="group cursor-pointer bg-white border border-zinc-150 rounded-xl overflow-hidden hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="h-20 flex w-full">
                {rel.colors.map((c, i) => (
                  <div key={`${c}-rel-${i}`} style={{ backgroundColor: c }} className="flex-grow" />
                ))}
              </div>
              <div className="p-4 flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-bold text-zinc-950 group-hover:text-indigo-600 transition-colors">
                    {rel.name}
                  </h4>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">{rel.style}</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">
                  {rel.emotions.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
