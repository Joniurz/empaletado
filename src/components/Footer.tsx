/**
 * @file Footer.tsx
 * @description Componente de rodapé da plataforma.
 * Oferece atalhos de navegação rápidos e consistentes para as diferentes seções da aplicação,
 * além do logotipo vetorial estilizado e créditos de direitos autorais.
 */

interface FooterProps {
  // Callback disparado ao solicitar uma mudança de visualização
  onNavigate: (view: 'landing' | 'explorer' | 'quiz' | 'detail') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full border-t border-zinc-100 bg-zinc-50 py-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo compactada e estilizada no rodapé */}
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 flex items-end justify-center pb-0.5">
              {/* Três paletas de cores empilhadas de forma harmônica */}
              <span className="absolute w-2 h-4.5 bg-rose-500 rounded-sm origin-bottom -rotate-[25deg] -translate-x-1 shadow-[1px_1px_2px_rgba(0,0,0,0.1)]"></span>
              <span className="absolute w-2 h-4.5 bg-indigo-600 rounded-sm origin-bottom rotate-0 z-10 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-x border-white/10"></span>
              <span className="absolute w-2 h-4.5 bg-amber-400 rounded-sm origin-bottom rotate-[25deg] translate-x-1 shadow-[-1px_1px_2px_rgba(0,0,0,0.1)]"></span>
            </div>
            <button
              onClick={() => onNavigate('landing')}
              className="font-sans font-extrabold text-sm tracking-tight text-zinc-900 hover:text-indigo-600 transition"
            >
              empa<span className="text-indigo-600">letado</span>
            </button>
          </div>

          {/* Copyrights da plataforma */}
          <p className="text-xs text-zinc-500 text-center md:text-left">
            &copy; 2026 Empaletado. Identidade Visual &bull; Canvas de Alta Precisão.
          </p>

          {/* Links de navegação auxiliares */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-500 font-medium">
            <button onClick={() => onNavigate('landing')} className="hover:text-indigo-600 transition">Início</button>
            <button onClick={() => onNavigate('explorer')} className="hover:text-indigo-600 transition">Explorar</button>
            <button onClick={() => onNavigate('quiz')} className="hover:text-indigo-600 transition">Sugestão de Marca</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
