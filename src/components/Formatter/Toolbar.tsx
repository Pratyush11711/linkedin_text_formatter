import React from 'react';
import type { StyleId } from '../../utils/unicodeFormatter';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Type, 
  List, 
  ListOrdered, 
  CheckSquare, 
  RotateCcw,
  Sparkles,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronDown
} from 'lucide-react';

interface ToolbarProps {
  onApplyStyle: (styleId: StyleId) => void;
  onReset: () => void;
  hasSelection: boolean;
  selectedCharCount: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onApplyStyle,
  onReset,
  hasSelection,
  selectedCharCount,
}) => {
  return (
    <div className="bg-canvas border border-hairline rounded-xl p-3 shadow-2xs mb-4">
      
      {/* Selection Notification Banner */}
      {hasSelection && (
        <div className="mb-2.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-between text-xs text-ink font-mono animate-fadeIn">
          <span>
            ✨ <strong>Inline Formatting Mode:</strong> Applying style to {selectedCharCount} selected character{selectedCharCount > 1 ? 's' : ''}.
          </span>
          <span className="text-[10px] font-mono uppercase bg-accent/20 px-1.5 py-0.5 rounded text-accent">Range Active</span>
        </div>
      )}

      {/* Main Toolbar Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        
        {/* Left Toolbar Group: Main Quick Styles */}
        <div className="flex flex-wrap items-center gap-1.5">
          
          {/* Bold Serif */}
          <button
            type="button"
            onClick={() => onApplyStyle('bold')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Bold Serif: 𝐁𝐨𝐥𝐝"
          >
            <Bold className="w-3.5 h-3.5" />
            <span>Bold</span>
          </button>

          {/* Bold Sans */}
          <button
            type="button"
            onClick={() => onApplyStyle('boldSans')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Bold Sans-Serif: 𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀"
          >
            <span className="font-sans font-bold">𝗕</span>
            <span>Bold Sans</span>
          </button>

          {/* Italic Serif */}
          <button
            type="button"
            onClick={() => onApplyStyle('italic')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Italic Serif: 𝐼𝑡𝑎𝑙𝑖𝑐"
          >
            <Italic className="w-3.5 h-3.5" />
            <span>Italic</span>
          </button>

          {/* Italic Sans */}
          <button
            type="button"
            onClick={() => onApplyStyle('italicSans')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Italic Sans-Serif: 𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴"
          >
            <span className="italic font-sans">𝘐</span>
            <span>Italic Sans</span>
          </button>

          {/* Bold Italic */}
          <button
            type="button"
            onClick={() => onApplyStyle('boldItalic')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold italic text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Bold Italic Serif: 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄"
          >
            <span>𝑩𝑰</span>
            <span className="hidden sm:inline">Bold Italic</span>
          </button>

          {/* Bold Italic Sans */}
          <button
            type="button"
            onClick={() => onApplyStyle('boldItalicSans')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold italic text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Bold Italic Sans-Serif: 𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘 𝙎𝙖𝙣𝙨"
          >
            <span className="font-sans">𝘽𝙄</span>
            <span className="hidden md:inline">Bold Italic Sans</span>
          </button>

          {/* Sans */}
          <button
            type="button"
            onClick={() => onApplyStyle('sans')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Sans-Serif Font: 𝖲𝖺𝗇𝗌"
          >
            <span className="font-sans">𝖲</span>
            <span className="hidden sm:inline">Sans</span>
          </button>

          {/* Underline */}
          <button
            type="button"
            onClick={() => onApplyStyle('underline')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Underline: U̲n̲d̲e̲r̲l̲i̲n̲e̲"
          >
            <Underline className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Underline</span>
          </button>

          {/* Strikethrough */}
          <button
            type="button"
            onClick={() => onApplyStyle('strikethrough')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Strikethrough: S̶t̶r̶i̶k̶e̶"
          >
            <Strikethrough className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Strike</span>
          </button>

          {/* Bold Underline */}
          <button
            type="button"
            onClick={() => onApplyStyle('boldUnderline')}
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-bold underline text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Bold Underline: 𝐁̲𝐨̲𝐥̲𝐝̲"
          >
            <span>𝐁̲U̲</span>
          </button>

          {/* Bold Strikethrough */}
          <button
            type="button"
            onClick={() => onApplyStyle('boldStrikethrough')}
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-bold text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Bold Strikethrough: 𝐁̶𝐨̶𝐥̶𝐝̶"
          >
            <span>𝐁̶S̶</span>
          </button>

          {/* Script / Cursive */}
          <button
            type="button"
            onClick={() => onApplyStyle('script')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Script / Cursive: 𝒮𝒸𝓇𝒾𝓅𝓉"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Script</span>
          </button>

          {/* Doublestruck */}
          <button
            type="button"
            onClick={() => onApplyStyle('doublestruck')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Doublestruck Math Font: 𝔻𝕠𝕦𝕓𝕝𝕖"
          >
            <Type className="w-3.5 h-3.5" />
            <span>Doublestruck</span>
          </button>

          {/* Fullwidth */}
          <button
            type="button"
            onClick={() => onApplyStyle('fullwidth')}
            className="flex items-center gap-1 px-2 py-1.5 text-xs text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Fullwidth: Ｆｕｌｌ"
          >
            <span>Ｆｕｌｌ</span>
          </button>

          {/* Case Transforms Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            >
              <span>Case</span>
              <ChevronDown className="w-3 h-3 text-mute" />
            </button>
            <div className="absolute left-0 mt-1 hidden group-hover:block group-focus-within:block bg-canvas border border-hairline rounded-lg shadow-md p-1 z-30 min-w-[120px]">
              <button
                type="button"
                onClick={() => onApplyStyle('uppercase')}
                className="w-full text-left px-3 py-1.5 text-xs text-ink hover:bg-canvas-soft rounded-md font-mono uppercase cursor-pointer"
              >
                UPPERCASE
              </button>
              <button
                type="button"
                onClick={() => onApplyStyle('lowercase')}
                className="w-full text-left px-3 py-1.5 text-xs text-ink hover:bg-canvas-soft rounded-md font-mono lowercase cursor-pointer"
              >
                lowercase
              </button>
            </div>
          </div>

          {/* Separator */}
          <div className="h-4 w-px bg-hairline-strong mx-1 hidden sm:block"></div>

          {/* List Formatting Buttons with Clear Text Labels & Tooltips */}
          <button
            type="button"
            onClick={() => onApplyStyle('bulletList')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Bullet Points List: • Item"
          >
            <List className="w-3.5 h-3.5" />
            <span>Bullets</span>
          </button>

          <button
            type="button"
            onClick={() => onApplyStyle('numberedList')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Numbered List: 1. Item"
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Numbered</span>
          </button>

          <button
            type="button"
            onClick={() => onApplyStyle('checklist')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Checklist Box: ☐ Task"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Checklist</span>
          </button>

          <button
            type="button"
            onClick={() => onApplyStyle('ascendingList')}
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Ascending List: Sort lines from shortest to longest"
          >
            <ArrowUpNarrowWide className="w-3.5 h-3.5" />
            <span>Sort Short→Long</span>
          </button>

          <button
            type="button"
            onClick={() => onApplyStyle('descendingList')}
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-ink bg-canvas-soft hover:bg-hairline rounded-md transition-colors border border-hairline cursor-pointer"
            title="Descending List: Sort lines from longest to shortest"
          >
            <ArrowDownWideNarrow className="w-3.5 h-3.5" />
            <span>Sort Long→Short</span>
          </button>

        </div>

        {/* Right Group: Reset Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-md transition-colors cursor-pointer"
            title="Strip all Unicode formatting back to standard ASCII plain text"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Plain Text</span>
          </button>
        </div>

      </div>
    </div>
  );
};
