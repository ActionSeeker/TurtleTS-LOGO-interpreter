import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <section className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Vite + React + TypeScript + Tailwind</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">TurtleTS LOGO Interpreter</h1>
          <p className="mx-auto max-w-2xl text-slate-300 sm:text-lg">
            A fresh React starter with Tailwind CSS configured for Vite. Edit the app and start building your interpreter UI.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="space-y-2">
            <p className="text-slate-300">Click the button to verify React state and Tailwind styling.</p>
            <div className="rounded-3xl bg-slate-800/80 p-4 text-slate-200 ring-1 ring-slate-700">
              Count: <span className="font-semibold text-white">{count}</span>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            onClick={() => setCount((current) => current + 1)}
          >
            Increment count
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-800/80 p-6 ring-1 ring-slate-700">
            <h2 className="text-xl font-semibold text-white">Project setup</h2>
            <p className="mt-2 text-slate-300">Run <code className="rounded bg-slate-900 px-2 py-1 text-xs text-cyan-300">npm run dev</code> to start the dev server.</p>
          </div>
          <div className="rounded-3xl bg-slate-800/80 p-6 ring-1 ring-slate-700">
            <h2 className="text-xl font-semibold text-white">Tailwind ready</h2>
            <p className="mt-2 text-slate-300">The app uses Tailwind directives in <code className="rounded bg-slate-900 px-2 py-1 text-xs text-cyan-300">src/index.css</code>.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
