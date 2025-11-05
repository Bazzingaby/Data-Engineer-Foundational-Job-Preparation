
import React, { Fragment } from 'react';
import type { Topic } from '../types';
import { MindMapNodeComponent } from './MindMapNode';
import { CodeBlock } from './CodeBlock';

interface ContentDisplayProps {
  topic: Topic;
}

const SectionCard: React.FC<{ title: string; children: React.ReactNode; delay: number }> = ({ title, children, delay }) => (
    <div 
        className="group relative bg-slate-800/80 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/10 animate-fade-in"
        style={{ animationDelay: `${delay * 100}ms` }}
    >
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-md"></div>
        <div className="relative">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-2 flex items-center">
                <span className="mr-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a2 2 0 100-4 2 2 0 000 4zm0 14a2 2 0 100-4 2 2 0 000 4zm6-8a2 2 0 100-4 2 2 0 000 4zm-12 0a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                </span>
                {title}
            </h2>
            {children}
        </div>
    </div>
);

const ArchitectureDiagram: React.FC<{ nodes: Topic['content']['architecture'] }> = ({ nodes }) => (
    <div className="relative flex flex-col space-y-8 py-4">
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-700/50 border-l-2 border-dashed border-slate-700/50"></div>
        {nodes.map((node, index) => (
            <div key={index} className="relative pl-16">
                <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-500/50 text-cyan-300 font-bold text-lg shadow-lg">
                    {index + 1}
                </div>
                <h3 className="font-bold text-lg text-slate-100">{node.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{node.description}</p>
            </div>
        ))}
    </div>
);


export const ContentDisplay: React.FC<ContentDisplayProps> = ({ topic }) => {
  const { content } = topic;

  return (
    <div className="max-w-7xl mx-auto" key={topic.id}>
      <h1 className="text-5xl font-extrabold text-white mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text animate-fade-in">
        {topic.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
           <SectionCard title="Definition" delay={1}>
                <p className="text-slate-300 leading-relaxed">{content.definition}</p>
            </SectionCard>
        </div>
        <div className="lg:col-span-1">
           <SectionCard title="Purpose" delay={2}>
                <p className="text-slate-300 leading-relaxed">{content.purpose}</p>
            </SectionCard>
        </div>
      </div>
      
       <SectionCard title="Architecture / Key Concepts" delay={3}>
          <ArchitectureDiagram nodes={content.architecture} />
        </SectionCard>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <SectionCard title="Important Key Points" delay={4}>
            <ul className="space-y-4">
            {content.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                 <svg className="w-5 h-5 mr-3 text-cyan-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: point }}></span>
              </li>
            ))}
          </ul>
        </SectionCard>
        
        <SectionCard title="Mind Map" delay={5}>
          <div className="pl-4 pt-2">
            <MindMapNodeComponent node={content.mindMap} />
          </div>
        </SectionCard>
      </div>

      {content.details && content.details.map((detail, index) => (
        <SectionCard key={index} title={detail.title} delay={6 + index}>
            {detail.content.map((p, pIndex) => (
                <p key={pIndex} className="text-slate-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}

            {detail.code && detail.code.map((c, cIndex) => (
                <Fragment key={cIndex}>
                    {c.title && <h4 className="text-lg font-semibold text-slate-200 mt-6 mb-2">{c.title}</h4>}
                    <CodeBlock language={c.language} code={c.snippet} />
                </Fragment>
            ))}
        </SectionCard>
      ))}
    </div>
  );
};