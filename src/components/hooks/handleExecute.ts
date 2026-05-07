import { useState, useCallback } from 'react';
import { Executor } from '../../engine/Executor';
import { Parser } from '../../engine/Parser';
import type { TurtleState } from '../../types/TurtleState';
import type { Line } from '../../types/Line';

export const useTurtle = (initialState: TurtleState) => {
    const [state, setState] = useState<TurtleState>(initialState);
    const [error, setError] = useState<string | null>(null);

    const executeCode = useCallback((code: string) => {
        try {
            setError(null);
            const commands = Parser.parse(code);

            // Start from a fresh position if you want, 
            // or current state if you want additive drawing.
            let workingState = { ...state, lines: [] as Line[] };

            commands.forEach((cmd) => {
                workingState = Executor.execute(workingState, cmd);
            });

            setState(workingState);
        } catch (err: any) {
            setError(err.message);
        }
    }, [state]);

    const reset = () => setState(initialState);

    return { state, executeCode, error, reset };
};