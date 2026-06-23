/**
 * @file Explorer.tsx
 * @description Painel de exploração e filtragem de catálogo de paletas.
 * Contém filtros avançados baseados em estilo, setor e emoção, busca textual integrada,
 * suporte responsivo com painel deslizante (Drawer) para dispositivos móveis,
 * e paginação infinita baseada na API nativa do IntersectionObserver para performance superior.
 */

import { useState, useMemo, useEffect } from 'react';
import { Palette as PaletteType } from '../types';
import { PALETTES } from '../data';
import PaletteCard from './PaletteCard';
import { Search, Filter, SlidersHorizontal, RefreshCw, X } from 'lucide-react';

interface ExplorerProps {
  // Callback disparado ao selecionar uma paleta para exibir detalhes
  onSelectPalette: (id: string) => void;
  // Callback disparado após copiar com sucesso um HEX de cor
  onCopySuccess: (colorHex: string) => void;
}

export default function Explorer({
  onSelectPalette,
  onCopySuccess,
}: ExplorerProps) {
  // Estados para gerenciar a barra de pesquisa e filtros selecionados
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  
  // Controle de visibilidade do Drawer de filtros para mobile
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Contador para a paginação sob demanda (Infinite Scroll)
  const [visibleCount, setVisibleCount] = useState(12);

  // Tags disponíveis para compor as opções de filtros
  const stylesList = ['moderna', 'elegante', 'vibrante', 'minimalista'];
  const emotionsList = ['confiança', 'energia', 'tranquilidade', 'inovação', 'alegria', 'sofisticação'];
  const segmentsList = [
    { value: 'tech', label: 'Tecnologia' },
    { value: 'health', label: 'Saúde & Bem-estar' },
    { value: 'finance', label: 'Finanças' },
    { value: 'retail', label: 'Varejo & E-commerce' },
    { value: 'education', label: 'Educação' },
    { value: 'creative', label: 'Criativo' }
  ];

  /**
   * Lógica de Filtragem Baseada em Múltiplos Critérios.
   * Executada de forma memoizada para evitar recálculos caros em re-renderizações desnecessárias.
   */
  const filteredPalettes = useMemo(() => {
    return PALETTES.filter((p) => {
      // 1. Filtro por Busca de Texto (ignora espaços extras e caixa alta/baixa)
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        query === '' ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.colors.some((color) => color.toLowerCase().includes(query)) ||
        (p.colorNames && p.colorNames.some((name) => name.toLowerCase().includes(query)));

      // 2. Filtro por Estilo Visual
      const matchesStyle = selectedStyle === 'all' || p.style === selectedStyle;

      // 3. Filtro por Emoção Mapeada
      const matchesEmotion = selectedEmotion === 'all' || p.emotions.includes(selectedEmotion);

      // 4. Filtro por Segmento de Mercado
      const matchesSegment = selectedSegment === 'all' || p.segments.includes(selectedSegment);

      return matchesQuery && matchesStyle && matchesEmotion && matchesSegment;
    });
  }, [searchQuery, selectedStyle, selectedEmotion, selectedSegment]);

  // Reseta a paginação ao alterar qualquer critério de filtragem
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedStyle, selectedEmotion, selectedSegment]);

  // Verifica se ainda existem itens ocultos no catálogo filtrado
  const hasMore = visibleCount < filteredPalettes.length;

  /**
   * Efeito de Infinite Scroll acionado via IntersectionObserver nativo.
   * Evita botões de "Ver Mais" e otimiza o carregamento dinâmico sem prejudicar a performance.
   */
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Incrementa o número de itens visíveis quando o gatilho entra na viewport
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 12, filteredPalettes.length));
        }
      },
      { rootMargin: '250px' } // Ativa o carregamento de forma antecipada para suavidade
    );

    const target = document.getElementById('infinite-scroll-trigger');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasMore, filteredPalettes.length]);

  // Fatia o array filtrado contendo apenas o volume visível atual
  const displayedPalettes = useMemo(() => {
    return filteredPalettes.slice(0, visibleCount);
  }, [filteredPalettes, visibleCount]);

  // Função para limpar e redefinir todos os filtros de forma limpa
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStyle('all');
    setSelectedEmotion('all');
    setSelectedSegment('all');
  };

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-10 w-full">
      {/* Cabeçalho da Seção de Exploração */}
      <div className="mb-10 border-b border-zinc-100 pb-6">
        <h1 className="font-sans text-3xl font-black text-zinc-900 tracking-tight">
          Descubra Novas Cores
        </h1>
        <p className="font-sans text-sm text-zinc-500 mt-2 max-w-2xl">
          Explore galerias de alta fidelidade cromática para encontrar a harmonia de cores perfeita para o seu projeto.
        </p>
      </div>

      {/* Barra de Filtros Flutuante (Apenas para Mobile/Tablet) */}
      <div className="lg:hidden sticky top-20 z-20 bg-white/95 backdrop-blur-md py-3.5 border-b border-zinc-150 -mx-6 px-6 sm:-mx-8 sm:px-8 shadow-sm mb-6 flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nome, cor, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition"
            id="mobile-search-input"
          />
        </div>

        <button
          onClick={() => setShowMobileFilters(true)}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition shrink-0 shadow-sm"
        >
          <Filter className="h-3.5 w-3.5 text-indigo-600" />
          Filtrar
          {(selectedStyle !== 'all' || selectedEmotion !== 'all' || selectedSegment !== 'all') && (
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          )}
        </button>

        {(selectedStyle !== 'all' || selectedEmotion !== 'all' || selectedSegment !== 'all' || searchQuery !== '') && (
          <button
            onClick={resetFilters}
            className="p-2 text-zinc-500 hover:text-indigo-600 transition shrink-0"
            title="Limpar filtros"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Grid Geral da Aplicação */}
      <div className="flex flex-col lg:flex-row gap-8 items-start relative">

        {/* Sidebar Lateral Estática e Fixada (Apenas para Desktop / lg:block) */}
        <aside className="hidden lg:block w-72 shrink-0 border border-zinc-150 rounded-2xl bg-white p-6 sticky top-24 self-start shadow-sm">
          {/* Caixa de Busca Integrada */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por nome, cor, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 bg-white text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              id="desktop-search-input"
            />
          </div>

          <div className="flex justify-between items-center mb-5 pb-3 border-b border-zinc-100">
            <h2 className="text-xs font-bold tracking-tight text-zinc-900 flex items-center gap-1.5 uppercase">
              <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-600" />
              Filtros
            </h2>
            {(selectedStyle !== 'all' || selectedEmotion !== 'all' || selectedSegment !== 'all' || searchQuery !== '') && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition"
                title="Limpar filtros"
              >
                <RefreshCw className="h-2.5 w-2.5" />
                Limpar
              </button>
            )}
          </div>

          <div className="space-y-5">
            {/* Seletor de Estilo Visual */}
            <div>
              <h3 className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-2">Estilo Visual</h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setSelectedStyle('all')}
                  className={`text-left text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    selectedStyle === 'all'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Todos os Estilos
                </button>
                {stylesList.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`text-left text-xs font-semibold px-3 py-1.5 rounded-lg transition-all capitalize ${
                      selectedStyle === style
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Seletor de Segmento */}
            <div>
              <h3 className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-2">Setor da Marca</h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setSelectedSegment('all')}
                  className={`text-left text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    selectedSegment === 'all'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Todos os Setores
                </button>
                {segmentsList.map((seg) => (
                  <button
                    key={seg.value}
                    onClick={() => setSelectedSegment(seg.value)}
                    className={`text-left text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                      selectedSegment === seg.value
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    {seg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Seletor de Emoções */}
            <div>
              <h3 className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-2">Emoção Principal</h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setSelectedEmotion('all')}
                  className={`text-left text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    selectedEmotion === 'all'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Todas as Emoções
                </button>
                {emotionsList.map((emo) => (
                  <button
                    key={emo}
                    onClick={() => setSelectedEmotion(emo)}
                    className={`text-left text-xs font-semibold px-3 py-1.5 rounded-lg transition-all capitalize ${
                      selectedEmotion === emo
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Drawer Deslizante de Filtros (Mobile / Modal Overlay) */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
            <div className="w-80 bg-white h-full p-6 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-100">
                  <h2 className="text-sm font-bold tracking-tight text-zinc-900">Filtros</h2>
                  <button onClick={() => setShowMobileFilters(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Seletor Estilo Mobile */}
                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-3">Estilo Visual</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedStyle('all')}
                        className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all border ${
                          selectedStyle === 'all'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-white text-zinc-600 border-zinc-200'
                        }`}
                      >
                        Todos
                      </button>
                      {stylesList.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedStyle(style)}
                          className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all border capitalize ${
                            selectedStyle === style
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-white text-zinc-600 border-zinc-200'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seletor Segmento Mobile */}
                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-3">Setor da Marca</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedSegment('all')}
                        className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all border ${
                          selectedSegment === 'all'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-white text-zinc-600 border-zinc-200'
                        }`}
                      >
                        Todos
                      </button>
                      {segmentsList.map((seg) => (
                        <button
                          key={seg.value}
                          onClick={() => setSelectedSegment(seg.value)}
                          className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all border ${
                            selectedSegment === seg.value
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-white text-zinc-600 border-zinc-200'
                          }`}
                        >
                          {seg.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seletor Emoções Mobile */}
                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-3">Emoção Principal</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedEmotion('all')}
                        className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all border ${
                          selectedEmotion === 'all'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-white text-zinc-600 border-zinc-200'
                        }`}
                      >
                        Todas
                      </button>
                      {emotionsList.map((emo) => (
                        <button
                          key={emo}
                          onClick={() => setSelectedEmotion(emo)}
                          className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all border capitalize ${
                            selectedEmotion === emo
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-white text-zinc-600 border-zinc-200'
                          }`}
                        >
                          {emo}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition"
                >
                  Limpar
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grade de Exibição das Paletas (Resultados Filtrados) */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-semibold text-zinc-500">
              {filteredPalettes.length} {filteredPalettes.length === 1 ? 'paleta encontrada' : 'paletas encontradas'}
            </span>
          </div>

          {displayedPalettes.length > 0 ? (
            <>
              {/* Layout da Grade Grid Reutilizável */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedPalettes.map((palette) => (
                  <PaletteCard
                    key={palette.id}
                    palette={palette}
                    onSelect={onSelectPalette}
                    onCopySuccess={onCopySuccess}
                  />
                ))}
              </div>

              {/* Gatilho invisível para detecção de rolagem (Infinite Scroll) */}
              {hasMore && (
                <div id="infinite-scroll-trigger" className="h-20 w-full flex items-center justify-center mt-8">
                  <div className="flex items-center gap-2 text-zinc-500 font-sans text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce"></span>
                    <span className="ml-2">Carregando mais paletas...</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Estado Vazio de Busca / Sem correspondências */
            <div className="flex flex-col items-center justify-center text-center py-20 bg-zinc-50 border border-dashed border-zinc-200 rounded-2xl p-6">
              <p className="font-sans font-bold text-zinc-800 text-base mb-1">Nenhuma paleta encontrada</p>
              <p className="font-sans text-xs text-zinc-400 max-w-sm mb-6">
                Não encontramos correspondência para os filtros ou busca inserida. Tente limpar os filtros para começar novamente.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-all"
              >
                Resetar Filtros
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
