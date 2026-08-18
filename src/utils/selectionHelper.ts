import { formatText, type StyleId } from './unicodeFormatter';

export interface SelectionState {
  start: number;
  end: number;
}

/**
 * Transforms full text or a specific selection range [selectionStart, selectionEnd]
 * within a text input string using the specified style.
 */
export function applyStyleToText(
  fullText: string,
  styleId: StyleId,
  selectionStart?: number,
  selectionEnd?: number
): { newText: string; newSelection: SelectionState } {
  // If no text, return empty
  if (!fullText) {
    return {
      newText: '',
      newSelection: { start: 0, end: 0 },
    };
  }

  const start = selectionStart ?? 0;
  const end = selectionEnd ?? 0;

  // Check if there is an active text selection
  if (start < end && start >= 0 && end <= fullText.length) {
    const selectedChunk = fullText.slice(start, end);
    const formattedChunk = formatText(selectedChunk, styleId);
    
    const newText =
      fullText.slice(0, start) +
      formattedChunk +
      fullText.slice(end);

    return {
      newText,
      newSelection: {
        start,
        end: start + formattedChunk.length,
      },
    };
  }

  // If no selection range, format the ENTIRE text
  const newText = formatText(fullText, styleId);
  return {
    newText,
    newSelection: {
      start: 0,
      end: newText.length,
    },
  };
}
