/**
 * @file utils.ts
 * @description Funções utilitárias para conversão de formatos de cores (HEX para RGB e HSL).
 * Utilizado para fornecer informações cromáticas de alta fidelidade no detalhamento de cada paleta.
 */

/**
 * Converte um código hexadecimal de cor (#RRGGBB) para valores numéricos decimais RGB.
 * 
 * @param hex Código hexadecimal de cor (ex: "#4648D4" ou "4648D4")
 * @returns Objeto contendo os canais individuais r, g, b e uma representação textual legível.
 */
export function hexToRgb(hex: string) {
  // Remove o caractere '#' se houver, garantindo um padrão de 6 caracteres
  const normalized = hex.replace('#', '');
  
  // Extrai e converte cada par de caracteres hexadecimais de base 16 para base 10 (decimal)
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  
  return {
    r,
    g,
    b,
    str: `rgb(${r}, ${g}, ${b})`
  };
}

/**
 * Converte uma cor hexadecimal em valores HSL (Hue, Saturation, Lightness / Matiz, Saturação, Luminosidade).
 * É uma representação alternativa ideal para entender a distribuição de tom e luminosidade de uma cor.
 * 
 * @param hex Código hexadecimal de cor (ex: "#4648D4")
 * @returns Objeto contendo os valores calculados de h (0-360), s (0-100)%, l (0-100)% e uma string formatada.
 */
export function hexToHsl(hex: string) {
  // Primeiro converte para RGB para poder fazer o cálculo matemático
  let { r, g, b } = hexToRgb(hex);
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2; // Luminosidade é o valor médio dos extremos

  if (max !== min) {
    const d = max - min;
    // Calcula Saturação baseado no nível de luminosidade
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    // Determina o Matiz com base em qual canal de cor é dominante
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    str: `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
  };
}
