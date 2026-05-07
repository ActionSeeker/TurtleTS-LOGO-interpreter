import { useState } from 'react';
import Canvas from './components/Canvas';
import Terminal from './components/Terminal';

const App = () => {
  const [code, setCode] = useState('');

  return (
    // Main container: Full screen, no scroll
    <div className="dos-shell flex h-screen w-screen overflow-hidden">
      {/* Left Side: Terminal */}
      <section className="dos-panel flex h-full w-1/2 flex-col border-r border-zinc-700">
        <Terminal
          code={code}
          setCode={setCode}
          onRun={() => console.log('Run!')}
        />
      </section>

      {/* Right Side: Output */}
      <section className="dos-panel relative h-full w-1/2">
        <Canvas />
      </section>
    </div>
  );
};

export default App;
