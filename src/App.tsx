/**
 * @file App.tsx
 * @description Componente raiz da aplicação Empaletado.
 * Controla os estados de navegação entre as diferentes seções (LandingPage, Explorer, Quiz, Detail),
 * armazena o histórico da tela de origem para permitir retrocessos consistentes,
 * e gerencia o sistema flutuante de notificações (Toasts) de cópia de cores.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Explorer from './components/Explorer';
import BrandQuiz from './components/BrandQuiz';
import PaletteDetail from './components/PaletteDetail';
import { Check, AlertCircle, Info } from 'lucide-react';

export default function App() {
  // Estado para controlar qual seção/view está ativa na tela
  const [currentView, setCurrentView] = useState<'landing' | 'explorer' | 'quiz' | 'detail'>('landing');
  
  // ID da paleta selecionada para exibição na tela de detalhes
  const [selectedPaletteId, setSelectedPaletteId] = useState<string | null>(null);
  
  // Rastreia a tela anterior para onde o botão "Voltar" na página de detalhes deve redirecionar
  const [previousView, setPreviousView] = useState<'landing' | 'explorer' | 'quiz'>('landing');
  
  // Estado local para armazenar e enfileirar as notificações (Toast)
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' | 'error' }[]>([]);

  // Sempre rola a janela para o topo de forma suave ao mudar de aba/seção
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  /**
   * Trata a navegação genérica entre as views da SPA.
   * Armazena a seção anterior como histórico para retorno inteligente.
   */
  const handleNavigate = (view: 'landing' | 'explorer' | 'quiz' | 'detail') => {
    if (view !== 'detail') {
      setPreviousView(currentView as any);
    }
    setCurrentView(view);
  };

  /**
   * Trata a seleção de paleta para direcionamento imediato para a tela de detalhes.
   */
  const handleSelectPalette = (paletteId: string) => {
    setSelectedPaletteId(paletteId);
    setPreviousView(currentView as any);
    setCurrentView('detail');
  };

  /**
   * Callback acionado de qualquer seção quando uma notificação deve ser exibida.
   * Suporta formatos cromáticos ou mensagens genéricas de sucesso, info ou erro.
   */
  const handleCopySuccess = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    const displayMessage = 
      (message.startsWith('#') || message.startsWith('rgb') || message.startsWith('hsl')) && !message.includes(' ')
        ? `Código de cor "${message.toUpperCase()}" copiado!`
        : message;

    setToasts((prev) => [...prev, { id, message: displayMessage, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  /**
   * Renderizador condicional de visualização.
   * Seleciona o componente correspondente com base no estado de rota ativa.
   */
  const renderViewContent = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onNavigate={handleNavigate}
            onSelectPalette={handleSelectPalette}
            onCopySuccess={handleCopySuccess}
          />
        );
      case 'explorer':
        return (
          <Explorer
            onSelectPalette={handleSelectPalette}
            onCopySuccess={handleCopySuccess}
          />
        );
      case 'quiz':
        return (
          <BrandQuiz
            onSelectPalette={handleSelectPalette}
            onCopySuccess={handleCopySuccess}
          />
        );
      case 'detail':
        return selectedPaletteId ? (
          <PaletteDetail
            paletteId={selectedPaletteId}
            onBack={() => setCurrentView(previousView)}
            onSelectPalette={handleSelectPalette}
            onCopySuccess={handleCopySuccess}
          />
        ) : (
          <Explorer
            onSelectPalette={handleSelectPalette}
            onCopySuccess={handleCopySuccess}
          />
        );
      default:
        return (
          <LandingPage
            onNavigate={handleNavigate}
            onSelectPalette={handleSelectPalette}
            onCopySuccess={handleCopySuccess}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Cabeçalho Fixo / Sticky */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* Viewport Principal com Transição Suave via Framer-Motion (AnimatePresence) */}
      <main className="flex-grow w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full flex justify-center"
          >
            {renderViewContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Rodapé Consistente */}
      <Footer onNavigate={handleNavigate} />

      {/* Painel Flutuante Fixo para Notificações (Toasts) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isError = toast.type === 'error';
            const isInfo = toast.type === 'info';
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex items-center gap-2.5 bg-zinc-900 text-white px-4.5 py-3 rounded-xl shadow-lg shadow-zinc-950/20 text-xs font-semibold pointer-events-auto border border-zinc-800"
              >
                {isError ? (
                  <div className="bg-rose-500 text-white p-1 rounded-full shrink-0">
                    <AlertCircle className="h-3 w-3 stroke-[3]" />
                  </div>
                ) : isInfo ? (
                  <div className="bg-indigo-500 text-white p-1 rounded-full shrink-0">
                    <Info className="h-3 w-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="bg-emerald-500 text-white p-1 rounded-full shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                )}
                <span>{toast.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
