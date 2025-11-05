
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentDisplay } from './components/ContentDisplay';
import { topics } from './data/interviewPrepData';
import type { Topic } from './types';

const App: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<Topic>(topics[0]);

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar topics={topics} activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
      <main className="flex-1 p-4 sm:p-6 md:p-10 bg-slate-900">
        <ContentDisplay topic={activeTopic} />
      </main>
    </div>
  );
};

export default App;
