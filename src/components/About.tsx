import { Compass, ShieldCheck, Scale, Award, Database, RefreshCw } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 sm:px-8 py-12 w-full">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Manifesto de Precisão
        </span>
        <h1 className="font-sans text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mt-4 mb-3">
          Sobre o Empaletado
        </h1>
        <p className="font-sans text-sm text-zinc-500 leading-relaxed">
          Uma plataforma de alta fidelidade desenhada para servir como um canvas neutro e científico de exploração de cores de marca.
        </p>
      </div>

      {/* Grid of values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 rounded-2xl border border-zinc-150 bg-white">
          <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl inline-flex mb-4">
            <Scale className="h-5 w-5" />
          </div>
          <h3 className="font-sans font-bold text-zinc-900 text-sm mb-2">Curadoria de Alta Precisão</h3>
          <p className="font-sans text-xs text-zinc-500 leading-relaxed">
            Nossa plataforma utiliza um mapeamento de cores sofisticado e consistente. As sugestões provêm de uma estrutura lógica fundamentada nos princípios consagrados da psicologia e do design de marca.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-150 bg-white">
          <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl inline-flex mb-4">
            <Compass className="h-5 w-5" />
          </div>
          <h3 className="font-sans font-bold text-zinc-900 text-sm mb-2">Canvas como Interface</h3>
          <p className="font-sans text-xs text-zinc-500 leading-relaxed">
            Acreditamos que para exibir cores de maneira fiel, a interface deve sumir. Nosso design adota tons monocromáticos de fundo e alto contraste para que as cores da sua marca sejam as protagonistas absolutas.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-150 bg-white">
          <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl inline-flex mb-4">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-sans font-bold text-zinc-900 text-sm mb-2">Fidelidade Cromática</h3>
          <p className="font-sans text-xs text-zinc-500 leading-relaxed">
            Exibimos e exportamos os códigos nos formatos HEX, RGB e HSL. As cores são analisadas sob padrões de legibilidade e acessibilidade de interface (WCAG), oferecendo papéis de uso recomendados estruturados.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-150 bg-white">
          <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl inline-flex mb-4">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-sans font-bold text-zinc-900 text-sm mb-2">Soberania dos Dados</h3>
          <p className="font-sans text-xs text-zinc-500 leading-relaxed">
            Todo o processamento é feito localmente no lado do cliente. Sem necessidade de logins, banco de dados remoto ou conexão de rede para as consultas. Rápido, offline-first e seguro por padrão.
          </p>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="border border-zinc-150 rounded-2xl bg-zinc-50 p-6 sm:p-8">
        <h3 className="font-sans font-bold text-zinc-900 text-sm mb-3 flex items-center gap-2">
          <Database className="h-4.5 w-4.5 text-indigo-600" />
          Nossa Metodologia de Cores
        </h3>
        <p className="font-sans text-xs text-zinc-500 leading-relaxed">
          O Empaletado foi construído para servir como uma ferramenta de apoio visual baseada em ciência prática. Mapeamos os setores de atuação, os arquétipos de personalidade de marca (lúdico vs. sério, tradicional vs. inovador, acessível vs. premium) e os sentimentos que a marca deseja despertar. A união desses fatores resulta na seleção de paletas precisas que oferecem os melhores índices de harmonia cromática e contraste de interface, prontas para as suas necessidades de comunicação visual.
        </p>
      </div>
    </div>
  );
}
