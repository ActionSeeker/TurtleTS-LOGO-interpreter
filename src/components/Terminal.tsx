import { useTypingEffect } from './hooks/useTypingEffect';

interface TerminalProps {
  code: string;
  setCode: (val: string) => void;
  onRun: () => void;
  onClear: () => void;
}

const Terminal = ({ code, setCode, onRun, onClear }: TerminalProps) => {
  const title = useTypingEffect('TURTLE INTERPRETER V1.0', 50);
  const status = useTypingEffect('SYSTEM READY', 80);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData('text');
    let currentIndex = 0;

    // Start with the current 'code' value from props
    let accumulatedText = code;

    const typeNextCharacter = () => {
      if (currentIndex < pastedData.length) {
        const char = pastedData.charAt(currentIndex);
        // Build the full string manually
        accumulatedText += char;
        // Pass the full resulting string to the prop setter
        setCode(accumulatedText);
        currentIndex++;
        // Mechanical delay for the terminal feel
        setTimeout(typeNextCharacter, 15);
      }
    };

    typeNextCharacter();
  };

  return (
    <div className="dos-terminal flex flex-1 flex-col p-4 font-mono">
      {/* Header */}
      <div className="terminal-header mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-zinc-900">
        <span>{title}</span>
        <span className="text-[#006400]">{status}</span>
      </div>

      {/* Input Area */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        onPaste={handlePaste}
        className="flex-1 resize-none bg-transparent p-3 text-base leading-relaxed text-[#d9d4b0] outline-none placeholder:text-[#999]"
        placeholder="ENTER COMMANDS (e.g. FD 100)..."
      />

      {/* Action Bar */}
      <div className="mt-4 flex gap-2 border-t border-zinc-800 pt-4">
        <button
          onClick={onRun}
          className="dos-button px-6 py-2 text-xs font-bold"
        >
          EXECUTE
        </button>
        <button
          className="dos-button border border-zinc-700 px-6 py-2 text-xs font-bold"
          onClick={onClear}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default Terminal;
