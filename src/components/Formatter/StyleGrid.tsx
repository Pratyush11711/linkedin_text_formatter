import React, { useState } from 'react';
import { STYLE_OPTIONS, formatText, type StyleOption } from '../../utils/unicodeFormatter';
import { Copy, Check, Sparkles } from 'lucide-react';

interface StyleGridProps {
  inputText: string;
}

export const StyleGrid: React.FC<StyleGridProps> = ({ inputText }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const textToTransform = inputText.trim() ? inputText : 'Scroll and format your LinkedIn post text';

  const categories = [
    { id: 'all', label: 'All Styles' },
    { id: 'style', label: 'Bold & Slanted' },
    { id: 'font', label: 'Fancy Fonts' },
    { id: 'decoration', label: 'Decorations' },
    { id: 'list', label: 'Lists' },
  ];

  const filteredOptions = activeCategory === 'all'
    ? STYLE_OPTIONS
    : STYLE_OPTIONS.filter(opt => opt.category === activeCategory);

  const handleCopy = (style: StyleOption) => {
    const formatted = formatText(textToTransform, style.id);
    navigator.clipboard.writeText(formatted);
    setCopiedId(style.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-canvas border border-hairline rounded-2xl p-4 md:p-6 shadow-2xs mt-8">
      
      {/* Header & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-ink tracking-tight">
              Live Style Gallery & Quick Copy
            </h2>
          </div>
          <p className="text-xs text-body mt-1">
            Preview your draft in every available style. Click any button to copy that specific formatted variation.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-canvas-soft p-1 rounded-xl border border-hairline">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === cat.id
                  ? 'bg-ink text-on-primary shadow-2xs'
                  : 'text-body hover:text-ink hover:bg-canvas'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Style Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredOptions.map(style => {
          const transformedText = formatText(textToTransform, style.id);
          const isCopied = copiedId === style.id;

          return (
            <div
              key={style.id}
              className="bg-canvas-soft border border-hairline rounded-xl p-3.5 flex flex-col justify-between hover:border-hairline-strong transition-all hover:shadow-2xs group"
            >
              <div className="mb-3">
                {/* Style Title & Category */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-ink">
                      {style.label}
                    </span>
                    <span className="text-[10px] text-mute font-normal">
                      ({style.sample})
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-mute bg-canvas px-1.5 py-0.5 rounded border border-hairline uppercase">
                    {style.category}
                  </span>
                </div>
                
                {/* Live Formatted Text Preview Box */}
                <div className="text-sm font-sans text-ink bg-canvas border border-hairline rounded-lg p-2.5 min-h-[54px] max-h-[100px] overflow-y-auto break-words whitespace-pre-wrap select-all leading-relaxed">
                  {transformedText}
                </div>
              </div>

              {/* Dedicated Copy Button */}
              <button
                type="button"
                onClick={() => handleCopy(style)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-canvas border border-hairline text-ink hover:bg-ink hover:text-on-primary hover:border-ink'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied {style.label}!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy {style.label}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
