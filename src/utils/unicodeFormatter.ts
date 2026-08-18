/**
 * Bidirectional Unicode Text Formatting Engine for LinkedIn
 * Converts standard ASCII characters to Unicode Mathematical Alphanumeric Symbols
 * with full fallback safety and normalization.
 */

export type StyleId =
  | 'plain'
  | 'bold'
  | 'boldSans'
  | 'italic'
  | 'italicSans'
  | 'boldItalic'
  | 'boldItalicSans'
  | 'sans'
  | 'underline'
  | 'strikethrough'
  | 'boldUnderline'
  | 'boldStrikethrough'
  | 'script'
  | 'doublestruck'
  | 'fullwidth'
  | 'uppercase'
  | 'lowercase'
  | 'bulletList'
  | 'numberedList'
  | 'checklist'
  | 'ascendingList'
  | 'descendingList';

export interface StyleOption {
  id: StyleId;
  label: string;
  category: 'style' | 'decoration' | 'font' | 'transform' | 'list';
  sample: string;
  description: string;
}

export const STYLE_OPTIONS: StyleOption[] = [
  { id: 'bold', label: 'Bold Serif', category: 'style', sample: '𝐁𝐨𝐥𝐝 𝐒𝐞𝐫𝐢𝐟', description: 'Classic bold typography' },
  { id: 'boldSans', label: 'Bold Sans', category: 'style', sample: '𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀', description: 'Clean modern bold' },
  { id: 'italic', label: 'Italic Serif', category: 'style', sample: '𝐼𝑡𝑎𝑙𝑖𝑐 𝑆𝑒𝑟𝑖𝑓', description: 'Elegant slanted serif' },
  { id: 'italicSans', label: 'Italic Sans', category: 'style', sample: '𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴', description: 'Modern slanted sans' },
  { id: 'boldItalic', label: 'Bold Italic', category: 'style', sample: '𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄', description: 'Emphasis & strength' },
  { id: 'boldItalicSans', label: 'Bold Italic Sans', category: 'style', sample: '𝘽𝙤𝙡d 𝙄𝙩𝙖𝙡𝙞𝙘 𝙎𝙖𝙣𝙨', description: 'Dynamic modern style' },
  { id: 'sans', label: 'Sans-Serif', category: 'font', sample: '𝖲𝖺𝗇𝗌-𝖲𝖾𝗋𝗂𝖿', description: 'Minimalist clean font' },
  { id: 'underline', label: 'Underline', category: 'decoration', sample: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲', description: 'Subtle lower accent' },
  { id: 'strikethrough', label: 'Strikethrough', category: 'decoration', sample: 'S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶', description: 'Crossed-out text' },
  { id: 'boldUnderline', label: 'Bold Underline', category: 'decoration', sample: '𝐁̲𝐨̲𝐥̲𝐝̲ ̲𝐔̲𝐧̲𝐝̲e̲r̲l̲i̲n̲e̲', description: 'Bold with underline' },
  { id: 'boldStrikethrough', label: 'Bold Strikethrough', category: 'decoration', sample: '𝐁̶𝐨̶𝐥̶𝐝̶ ̶S̶t̶r̶i̶k̶e̶', description: 'Bold with cross-out' },
  { id: 'script', label: 'Cursive / Script', category: 'font', sample: '𝒮𝒸𝓇𝒾𝓅𝓉 𝐹𝑜𝓃𝓉', description: 'Handwritten calligraphy' },
  { id: 'doublestruck', label: 'Doublestruck', category: 'font', sample: '𝔻𝕠𝕦𝕓𝕝𝕖𝕤𝕥𝕣𝕦𝕔𝕜', description: 'Outline math style' },
  { id: 'fullwidth', label: 'Fullwidth', category: 'font', sample: 'Ｆｕｌｌｗｉｄｔｈ', description: 'Monospaced wide text' },
  { id: 'uppercase', label: 'UPPERCASE', category: 'transform', sample: 'UPPERCASE', description: 'All capital letters' },
  { id: 'lowercase', label: 'lowercase', category: 'transform', sample: 'lowercase', description: 'All small letters' },
  { id: 'bulletList', label: 'Bullet List', category: 'list', sample: '• Item', description: 'Bullet points' },
  { id: 'numberedList', label: 'Numbered List', category: 'list', sample: '1. Item', description: 'Sequential numbers' },
  { id: 'checklist', label: 'Checklist', category: 'list', sample: '☐ Task', description: 'Checkboxes' },
  { id: 'ascendingList', label: 'Ascending List', category: 'list', sample: '1. Short → Long', description: 'Sort lines by length (short to long)' },
  { id: 'descendingList', label: 'Descending List', category: 'list', sample: '1. Long → Short', description: 'Sort lines by length (long to short)' },
];

// Special Unicode codepoint exceptions for Mathematical Script & Doublestruck
const SCRIPT_EXCEPTIONS: Record<string, string> = {
  B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ',
  e: 'ℯ', g: 'ℊ', o: 'ℴ'
};

const DOUBLESTRUCK_EXCEPTIONS: Record<string, string> = {
  C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ'
};

/**
 * Maps a single ASCII character to a styled Unicode character.
 */
function charToStyle(ch: string, style: StyleId): string {
  if (!ch) return ch;
  const code = ch.charCodeAt(0);

  // Preserve newlines, carriage returns, tabs
  if (ch === '\n' || ch === '\r' || ch === '\t') return ch;

  try {
    switch (style) {
      case 'bold': {
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D400 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D41A + (code - 97));
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7CE + (code - 48));
        return ch;
      }
      case 'boldSans': {
        // Mathematical Sans-Serif Bold
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D5D4 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D5EE + (code - 97));
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7EC + (code - 48));
        return ch;
      }
      case 'italic': {
        if (ch === 'h') return 'ℎ';
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D434 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D44E + (code - 97));
        return ch;
      }
      case 'italicSans': {
        // Mathematical Sans-Serif Italic
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D608 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D622 + (code - 97));
        return ch;
      }
      case 'boldItalic': {
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D468 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D482 + (code - 97));
        return ch;
      }
      case 'boldItalicSans': {
        // Mathematical Sans-Serif Bold Italic
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D63C + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D656 + (code - 97));
        return ch;
      }
      case 'sans': {
        // Mathematical Sans-Serif Regular
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D5A0 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D5BA + (code - 97));
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7E2 + (code - 48));
        return ch;
      }
      case 'underline': {
        if (ch === ' ') return ' ';
        return ch + '\u0332';
      }
      case 'strikethrough': {
        if (ch === ' ') return ' ';
        return ch + '\u0336';
      }
      case 'boldUnderline': {
        const boldChar = charToStyle(ch, 'bold');
        if (ch === ' ') return ' ';
        return boldChar + '\u0332';
      }
      case 'boldStrikethrough': {
        const boldChar = charToStyle(ch, 'bold');
        if (ch === ' ') return ' ';
        return boldChar + '\u0336';
      }
      case 'script': {
        if (SCRIPT_EXCEPTIONS[ch]) return SCRIPT_EXCEPTIONS[ch];
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D49C + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4B6 + (code - 97));
        return ch;
      }
      case 'doublestruck': {
        if (DOUBLESTRUCK_EXCEPTIONS[ch]) return DOUBLESTRUCK_EXCEPTIONS[ch];
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D538 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D552 + (code - 97));
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7D8 + (code - 48));
        return ch;
      }
      case 'fullwidth': {
        if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xFEE0);
        if (ch === ' ') return '\u3000';
        return ch;
      }
      default:
        return ch;
    }
  } catch (err) {
    return ch;
  }
}

/**
 * Formats a text string using the specified style.
 * Normalizes input text first to plain ASCII to prevent broken surrogate pairs on repeated format calls.
 */
export function formatText(text: string, style: StyleId): string {
  if (!text) return text;

  // Step 1: Normalize input text to plain ASCII first to prevent broken surrogate pairs!
  const normalizedText = toPlainText(text);

  if (style === 'plain') {
    return normalizedText;
  }

  // Pure string transforms
  if (style === 'uppercase') return normalizedText.toUpperCase();
  if (style === 'lowercase') return normalizedText.toLowerCase();

  // List transforms applied line-by-line
  if (style === 'bulletList') {
    return normalizedText
      .split('\n')
      .map(line => (line.trim() ? `• ${line.replace(/^[•\-\*\d+\.\s]+/, '')}` : line))
      .join('\n');
  }

  if (style === 'numberedList') {
    let index = 1;
    return normalizedText
      .split('\n')
      .map(line => {
        if (line.trim()) {
          const cleaned = line.replace(/^[•\-\*\d+\.\s]+/, '');
          return `${index++}. ${cleaned}`;
        }
        return line;
      })
      .join('\n');
  }

  if (style === 'checklist') {
    return normalizedText
      .split('\n')
      .map(line => (line.trim() ? `☐ ${line.replace(/^([☐☑✓\[\]\s]+|[•\-\*\d+\.\s]+)/, '')}` : line))
      .join('\n');
  }

  if (style === 'ascendingList') {
    const lines = normalizedText.split('\n').filter(l => l.trim());
    lines.sort((a, b) => a.trim().length - b.trim().length);
    return lines.map((line, idx) => `${idx + 1}. ${line.replace(/^[•\-\*\d+\.\s]+/, '')}`).join('\n');
  }

  if (style === 'descendingList') {
    const lines = normalizedText.split('\n').filter(l => l.trim());
    lines.sort((a, b) => b.trim().length - a.trim().length);
    return lines.map((line, idx) => `${idx + 1}. ${line.replace(/^[•\-\*\d+\.\s]+/, '')}`).join('\n');
  }

  // Character-by-character transformation on Array.from(normalizedText)
  let result = '';
  for (const char of Array.from(normalizedText)) {
    result += charToStyle(char, style);
  }

  // Fallback check
  if (result.includes('\uFFFD')) {
    return normalizedText;
  }

  return result;
}

/**
 * Converts formatted Unicode text back to standard ASCII plain text.
 */
export function toPlainText(text: string): string {
  if (!text) return text;

  // Step 1: Strip combining characters like underline (\u0332) and strikethrough (\u0336)
  let cleaned = text.replace(/[\u0332\u0336]/g, '');

  // Step 2: Replace fullwidth space
  cleaned = cleaned.replace(/\u3000/g, ' ');

  // Step 3: Map known single-character exceptions
  const REVERSE_EXCEPTIONS: Record<string, string> = {
    'ℎ': 'h',
    'ℬ': 'B', 'ℰ': 'E', 'ℱ': 'F', 'ℋ': 'H', 'ℐ': 'I', 'ℒ': 'L', 'ℳ': 'M', 'ℛ': 'R',
    'ℯ': 'e', 'ℊ': 'g', 'ℴ': 'o',
    'ℂ': 'C', 'ℍ': 'H', 'ℕ': 'N', 'ℙ': 'P', 'ℚ': 'Q', 'ℝ': 'R', 'ℤ': 'Z',
  };

  let result = '';
  for (const char of Array.from(cleaned)) {
    if (REVERSE_EXCEPTIONS[char]) {
      result += REVERSE_EXCEPTIONS[char];
      continue;
    }

    const code = char.codePointAt(0) || 0;

    // Bold Serif
    if (code >= 0x1D400 && code <= 0x1D419) { result += String.fromCharCode(65 + (code - 0x1D400)); continue; }
    if (code >= 0x1D41A && code <= 0x1D433) { result += String.fromCharCode(97 + (code - 0x1D41A)); continue; }
    if (code >= 0x1D7CE && code <= 0x1D7D7) { result += String.fromCharCode(48 + (code - 0x1D7CE)); continue; }

    // Sans-Serif Regular
    if (code >= 0x1D5A0 && code <= 0x1D5B9) { result += String.fromCharCode(65 + (code - 0x1D5A0)); continue; }
    if (code >= 0x1D5BA && code <= 0x1D5D3) { result += String.fromCharCode(97 + (code - 0x1D5BA)); continue; }
    if (code >= 0x1D7E2 && code <= 0x1D7EB) { result += String.fromCharCode(48 + (code - 0x1D7E2)); continue; }

    // Sans-Serif Bold
    if (code >= 0x1D5D4 && code <= 0x1D5ED) { result += String.fromCharCode(65 + (code - 0x1D5D4)); continue; }
    if (code >= 0x1D5EE && code <= 0x1D607) { result += String.fromCharCode(97 + (code - 0x1D5EE)); continue; }
    if (code >= 0x1D7EC && code <= 0x1D7F5) { result += String.fromCharCode(48 + (code - 0x1D7EC)); continue; }

    // Italic Serif
    if (code >= 0x1D434 && code <= 0x1D44D) { result += String.fromCharCode(65 + (code - 0x1D434)); continue; }
    if (code >= 0x1D44E && code <= 0x1D467) { result += String.fromCharCode(97 + (code - 0x1D44E)); continue; }

    // Italic Sans
    if (code >= 0x1D608 && code <= 0x1D621) { result += String.fromCharCode(65 + (code - 0x1D608)); continue; }
    if (code >= 0x1D622 && code <= 0x1D63B) { result += String.fromCharCode(97 + (code - 0x1D622)); continue; }

    // Bold Italic Serif
    if (code >= 0x1D468 && code <= 0x1D481) { result += String.fromCharCode(65 + (code - 0x1D468)); continue; }
    if (code >= 0x1D482 && code <= 0x1D49B) { result += String.fromCharCode(97 + (code - 0x1D482)); continue; }

    // Bold Italic Sans
    if (code >= 0x1D63C && code <= 0x1D655) { result += String.fromCharCode(65 + (code - 0x1D63C)); continue; }
    if (code >= 0x1D656 && code <= 0x1D66F) { result += String.fromCharCode(97 + (code - 0x1D656)); continue; }

    // Fraktur / Gothic
    if (code >= 0x1D504 && code <= 0x1D51D) { result += String.fromCharCode(65 + (code - 0x1D504)); continue; }
    if (code >= 0x1D51E && code <= 0x1D537) { result += String.fromCharCode(97 + (code - 0x1D51E)); continue; }

    // Script / Cursive
    if (code >= 0x1D49C && code <= 0x1D4B5) { result += String.fromCharCode(65 + (code - 0x1D49C)); continue; }
    if (code >= 0x1D4B6 && code <= 0x1D4CF) { result += String.fromCharCode(97 + (code - 0x1D4B6)); continue; }

    // Doublestruck
    if (code >= 0x1D538 && code <= 0x1D551) { result += String.fromCharCode(65 + (code - 0x1D538)); continue; }
    if (code >= 0x1D552 && code <= 0x1D56B) { result += String.fromCharCode(97 + (code - 0x1D552)); continue; }
    if (code >= 0x1D7D8 && code <= 0x1D7E1) { result += String.fromCharCode(48 + (code - 0x1D7D8)); continue; }

    // Fullwidth
    if (code >= 0xFF01 && code <= 0xFF5E) { result += String.fromCharCode(code - 0xFEE0); continue; }

    // Unchanged fallback
    result += char;
  }

  return result;
}
