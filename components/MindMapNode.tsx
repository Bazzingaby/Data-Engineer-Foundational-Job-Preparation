
import React from 'react';
import type { MindMapNode } from '../types';

interface MindMapNodeProps {
  node: MindMapNode;
  isRoot?: boolean;
}

export const MindMapNodeComponent: React.FC<MindMapNodeProps> = ({ node, isRoot = true }) => {
  return (
    <div className={`mindmap-node ${isRoot ? 'root' : ''}`}>
      <div className="flex items-center">
        <div className="node-icon w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-900 mr-3 flex-shrink-0"></div>
        <p className="font-semibold text-slate-200">{node.name}</p>
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="pl-5 mt-2 border-l-2 border-slate-700/50">
          {node.children.map((child, index) => (
            <li key={index} className="relative pt-2">
              <span className="absolute left-[-11px] top-[18px] h-px w-3 bg-slate-700/50"></span>
              <MindMapNodeComponent node={child} isRoot={false} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};