import { useState } from 'react';
import Canvas from './components/Canvas';
import Terminal from './components/Terminal';
import { useTurtle } from './components/hooks/handleExecute';

const App = () => {
  const [code, setCode] = useState('');
  const { state, executeCode } = useTurtle({
    x: 400,
    y: 300,
    angle: -90,
    isPenDown: true,
    lines: [],
  });

  return (
    <div className="dos-shell flex h-screen w-screen overflow-hidden">
      {/* Left Side: Terminal */}
      <section className="dos-panel flex h-full w-1/2 flex-col border-r border-zinc-700">
        <Terminal
          code={code}
          setCode={setCode}
          onRun={() => executeCode(code)}
        />
      </section>

      {/* Right Side: Output */}
      <section className="dos-panel relative h-full w-1/2">
        <Canvas turtleState={state} />
      </section>
    </div>
  );
};

export default App;
