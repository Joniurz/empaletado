/**
 * @file PaletteCard.tsx
 * @description Componente de cartão individual para visualização rápida de uma paleta de cores.
 * Exibe as faixas de cores em uma barra interativa, onde o usuário pode clicar diretamente 
 * em cada bloco para copiar seu respectivo código HEX, além de exibir as tags de estilo e emoções.
 */

import React, { useState } from 'react';
import { Palette } from '../types';
import { Copy, Check, Eye } from 'lucide-react';

interface PaletteCardProps {
  key?: string | number;
  palette: Palette;
  // Callback disparado ao selecionar o cartão para ver o detalhamento completo
  onSelect: (paletteId: string) => void;
  // Callback disparado após copiar com sucesso o HEX de uma cor, disparando o Toast global
  onCopySuccess: (colorHex: string) => void;
}

export default function PaletteCard({
  palette,
  onSelect,
  onCopySuccess,
}: PaletteCardProps) {
  // Estado local para controle interno temporário de feedback "Copiado!" no bloco específico
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  /**
   * Trata o clique no bloco de cor para efetuar a cópia do código HEX correspondente
   * sem disparar o redirecionamento do card (stopPropagation).
   */
  const handleCopy = (e: React.MouseEvent, color: string) => {
    e.stopPropagation(); // Evita navegar para a página de detalhes ao clicar na cor
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    onCopySuccess(color); // Notifica o componente App.tsx para instanciar o Toast
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // Mapeamento de estilos visuais para cores de tags Tailwind CSS
  const styleColors: Record<string, string> = {
    moderna: 'bg-blue-50 text-blue-700 border-blue-100',
    elegante: 'bg-amber-50 text-amber-700 border-amber-100',
    vibrante: 'bg-rose-50 text-rose-700 border-rose-100',
    minimalista: 'bg-zinc-100 text-zinc-800 border-zinc-200'
  };

  return (
    <div
      onClick={() => onSelect(palette.id)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-white transition-all duration-300 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer animate-fade-in"
      id={`palette-card-${palette.id}`}
    >
      {/* Bloco de Amostras de Cores Interativas */}
      <div className="flex h-32 w-full overflow-hidden bg-zinc-50 relative">
        {palette.colors.map((color, index) => (
          <div
            key={`${color}-${index}`}
            style={{ backgroundColor: color }}
            className="group/swatch relative flex-1 h-full cursor-pointer transition-all duration-300 hover:flex-[1.4] flex items-center justify-center text-white"
            onClick={(e) => handleCopy(e, color)}
            title={`Copiar código ${color}`}
          >
            {/* Overlay sutil em hover com ícones de copiar e check */}
            <div className="absolute inset-0 bg-black/0 opacity-0 group-hover/swatch:bg-black/10 group-hover/swatch:opacity-100 transition-all flex items-center justify-center">
              {copiedColor === color ? (
                <Check className="h-5 w-5 drop-shadow text-emerald-400 stroke-[3]" />
              ) : (
                <Copy className="h-4 w-4 drop-shadow text-white opacity-90" />
              )}
            </div>
            
            {/* Exibe o código HEX em hover no topo do bloco de cor */}
            <span className="absolute bottom-2 font-mono text-[9px] font-bold opacity-0 group-hover/swatch:opacity-100 tracking-wider text-white bg-black/40 px-1 py-0.5 rounded backdrop-blur-sm pointer-events-none">
              {color}
            </span>
          </div>
        ))}
      </div>

      {/* Área de Conteúdo do Cartão */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Título e Tag de Estilo */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-sans font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors text-base line-clamp-1">
            {palette.name}
          </h3>
          <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border ${styleColors[palette.style] || styleColors.moderna}`}>
            {palette.style}
          </span>
        </div>

        {/* Emoções despertadas mapeadas */}
        <div className="flex flex-wrap gap-1 mb-4">
          {palette.emotions.map((emotion) => (
            <span
              key={emotion}
              className="text-[10px] text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded-md border border-zinc-100 lowercase"
            >
              {emotion}
            </span>
          ))}
        </div>

        {/* Rodapé do cartão com códigos hexadecimais legíveis por extenso e ícone de visualização */}
        <div className="mt-auto pt-3 border-t border-zinc-50 flex items-center justify-between text-zinc-400">
          <div className="flex gap-1.5 font-mono text-[10px] text-zinc-500 font-medium">
            {palette.colors.slice(0, 4).map((c) => (
              <span key={c} className="hover:text-indigo-600 transition" onClick={(e) => handleCopy(e, c)}>
                {c.toUpperCase()}
              </span>
            ))}
            {palette.colors.length > 4 && <span className="text-[9px] text-zinc-400">+1</span>}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(palette.id);
            }}
            className="flex items-center gap-1 rounded p-1 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition"
            title="Visualizar Detalhes"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
