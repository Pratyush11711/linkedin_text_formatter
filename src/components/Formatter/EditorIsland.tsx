import React, { useState, useRef } from 'react';
import { Toolbar } from './Toolbar';
import { LinkedInPreview } from './LinkedInPreview';
import { StyleGrid } from './StyleGrid';
import { applyStyleToText } from '../../utils/selectionHelper';
import { toPlainText, type StyleId } from '../../utils/unicodeFormatter';
import { 
  ShieldCheck, 
  Copy, 
  Check, 
  Trash2, 
  Sparkles, 
  Eye, 
  Edit3,
  FileText
} from 'lucide-react';

const SAMPLE_POST = `🚀 Want to stand out on LinkedIn?

Standard plain text gets buried in the scroll.
Here is how you can use bold text, italic accents, and bullet lists to make your posts 100% readable:

• Highlight key stats and takeaways
• Structure your thoughts with clear formatting
• Drive higher engagement and clicks

Try selecting any word above and clicking a style button!`;

export const EditorIsland: React.FC = () => {
  const [text, setText] = useState<string>(SAMPLE_POST);
  const [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update selection indices on selection changes or clicks
  const handleSelect = () => {
    if (textareaRef.current) {
      setSelection({
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd,
      });
    }
  };

  const hasSelection = selection.end > selection.start;
  const selectedCharCount = selection.end - selection.start;

  // Apply style to selection range or full text
  const handleApplyStyle = (styleId: StyleId) => {
    const start = textareaRef.current ? textareaRef.current.selectionStart : selection.start;
    const end = textareaRef.current ? textareaRef.current.selectionEnd : selection.end;

    const { newText, newSelection } = applyStyleToText(text, styleId, start, end);
    setText(newText);

    // Refocus textarea and restore updated selection range after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newSelection.start, newSelection.end);
        setSelection(newSelection);
      }
    }, 0);
  };

  // One-click reset to plain ASCII text
  const handleResetToPlain = () => {
    const plain = toPlainText(text);
    setText(plain);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Clear text
  const handleClear = () => {
    setText('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Load sample post
  const handleLoadSample = () => {
    setText(SAMPLE_POST);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Copy full formatted text to clipboard
  const handleCopyPost = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      
      {/* Top Trust Signal Banner */}
      <div className="flex items-center justify-between bg-canvas-soft border border-hairline rounded-md px-4 py-2 mb-6 max-w-xl mx-auto shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-medium text-ink">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>100% Free • No Signup Required • Privacy First</span>
        </div>
        <span className="text-[11px] font-mono text-mute hidden sm:inline">
          Geist & Unicode Powered
        </span>
      </div>

      {/* Mobile Tab Switcher (Editor vs Preview) */}
      <div className="flex lg:hidden items-center justify-center gap-2 mb-4 bg-canvas-soft p-1.5 rounded-lg border border-hairline max-w-xs mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('editor')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
            activeTab === 'editor'
              ? 'bg-ink text-on-primary shadow-2xs'
              : 'text-body hover:text-ink'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
            activeTab === 'preview'
              ? 'bg-ink text-on-primary shadow-2xs'
              : 'text-body hover:text-ink'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Formatter Editor */}
        <div className={`lg:col-span-7 flex flex-col ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          {/* Formatting Toolbar */}
          <Toolbar
            onApplyStyle={handleApplyStyle}
            onReset={handleResetToPlain}
            hasSelection={hasSelection}
            selectedCharCount={selectedCharCount}
          />

          {/* Text Area Card Container */}
          <div className="bg-canvas border border-hairline rounded-xl shadow-2xs p-4 flex flex-col min-h-[380px]">
            {/* Header controls above textarea */}
            <div className="flex items-center justify-between pb-3 border-b border-hairline mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-ink">
                <FileText className="w-4 h-4 text-ink" />
                <span>Write or Paste Your Post Below</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="text-xs text-mute hover:text-ink hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span>Sample</span>
                </button>
                <span className="text-hairline-strong">•</span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Selection Hint Banner */}
            <div className="text-[11px] text-body bg-canvas-soft border border-hairline px-3 py-1.5 rounded-md mb-3 flex items-center justify-between">
              <span>
                💡 <strong className="text-ink">Tip:</strong> Select any text to format just that selection, or click a style to transform everything.
              </span>
            </div>

            {/* Input Textarea */}
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onSelect={handleSelect}
              onKeyUp={handleSelect}
              onMouseUp={handleSelect}
              placeholder="Type or paste your LinkedIn post here..."
              rows={12}
              className="w-full flex-1 p-3 bg-canvas-soft border border-hairline rounded-lg text-ink text-sm font-sans placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-y min-h-[220px]"
            />

            {/* Action Bar Below Textarea */}
            <div className="mt-4 pt-3 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
              {/* Vercel Mono Data Counter Readout */}
              <div className="text-xs text-mute font-mono">
                {text.length} chars • {text.trim() ? text.trim().split(/\s+/).length : 0} words
              </div>

              {/* Vercel Primary Button */}
              <button
                type="button"
                onClick={handleCopyPost}
                className={`flex items-center gap-2 px-5 py-2 rounded-md text-xs font-bold tracking-tight shadow-2xs transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-ink text-on-primary hover:opacity-90 hover:scale-[1.01]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied Formatted Post!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Formatted Post</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live LinkedIn Preview Card */}
        <div className={`lg:col-span-5 h-full ${activeTab === 'editor' ? 'hidden lg:flex' : 'flex'} flex-col`}>
          <LinkedInPreview
            formattedText={text}
            onCopyText={handleCopyPost}
            copied={copied}
          />
        </div>

      </div>

      {/* Full Style Variations Matrix Grid */}
      <StyleGrid inputText={text} />
    </div>
  );
};
