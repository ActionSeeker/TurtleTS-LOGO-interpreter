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
                    x: 400, // Or half your canvas width
                    y: 300,
                    angle: -90,
                    lines: []
                };

            case CommandType.FD:
                return Executor.move(currentState, command.value || 0);

            case CommandType.BK:
                return Executor.move(currentState, -(command.value || 0));

            case CommandType.RT:
                return { ...currentState, angle: currentState.angle + (command.value || 0) };

            case CommandType.LT:
                return { ...currentState, angle: currentState.angle - (command.value || 0) };

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

        return { ...start, lines: newLines };
    }
}