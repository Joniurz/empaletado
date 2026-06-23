/**
 * @file Header.tsx
 * @description Componente de cabeçalho persistente da aplicação.
 * Fornece a identidade visual da marca ("empaletado") com um logotipo de paleta geométrica
 * e navegação principal simplificada, de acordo com o escopo do usuário.
 */

import { Palette, Target } from 'lucide-react';

interface HeaderProps {
  // Controle de rota/visão ativa gerenciada pelo componente pai (App.tsx)
  currentView: 'landing' | 'explorer' | 'quiz' | 'detail';
  // Callback disparado ao solicitar uma mudança de visualização
  onNavigate: (view: 'landing' | 'explorer' | 'quiz' | 'detail') => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        
        {/* Logotipo da Marca com efeito 3D simulado por CSS e cores primárias */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3.5 transition hover:opacity-90"
          id="header-logo-btn"
        >
          <div className="relative w-9 h-9 flex items-end justify-center pb-1">
            {/* Leque de cores (Rosê, Indigo, Âmbar) simbolizando as misturas harmônicas */}
            <span className="absolute w-3 h-7 bg-rose-500 rounded-sm origin-bottom -rotate-[25deg] -translate-x-2 shadow-[1px_1px_3px_rgba(0,0,0,0.12)]"></span>
            <span className="absolute w-3 h-7 bg-indigo-600 rounded-sm origin-bottom rotate-0 z-10 shadow-[0_2px_4px_rgba(0,0,0,0.15)] border-x border-white/10"></span>
            <span className="absolute w-3 h-7 bg-amber-400 rounded-sm origin-bottom rotate-[25deg] translate-x-2 shadow-[-1px_1px_3px_rgba(0,0,0,0.12)]"></span>
          </div>
          <span className="font-sans font-black text-2xl tracking-tight text-zinc-900">
            empa<span className="text-indigo-600">letado</span>
          </span>
        </button>

        {/* Links de Navegação com fontes ampliadas (16px a 18px / text-base a text-lg) e espaçamento elegante */}
        <nav className="flex items-center gap-10">
          <button
            onClick={() => onNavigate('explorer')}
            className={`flex items-center gap-2 text-base sm:text-lg font-bold transition-colors ${
              currentView === 'explorer'
                ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1.5 pt-1.5'
                : 'text-zinc-600 hover:text-indigo-600 pb-1.5 pt-1.5'
            }`}
            id="nav-explorer-btn"
          >
            <Palette className="h-5 w-5" />
            Explorar Paletas
          </button>
          
          <button
            onClick={() => onNavigate('quiz')}
            className={`flex items-center gap-2 text-base sm:text-lg font-bold transition-colors ${
              currentView === 'quiz'
                ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1.5 pt-1.5'
                : 'text-zinc-600 hover:text-indigo-600 pb-1.5 pt-1.5'
            }`}
            id="nav-quiz-btn"
          >
            {/* Utiliza o ícone 'Target' para representar de forma assertiva o objetivo da sugestão */}
            <Target className="h-5 w-5" />
            Sugestão para Marca
          </button>
        </nav>

        {/* Espaçamento vazio responsivo para balancear horizontalmente a logo e as abas */}
        <div className="hidden md:block w-[150px]" />
      </div>
    </header>
  );
}
