import { Canvas } from './components/Canvas'
import { Controls } from './components/Controls'
import { Editor } from './components/Editor'
import { useLogoInterpreter } from './hooks/useLogoInterpreter'

function App() {
  const { code, setCode, segments, error, run, reset } = useLogoInterpreter()

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8 rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          <section className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              TurtleTS LOGO Interpreter
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Build, parse, and draw LOGO programs in TypeScript
            </h1>
            <p className="max-w-2xl text-slate-300 sm:text-lg">
              Write LOGO-style commands in the editor, then run them to render
              turtle strokes on the canvas.
            </p>
          </section>

          <Editor code={code} onChange={setCode} />

          <section className="space-y-4 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Execution</h2>
                <p className="text-sm text-slate-400">
                  Run the interpreter and view any parse errors.
                </p>
              </div>
              <Controls onRun={run} onReset={reset} />
            </div>
            {error ? (
              <div className="rounded-3xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <strong className="font-semibold">Error:</strong> {error}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-400">
                Ready to run your LOGO program.
              </div>
            )}
          </section>
        </div>

        <Canvas segments={segments} />
      </div>
    </main>
  )
}

export default App
