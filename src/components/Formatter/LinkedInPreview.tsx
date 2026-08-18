import React, { useState } from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  Globe, 
  MoreHorizontal, 
  CheckCircle2,
  Copy,
  Sun,
  Moon
} from 'lucide-react';

interface LinkedInPreviewProps {
  formattedText: string;
  onCopyText: () => void;
  copied: boolean;
}

export const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({
  formattedText,
  onCopyText,
  copied,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<'auto' | 'dark' | 'light'>('auto');

  // Character stats
  const charCount = formattedText.length;
  const wordCount = formattedText.trim() ? formattedText.trim().split(/\s+/).length : 0;
  const lineCount = formattedText ? formattedText.split('\n').length : 0;

  // LinkedIn truncates posts at around 140 to 200 characters on mobile/desktop feeds
  const cutoffLimit = 140;
  const isTruncated = charCount > cutoffLimit;

  // Text split for see more preview
  const truncatedSnippet = isTruncated
    ? formattedText.slice(0, cutoffLimit)
    : formattedText;

  return (
    <div className="bg-canvas border border-hairline rounded-xl shadow-2xs overflow-hidden flex flex-col h-full">
      
      {/* Header bar of preview widget */}
      <div className="bg-canvas-soft border-b border-hairline px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            Live LinkedIn Post Preview
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* LinkedIn Theme Switcher (Light vs Dark Feed Mockup) */}
          <div className="flex items-center bg-canvas p-0.5 border border-hairline rounded-md">
            <button
              type="button"
              onClick={() => setPreviewTheme('light')}
              className={`p-1 rounded text-xs transition-colors ${
                previewTheme === 'light'
                  ? 'bg-ink text-on-primary font-bold'
                  : 'text-body hover:text-ink'
              }`}
              title="Light LinkedIn Theme"
            >
              <Sun className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewTheme('dark')}
              className={`p-1 rounded text-xs transition-colors ${
                previewTheme === 'dark'
                  ? 'bg-ink text-on-primary font-bold'
                  : 'text-body hover:text-ink'
              }`}
              title="Dark LinkedIn Theme (#1D2226)"
            >
              <Moon className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={onCopyText}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-ink text-on-primary hover:opacity-90'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Post</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Actual LinkedIn Post Mockup Card */}
      <div 
        className={`p-4 md:p-6 flex-1 flex flex-col transition-colors ${
          previewTheme === 'dark'
            ? 'bg-[#1d2226] text-[#e8e8e8]'
            : previewTheme === 'light'
            ? 'bg-white text-gray-900'
            : 'bg-white dark:bg-[#1d2226] text-gray-900 dark:text-[#e8e8e8]'
        }`}
      >
        {/* Post Author Info */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-slate-800 text-white font-bold text-sm flex items-center justify-center shadow-2xs ring-2 ring-slate-700/30">
              AR
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm">Alex Rivera</span>
                <span className="text-xs opacity-60">• 1st</span>
              </div>
              <p className="text-xs opacity-75 line-clamp-1">
                Founder & Content Strategist | Helping Creators Scale
              </p>
              <div className="flex items-center gap-1 text-[11px] opacity-60 mt-0.5">
                <span>1h</span>
                <span>•</span>
                <Globe className="w-3 h-3" />
              </div>
            </div>
          </div>

          <button type="button" className="opacity-60 hover:opacity-100 p-1">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Post Body Content Area */}
        <div className="my-3 text-sm leading-relaxed font-sans whitespace-pre-wrap break-words flex-1 min-h-[120px]">
          {formattedText ? (
            <div>
              {/* If text exceeds cutoff limit and not expanded, show truncated snippet with see more link */}
              {isTruncated && !isExpanded ? (
                <>
                  <span>{truncatedSnippet}</span>
                  <span className="opacity-50 font-normal">... </span>
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="font-medium text-blue-600 dark:text-[#70b5f9] hover:underline text-xs"
                  >
                    ...see more
                  </button>
                </>
              ) : (
                <>
                  <span>{formattedText}</span>
                  {isTruncated && isExpanded && (
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="ml-2 text-xs text-blue-600 dark:text-[#70b5f9] hover:underline"
                    >
                      (show less)
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <span className="opacity-40 italic">
              Your live formatted LinkedIn post preview will appear here as you type...
            </span>
          )}
        </div>

        {/* Reaction Stats Bar */}
        <div className="pt-3 border-t border-hairline/40 flex items-center justify-between text-xs opacity-75 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] flex items-center justify-center font-bold">👍</span>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">❤️</span>
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] flex items-center justify-center font-bold">💡</span>
            </div>
            <span>142</span>
          </div>
          <span>24 comments • 8 reposts</span>
        </div>

        {/* LinkedIn Interaction Action Bar */}
        <div className="pt-1 border-t border-hairline/40 grid grid-cols-4 gap-1 text-xs font-medium opacity-80">
          <button type="button" className="flex items-center justify-center gap-1.5 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors">
            <ThumbsUp className="w-4 h-4" />
            <span className="hidden sm:inline">Like</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-1.5 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Comment</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-1.5 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors">
            <Repeat2 className="w-4 h-4" />
            <span className="hidden sm:inline">Repost</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-1.5 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors">
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>

      {/* Post Analytics Counter Footer using Geist Mono (Vercel Mono Data Readout) */}
      <div className="bg-canvas-soft border-t border-hairline p-3 grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="bg-canvas border border-hairline p-2 rounded-lg">
          <div className="text-mute text-[10px] uppercase tracking-wider font-semibold">Characters</div>
          <div className="font-bold text-ink text-sm mt-0.5">
            {charCount} <span className="text-xs font-normal text-mute">/ 3,000</span>
          </div>
        </div>

        <div className="bg-canvas border border-hairline p-2 rounded-lg">
          <div className="text-mute text-[10px] uppercase tracking-wider font-semibold">Words</div>
          <div className="font-bold text-ink text-sm mt-0.5">{wordCount}</div>
        </div>

        <div className="bg-canvas border border-hairline p-2 rounded-lg">
          <div className="text-mute text-[10px] uppercase tracking-wider font-semibold">Lines</div>
          <div className="font-bold text-ink text-sm mt-0.5">{lineCount}</div>
        </div>
      </div>

    </div>
  );
};
