import React from 'react';
import type { Topic } from '../types';

// Fix: Defined the SidebarProps interface to provide types for the component's props.
interface SidebarProps {
  topics: Topic[];
  activeTopic: Topic;
  setActiveTopic: (topic: Topic) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ topics, activeTopic, setActiveTopic }) => {
  return (
    <aside className="w-16 md:w-64 bg-slate-900/30 backdrop-blur-lg border-r border-slate-700/50 p-2 md:p-4 flex flex-col space-y-2 sticky top-0 h-screen">
      <h1 className="text-lg md:text-2xl font-bold text-cyan-400 mb-4 hidden md:block text-shadow-glow">
        DE Prep Guide
      </h1>
       <div className="w-full h-px bg-slate-700 hidden md:block mb-4"></div>
      <nav>
        <ul>
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                onClick={() => setActiveTopic(topic)}
                className={`w-full flex items-center p-2 md:p-3 my-1 rounded-lg transition-all duration-300 text-left transform hover:scale-105 ${
                  activeTopic.id === topic.id
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white shadow-lg border border-cyan-500/50'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                }`}
              >
                <div className="w-6 h-6 mr-0 md:mr-3 text-cyan-400">{topic.icon}</div>
                <span className="hidden md:inline font-medium">{topic.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};