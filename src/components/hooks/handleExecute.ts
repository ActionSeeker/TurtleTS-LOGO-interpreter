import { useState, useCallback, useRef } from 'react';
import { Executor } from '../../engine/Executor';
import { Parser } from '../../engine/Parser';
import type { TurtleState } from '../../types/TurtleState';
import type { Line } from '../../types/Line';
import type { Command } from '../../types/Command';
import { CommandType } from '../../types/CommandType';

export const useTurtle = (initialState: TurtleState) => {
    const [state, setState] = useState<TurtleState>(initialState);
    const [error, setError] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Timer ref to allow us to cancel animation if needed
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Helper to flatten nested REPEATs into a linear sequence of atomic commands
    const flatten = (commands: Command[]): Command[] => {
        let flat: Command[] = [];
        commands.forEach(cmd => {
            if (cmd.type === CommandType.REPEAT && cmd.nestedCommands) {
                for (let i = 0; i < (cmd.value || 0); i++) {
                    flat = [...flat, ...flatten(cmd.nestedCommands)];
                }
            } else {
                flat.push(cmd);
            }
        });
        return flat;
    };

    const executeCode = useCallback((code: string) => {
        if (isAnimating) return;

        try {
            setError(null);
            const commands = Parser.parse(code);
            const flatCommands = flatten(commands);

            setIsAnimating(true);

            // We start from the current position or a fresh one
            let workingState = { ...state, lines: [] as Line[] };
            let stepIndex = 0;

            const runStep = () => {
                if (stepIndex < flatCommands.length) {
                    const cmd = flatCommands[stepIndex];
                    workingState = Executor.execute(workingState, cmd);

                    setState({ ...workingState });
                    stepIndex++;

                    // Adjust the ms (50) to change drawing speed
                    timerRef.current = setTimeout(runStep, 30);
                } else {
                    setIsAnimating(false);
                }
            };

            runStep();

        } catch (err: any) {
            console.log('Execution error', err);
            setError(err.message);
            setIsAnimating(false);
        }
    }, [state, isAnimating]);

    const clear = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setIsAnimating(false);
        setState({
            x: 0,
            y: 0,
            angle: -90,
            isPenDown: true,
            lines: []
        });
        setError(null);
    }, []);

    const reset = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsAnimating(false);
        setState(initialState);
    };

    return { state, executeCode, error, reset, clear, isAnimating };
};