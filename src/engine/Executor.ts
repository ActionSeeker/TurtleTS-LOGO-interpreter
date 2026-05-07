import type { Command } from "../types/Command";
import { CommandType } from "../types/CommandType";
import type { TurtleState } from "../types/TurtleState";

export class Executor {
    public static execute(state: TurtleState, command: Command): TurtleState {
        let currentState = state;

        switch (command.type) {
            case CommandType.CS:
                return {
                    ...currentState,
                    x: 0,
                    y: 0,
                    angle: -90,
                    lines: []
                };

            case CommandType.PU:
                return { ...state, isPenDown: false };

            case CommandType.PD:
                return { ...state, isPenDown: true };

            case CommandType.FD:
                return Executor.move(currentState, command.value || 0);

            case CommandType.BK:
                return Executor.move(currentState, -(command.value || 0));

            case CommandType.RT:
                return { ...currentState, angle: currentState.angle + (command.value || 0) };

            case CommandType.LT:
                return { ...currentState, angle: currentState.angle - (command.value || 0) };

            case CommandType.SETX:
                return this.applyAbsoluteMove(state, command.value ?? state.x, state.y);

            case CommandType.SETY:
                return this.applyAbsoluteMove(state, state.x, command.value ?? state.y);

            case CommandType.REPEAT:
                const iterations = command.value || 0;
                for (let i = 0; i < iterations; i++) {
                    command.nestedCommands?.forEach((nested) => {
                        currentState = Executor.execute(currentState, nested);
                    });
                }
                return currentState;

            default:
                return currentState;
        }
    }
    /**
     * Moves the turtle forward by a specified distance, 
     * updating its position and drawing a line if the pen is down.
     * @param start The initial state of the turtle before moving.
     * @param distance The distance to move forward. Can be positive (forward) or negative (backward).
     * @returns The updated state of the turtle after moving.
     */
    private static move(start: TurtleState, distance: number): TurtleState {
        const radians = start.angle * (Math.PI / 180);
        const newX = start.x + distance * Math.cos(radians);
        const newY = start.y + distance * Math.sin(radians);

        const newLines = [...start.lines];

        if (start.isPenDown) {
            newLines.push({
                start: { x: start.x, y: start.y },
                end: { x: newX, y: newY },
                color: 'black',
            });
        }

        return {
            ...start,
            x: newX,
            y: newY,
            lines: newLines
        };
    }

    /**
     * Applies an absolute move to the turtle, updating its position to the specified coordinates.
     * @param state  The current state of the turtle before moving.
     * @param newX  The new X coordinate to move to.
     * @param newY  The new Y coordinate to move to.
     * @returns The updated state of the turtle after moving to the new coordinates.
     */
    private static applyAbsoluteMove(state: TurtleState, newX: number, newY: number): TurtleState {
        const lines = [...state.lines];

        if (state.isPenDown) {
            lines.push({
                start: { x: state.x, y: state.y },
                end: { x: newX, y: newY },
                color: 'black'
            });
        }

        return {
            ...state,
            x: newX,
            y: newY,
            lines
        };
    }
}