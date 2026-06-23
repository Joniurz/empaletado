import { useState } from 'react';
import { QuizAnswers, RecommendationResult } from '../types';
import { getRecommendation } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  BookOpen,
  Users,
  Eye,
  Copy,
  LayoutDashboard,
  Gem,
  MousePointerClick,
  FileCheck
} from 'lucide-react';
import PaletteCard from './PaletteCard';

interface BrandQuizProps {
  onSelectPalette: (id: string) => void;
  onCopySuccess: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export default function BrandQuiz({ onSelectPalette, onCopySuccess }: BrandQuizProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers>({
    brandName: '',
    segment: '',
    personality: {
      playfulSerious: 3,
      traditionalInnovative: 3,
      accessiblePremium: 3
    },
    emotions: [],
    audience: 'genz_millennials'
  });

  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const totalSteps = 4;

  const handleCopyHex = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    onCopySuccess(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!answers.brandName.trim()) {
        onCopySuccess('Por favor, informe o nome da sua marca.', 'error');
        return;
      }
      if (!answers.segment) {
        onCopySuccess('Por favor, selecione o setor de atuação.', 'error');
        return;
      }
    }
    if (step === 3 && answers.emotions.length === 0) {
      onCopySuccess('Por favor, selecione pelo menos uma emoção principal.', 'error');
      return;
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleEmotionToggle = (emotion: string) => {
    setAnswers((prev) => {
      const exists = prev.emotions.includes(emotion);
      if (exists) {
        return { ...prev, emotions: prev.emotions.filter((e) => e !== emotion) };
      } else {
        // limit to 3 emotions
        if (prev.emotions.length >= 3) {
          onCopySuccess('Selecione no máximo 3 emoções.', 'error');
          return prev;
        }
        return { ...prev, emotions: [...prev.emotions, emotion] };
      }
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate beautiful matrix lookup latency
    setTimeout(() => {
      const rec = getRecommendation(answers);
      setResult(rec);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({
      brandName: '',
      segment: '',
      personality: {
        playfulSerious: 3,
        traditionalInnovative: 3,
        accessiblePremium: 3
      },
      emotions: [],
      audience: 'genz_millennials'
    });
    setResult(null);
  };

  // Lists of options
  const segmentsList = [
    { value: 'tech', label: 'Tecnologia & Software' },
    { value: 'health', label: 'Saúde & Bem-estar' },
    { value: 'finance', label: 'Finanças & Seguros' },
    { value: 'retail', label: 'Varejo & E-commerce' },
    { value: 'education', label: 'Educação & Ensino' },
    { value: 'creative', label: 'Design & Criativo' }
  ];

  const emotionsList = [
    { value: 'confiança', label: 'Confiança', desc: 'Segurança, credibilidade e solidez.' },
    { value: 'energia', label: 'Energia', desc: 'Atitude, dinamismo e velocidade.' },
    { value: 'tranquilidade', label: 'Tranquilidade', desc: 'Paz, serenidade e harmonia.' },
    { value: 'inovação', label: 'Inovação', desc: 'Futuro, novidade e pioneirismo.' },
    { value: 'alegria', label: 'Alegria', desc: 'Entusiasmo, leveza e otimismo.' },
    { value: 'sofisticação', label: 'Sofisticação', desc: 'Luxo, elegância e exclusividade.' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-10 w-full flex flex-col items-center">
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="w-12 h-12 rounded-full border-4 border-zinc-200 border-t-indigo-600 mb-6"
          />
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Analisando arquétipos visuais...</h2>
          <p className="text-sm text-zinc-500 mt-2 max-w-sm">
            Mapeando as preferências cromáticas mais adequadas ao perfil da marca.
          </p>
        </div>
      )}

      {!result ? (
        /* QUIZ WIZARD */
        <div className="w-full max-w-2xl bg-white border border-zinc-150 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Progress Indicator */}
          <div className="mb-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-100 -z-10 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-[1px] bg-indigo-600 transition-all duration-300 -z-10 -translate-y-1/2"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
            <div className="flex justify-between items-center w-full">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center gap-1.5 relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-colors ${
                      s < step
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : s === step
                        ? 'bg-white border-indigo-600 text-indigo-600 shadow'
                        : 'bg-white border-zinc-200 text-zinc-400'
                    }`}
                  >
                    {s < step ? <Check className="h-4 w-4 stroke-[3]" /> : s}
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider hidden sm:block ${
                      s === step ? 'text-indigo-600' : 'text-zinc-400'
                    }`}
                  >
                    {s === 1 ? 'Básico' : s === 2 ? 'Personalidade' : s === 3 ? 'Emoção' : 'Público'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Step Contents */}
          <div className="min-h-[280px] flex flex-col justify-between">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-1">Sobre a sua marca</h2>
                  <p className="text-xs text-zinc-500">
                    Defina o básico. Qual é o nome comercial e o segmento de negócios onde sua marca atua?
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                      Nome da Marca
                    </label>
                    <input
                      type="text"
                      value={answers.brandName}
                      onChange={(e) => setAnswers({ ...answers, brandName: e.target.value })}
                      placeholder="Ex: Acme Corp ou Studio Alfa"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                      id="quiz-brand-name"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                      Setor de Atuação
                    </label>
                    <div className="relative">
                      <select
                        value={answers.segment}
                        onChange={(e) => setAnswers({ ...answers, segment: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-950 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition appearance-none cursor-pointer"
                        id="quiz-brand-segment"
                      >
                        <option value="" disabled>
                          Selecione um setor comercial...
                        </option>
                        {segmentsList.map((seg) => (
                          <option key={seg.value} value={seg.value}>
                            {seg.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 font-bold text-xs">
                        &darr;
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-1">Traços de Personalidade</h2>
                  <p className="text-xs text-zinc-500">
                    Ajuste os controles deslizantes para definir como sua marca se posiciona na escala visual.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Slider 1 */}
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      <span>Lúdico / Alegre</span>
                      <span>Sério / Corporativo</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={answers.personality.playfulSerious}
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          personality: { ...answers.personality, playfulSerious: parseInt(e.target.value) }
                        })
                      }
                      className="w-full h-1.5 bg-zinc-150 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1 px-1">
                      <span>Inovação criativa</span>
                      <span>Neutralidade corporativa</span>
                    </div>
                  </div>

                  {/* Slider 2 */}
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      <span>Tradicional / Conservador</span>
                      <span>Inovador / Futurista</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={answers.personality.traditionalInnovative}
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          personality: { ...answers.personality, traditionalInnovative: parseInt(e.target.value) }
                        })
                      }
                      className="w-full h-1.5 bg-zinc-150 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1 px-1">
                      <span>Herança e Confiança</span>
                      <span>Disrupção tecnológica</span>
                    </div>
                  </div>

                  {/* Slider 3 */}
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      <span>Acessível / Popular</span>
                      <span>Premium / Alta Costura</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={answers.personality.accessiblePremium}
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          personality: { ...answers.personality, accessiblePremium: parseInt(e.target.value) }
                        })
                      }
                      className="w-full h-1.5 bg-zinc-150 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1 px-1">
                      <span>Comunitário e Direto</span>
                      <span>Exclusividade e Status</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-1">Emoção Principal</h2>
                  <p className="text-xs text-zinc-500">
                    Como você quer que seu cliente se sinta quando vê sua marca? Escolha de 1 a 3 emoções.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {emotionsList.map((emo) => {
                    const isSelected = answers.emotions.includes(emo.value);
                    return (
                      <div
                        key={emo.value}
                        onClick={() => handleEmotionToggle(emo.value)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-300 shadow-sm'
                            : 'bg-white border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold capitalize ${isSelected ? 'text-indigo-700' : 'text-zinc-800'}`}>
                            {emo.value}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-zinc-300'
                            }`}
                          >
                            {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-snug">{emo.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-1">Público-Alvo</h2>
                  <p className="text-xs text-zinc-500">
                    Quem é o grupo demográfico principal que consome seu serviço ou produto?
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-4 p-4 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50/50 transition">
                    <input
                      type="radio"
                      name="audience"
                      value="genz_millennials"
                      checked={answers.audience === 'genz_millennials'}
                      onChange={() => setAnswers({ ...answers, audience: 'genz_millennials' })}
                      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-800">Gen Z &amp; Millennials</span>
                      <span className="text-[10px] text-zinc-400 mt-1 leading-normal">
                        Jovens altamente conectados, nativos digitais, priorizam marcas ousadas, inovação e autenticidade visual.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50/50 transition">
                    <input
                      type="radio"
                      name="audience"
                      value="professionals_b2b"
                      checked={answers.audience === 'professionals_b2b'}
                      onChange={() => setAnswers({ ...answers, audience: 'professionals_b2b' })}
                      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-800">Profissionais &amp; B2B</span>
                      <span className="text-[10px] text-zinc-400 mt-1 leading-normal">
                        Segmento sério focado em eficiência, autoridade, processos robustos e apresentações de dados limpas.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50/50 transition">
                    <input
                      type="radio"
                      name="audience"
                      value="general_family"
                      checked={answers.audience === 'general_family'}
                      onChange={() => setAnswers({ ...answers, audience: 'general_family' })}
                      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-800">Público Geral / Familiar</span>
                      <span className="text-[10px] text-zinc-400 mt-1 leading-normal">
                        Público geral de grande alcance. Prioriza estabilidade, clareza, confiança familiar e usabilidade simples.
                      </span>
                    </div>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Form actions */}
            <div className="mt-10 pt-6 border-t border-zinc-100 flex justify-between items-center gap-4">
              {step > 1 ? (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-200 bg-white text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-sm shadow-indigo-600/5"
                  id="quiz-btn-next"
                >
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-indigo-600 text-sm font-bold text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-600/15"
                  id="quiz-btn-submit"
                >
                  <Sparkles className="h-4.5 w-4.5 text-white/90" />
                  Gerar paleta ideal
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* RESULTS VIEW */
        <div className="w-full flex flex-col items-center">
          {/* Intro recommended header */}
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h1 className="font-sans text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Paleta Recomendada
            </h1>
            <p className="font-sans text-sm text-zinc-500 mt-2">
              Com base no seu perfil corporativo, selecionamos as diretrizes cromáticas ideais.
            </p>
          </div>

          {/* Main Hero Palette Box with full explanation */}
          <div className="w-full bg-white border border-zinc-150 rounded-2xl p-6 sm:p-10 shadow-sm mb-16 flex flex-col md:flex-row gap-8 items-stretch">
            {/* Visual Swatch blocks */}
            <div className="flex-1 min-h-[220px] flex flex-col justify-between">
              <div className="h-40 flex rounded-xl overflow-hidden border border-zinc-150 shadow-sm">
                {result.recommendedPalette.colors.map((color, index) => (
                  <div
                    key={`${color}-rec-${index}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleCopyHex(color)}
                    className="group relative flex-grow cursor-pointer flex items-center justify-center transition-all hover:flex-grow-[1.3]"
                    title="Copiar código HEX"
                  >
                    <div className="absolute inset-0 bg-black/0 opacity-0 group-hover:bg-black/15 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      {copiedColor === color ? (
                        <Check className="h-5 w-5 text-emerald-400 stroke-[3] drop-shadow" />
                      ) : (
                        <Copy className="h-4 w-4 text-white drop-shadow opacity-90" />
                      )}
                    </div>
                    <span className="absolute bottom-2 font-mono text-[9px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {color}
                    </span>
                  </div>
                ))}
              </div>

              {/* Show hex values listed horizontally with labels */}
              <div className="mt-4 flex flex-wrap justify-between gap-4">
                {result.recommendedPalette.colors.map((color, index) => (
                  <button
                    key={`${color}-lbl-${index}`}
                    onClick={() => handleCopyHex(color)}
                    className="flex flex-col items-start gap-1 p-1 hover:bg-zinc-50 rounded transition"
                  >
                    <span className="text-[10px] font-bold text-zinc-400 tracking-wider">
                      {result.recommendedPalette.colorNames && result.recommendedPalette.colorNames[index]
                        ? result.recommendedPalette.colorNames[index]
                        : `COR ${index + 1}`}
                    </span>
                    <span className="font-mono text-xs font-semibold text-zinc-700">{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation card */}
            <div className="md:w-96 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-100 pt-6 md:pt-0 md:pl-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <FileCheck className="h-4 w-4 text-indigo-600" />
                  Psicologia das Cores
                </h3>
                <h4 className="font-sans font-bold text-lg text-zinc-950 mb-3">
                  {result.recommendedPalette.name}
                </h4>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed mb-6">
                  {result.explanation}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onSelectPalette(result.recommendedPalette.id)}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition text-center"
                >
                  Ver Paleta Completa
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-2.5 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition"
                  title="Recomeçar teste"
                >
                  <RotateCcw className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ACTIVE USE SIMULATION SECTION */}
          <div className="w-full mb-16">
            <h2 className="font-sans text-2xl font-black text-zinc-950 tracking-tight mb-8 text-center sm:text-left">
              Simulações Ativas de Uso
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Widget Simulation (Dashboard mockup) */}
              <div className="bg-white rounded-2xl p-6 border border-zinc-150 shadow-sm flex flex-col items-center justify-center min-h-[380px]">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard UI
                </span>

                {/* Simulated UI using palette usage colors */}
                <div
                  className="w-full max-w-sm rounded-xl overflow-hidden shadow-md border"
                  style={{
                    backgroundColor: result.recommendedPalette.usage.primary,
                    borderColor: result.recommendedPalette.colors[1]
                  }}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-mono font-bold tracking-widest text-white/50">FINANCE ACTIVE</span>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: result.recommendedPalette.usage.accent }} />
                    </div>
                    <div className="mb-6">
                      <span className="text-2xl font-bold text-white block">$48,250.00</span>
                      <span className="text-[10px] text-white/70 block mt-1">Margem de lucro recomendada</span>
                    </div>

                    {/* Progress Bar mockup */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-white/80 font-mono">
                        <span>Progresso do Projeto</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: '80%',
                            backgroundColor: result.recommendedPalette.usage.secondary
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 px-5 py-3 flex justify-between items-center border-t border-white/10">
                    <span className="text-[9px] text-white/50">Atualizado agora há pouco</span>
                    <button
                      className="text-[10px] font-bold px-3 py-1 rounded transition text-white"
                      style={{ backgroundColor: result.recommendedPalette.usage.accent }}
                      onClick={() => onCopySuccess('Visualização de card ativo simulada com sucesso!', 'info')}
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>

              {/* Logo Brandmark Simulation */}
              <div className="bg-white rounded-2xl p-6 border border-zinc-150 shadow-sm flex flex-col items-center justify-center min-h-[380px]">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
                  <Gem className="h-3.5 w-3.5" />
                  Marca &amp; Logo
                </span>

                {/* Dynamic abstract logo using recommended colors */}
                <div
                  className="w-40 h-40 rounded-full flex items-center justify-center relative shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${result.recommendedPalette.usage.primary} 0%, ${
                      result.recommendedPalette.colors[1] || result.recommendedPalette.colors[0]
                    } 100%)`
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center transition-transform hover:rotate-90 duration-500"
                    style={{
                      backgroundColor: result.recommendedPalette.usage.secondary,
                      transform: 'rotate(45deg)'
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: result.recommendedPalette.usage.background }}
                    />
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h4 className="text-sm font-black text-zinc-950 uppercase tracking-wider">{answers.brandName}</h4>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                    {result.recommendedPalette.name}
                  </span>
                </div>
              </div>

              {/* Components / Typography Mockup */}
              <div className="bg-white rounded-2xl p-6 border border-zinc-150 shadow-sm flex flex-col items-center justify-center min-h-[380px]">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
                  <MousePointerClick className="h-3.5 w-3.5" />
                  Componentes Web
                </span>

                <div className="w-full max-w-sm rounded-xl p-6 border border-zinc-150 bg-zinc-50">
                  <h3 className="font-sans font-extrabold text-base mb-2" style={{ color: result.recommendedPalette.usage.primary }}>
                    Começar do Zero
                  </h3>
                  <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                    Sua marca agora conta com cores validadas. Use estes botões ativos para testar a harmonia e contraste.
                  </p>

                  <div className="flex flex-col gap-2.5">
                    {/* Primary actions button dynamically colored */}
                    <button
                      className="w-full py-2.5 rounded-lg text-xs font-bold text-white transition hover:opacity-95 shadow-sm active:scale-98"
                      style={{ backgroundColor: result.recommendedPalette.usage.secondary }}
                      onClick={() => onCopySuccess('Clique do botão primário simulado com sucesso!', 'info')}
                    >
                      Ação Primária
                    </button>

                    {/* Accent button */}
                    <button
                      className="w-full py-2.5 rounded-lg text-xs font-bold text-white transition hover:opacity-95 active:scale-98"
                      style={{ backgroundColor: result.recommendedPalette.usage.accent }}
                      onClick={() => onCopySuccess('Clique do botão de destaque simulado com sucesso!', 'info')}
                    >
                      Destaque de Seção
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ALTERNATIVE RECOMENDATIONS */}
          <div className="w-full">
            <h3 className="font-sans text-xl font-black text-zinc-950 tracking-tight mb-6">
              Paletas Alternativas Recomendadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.alternatives.map((altPalette) => (
                <div
                  key={altPalette.id}
                  className="bg-white border border-zinc-150 rounded-xl overflow-hidden shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => onSelectPalette(altPalette.id)}
                >
                  <div className="flex h-20 w-full bg-zinc-50">
                    {altPalette.colors.map((c, i) => (
                      <div key={`${c}-alt-${i}`} style={{ backgroundColor: c }} className="flex-grow" />
                    ))}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-zinc-950">{altPalette.name}</span>
                      <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">{altPalette.style}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 line-clamp-2 leading-normal">
                      {altPalette.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 bg-white text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition"
              >
                <RotateCcw className="h-4 w-4" />
                Refazer Questionário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
