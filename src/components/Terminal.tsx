interface TerminalProps {
  code: string;
  setCode: (val: string) => void;
  onRun: () => void;
}

const Terminal = ({ code, setCode, onRun }: TerminalProps) => {
  return (
    <div className="flex flex-1 flex-col p-4 font-mono">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-zinc-500">
        <span>Turtle Interpreter v1.0</span>
        <span className="text-green-500">System Ready</span>
      </div>

      {/* Input Area */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="flex-1 resize-none bg-transparent p-2 text-sm leading-relaxed outline-none placeholder:text-zinc-700"
        placeholder="ENTER COMMANDS (e.g. FD 100)..."
      />

      {/* Action Bar */}
      <div className="mt-4 flex gap-2 border-t border-zinc-800 pt-4">
        <button
          onClick={onRun}
          className="bg-zinc-100 px-6 py-2 text-xs font-bold text-black transition-colors hover:bg-green-500"
        >
          EXECUTE
        </button>
        <button
          className="border border-zinc-700 px-6 py-2 text-xs font-bold transition-colors hover:bg-zinc-800"
          onClick={() => setCode('')}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default Terminal;
