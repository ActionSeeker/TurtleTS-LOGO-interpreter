import { useState } from 'react';
import Canvas from './components/Canvas';
import Terminal from './components/Terminal';

const App = () => {
  const [code, setCode] = useState('');

  return (
    // Main container: Full screen, no scroll
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Left Side: Terminal */}
      <section className="flex h-full w-1/2 flex-col border-r border-zinc-800">
        <Terminal
          code={code}
          setCode={setCode}
          onRun={() => console.log('Run!')}
        />
      </section>

      {/* Right Side: Output */}
      <section className="relative h-full w-1/2 bg-black">
        <Canvas />
      </section>
    </div>
  );
};

export default App;
