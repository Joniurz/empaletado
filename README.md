# Empaletado 🎨✨

**Empaletado** é uma plataforma digital de alta fidelidade e curadoria cromática projetada para auxiliar designers, desenvolvedores e criadores a encontrarem a harmonia de cores ideal para a identidade de suas marcas. 

Desenvolvida com foco em **fidelidade estética e precisão técnica**, a ferramenta remove ornamentos visuais desnecessários da interface, funcionando como um "canvas neutro" onde as cores são as protagonistas absolutas.

---

## 🚀 Principais Funcionalidades

1. **Catálogo Cromático Inteligente (Explorador):**
   - Filtragem avançada por **Estilo Visual** (*moderna, elegante, vibrante, minimalista*).
   - Filtragem por **Setor da Marca** (*tecnologia, saúde, finanças, varejo, educação, criativo*).
   - Filtragem por **Emoção Desejada** (*confiança, energia, tranquilidade, inovação, alegria, sofisticação*).
   - Barra de busca dinâmica em tempo real (busca por nome, hex ou tom de cor).
   - Paginação infinita via `IntersectionObserver` para navegação fluida.

2. **Gerador de Sugestões de Marca (Brand Quiz Wizard):**
   - Questionário interativo em 4 etapas detalhando a personalidade da marca.
   - Algoritmo **100% determinístico e reproduzível** baseado nos arquétipos clássicos do design de marca (Lúdico/Sério, Tradicional/Inovador, Acessível/Premium).
   - Geração de explicações detalhadas sobre a psicologia das cores recomendadas para o público-alvo informado.

3. **Visualização Detalhada de Alta Fidelidade:**
   - Detalhes de cores com conversões precisas para formatos **HEX, RGB** e **HSL**.
   - Cópia rápida de cores com feedback visual instantâneo (Toast notifications).
   - **Simuladores de Interface Ativos:** Veja como as cores se comportam em tempo real aplicadas a um *Painel de Vendas (Dashboard)*, um *Logotipo Abstrato* e *Componentes Web (Botões de Ação)*.
   - Carrossel de paletas correlacionadas para exploração horizontal.

---

## 🛠️ Arquitetura de Software

O projeto é construído sobre tecnologias modernas do ecossistema front-end para garantir carregamento instantâneo, responsividade impecável e animações fluidas:

*   **React 19 + TypeScript:** Tipagem estrita de dados e gerenciamento de estado previsível.
*   **Vite:** Ferramenta de build ultra-rápida.
*   **Tailwind CSS v4:** Estilização baseada em utilitários modernos e variáveis CSS nativas.
*   **Motion (f.k.a. Framer Motion):** Micro-animações premium e transições de página fluidas utilizando `AnimatePresence`.
*   **Lucide React:** Coleção de ícones vetoriais elegantes e consistentes.
*   **Offline-First / Client-Side:** Todas as regras e dados de paletas são computados diretamente no navegador do cliente, sem necessidade de consultas a servidores lentos ou bancos de dados externos.

---

## 📁 Estrutura de Diretórios

A estrutura do projeto é modular e segue boas práticas de separação de responsabilidades:

```text
├── src/
│   ├── components/            # Componentes reutilizáveis da interface de usuário
│   │   ├── BrandQuiz.tsx      # Questionário de marca e tela de resultados (Simulações/Psicologia)
│   │   ├── Explorer.tsx       # Painel de busca e catálogo com filtros avançados
│   │   ├── Footer.tsx         # Rodapé consistente com navegação de atalho
│   │   ├── Header.tsx         # Barra de navegação com logotipo vetorial dinâmico
│   │   ├── LandingPage.tsx    # Tela inicial com seções explicativas e paletas em destaque
│   │   ├── PaletteCard.tsx    # Cartão de amostragem rápida de paleta de cores
│   │   └── PaletteDetail.tsx  # Visão detalhada de paleta única, ferramentas de conversão e simulações
│   ├── data.ts                # Regras determinísticas e base de dados de mais de 280 paletas exclusivas
│   ├── index.css              # Ponto de entrada de estilo com importação do Tailwind CSS v4
│   ├── main.tsx               # Renderizador e bootstraper do React no DOM
│   ├── types.ts               # Tipagens e interfaces TypeScript para padronização dos dados
│   └── utils.ts               # Funções auxiliares para conversão cromática (HEX para RGB/HSL)
├── package.json               # Configurações de dependências e scripts do Node.js
├── vite.config.ts             # Configuração do Vite e plugins do compilador
└── index.html                 # Ponto de ancoragem HTML principal
```

---

## ⚙️ Execução e Desenvolvimento

Siga as instruções abaixo para executar o projeto localmente:

### Requisitos Próximos
*   [Node.js](https://nodejs.org) (versão 18 ou superior recomendado)
*   [npm](https://npmjs.com) ou gerenciador equivalente

### Instalar dependências
No diretório raiz do projeto, execute o comando para instalar as dependências necessárias listadas em `package.json`:
```bash
npm install
```

### Executar servidor de desenvolvimento
Inicie o servidor local configurado para rodar na porta 3000:
```bash
npm run dev
```
Abra o navegador no endereço [http://localhost:3000](http://localhost:3000) para ver a aplicação em tempo real com suporte a recarga rápida.

### Validar tipagens e código (Lint)
Para checar se existem erros de sintaxe ou de tipagem estrita do TypeScript, rode:
```bash
npm run lint
```

### Compilar para Produção (Build)
Para gerar os arquivos estáticos de produção otimizados e minificados no diretório `dist/`, execute:
```bash
npm run build
```

---

## 🎨 Princípios de Design Aplicados

*   **Tipografia Hierárquica:** Utilização de fontes modernas de sistema que fornecem legibilidade superior tanto no desktop quanto em telas móveis.
*   **Contraste WCAG:** Foco na distribuição correta entre cores de fundo, texto de suporte e botões de destaque, proporcionando acessibilidade natural.
*   **Ritmo Visual Ativo:** Variações intencionais de preenchimento (*padding*), margens e bordas arredondadas suavizadas para guiar o olhar do usuário pelas diferentes sessões de forma intuitiva.
