
import React, { useState } from 'react';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-slate-900/70 rounded-lg overflow-hidden my-4 border border-slate-700">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-800/80 border-b border-slate-700">
        <span className="text-xs font-semibold text-slate-400 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className={`text-xs font-medium px-2 py-1 rounded transition-all duration-200 ${
            isCopied
              ? 'text-emerald-400'
              : 'text-slate-400 hover:bg-slate-700 hover:text-cyan-400'
          }`}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};