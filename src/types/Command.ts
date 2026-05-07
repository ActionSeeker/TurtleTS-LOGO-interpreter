import type { CommandType } from './CommandType'

export interface Command {
    type: CommandType;
    value?: number;
    nestedCommands?: Command[];
}