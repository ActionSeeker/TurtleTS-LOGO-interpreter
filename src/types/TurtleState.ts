import type { Line } from './Line'

export interface TurtleState {
    x: number;
    y: number;
    angle: number; // In degrees
    isPenDown: boolean;
    lines: Line[];
}