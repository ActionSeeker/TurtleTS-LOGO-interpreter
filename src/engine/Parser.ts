import type { Command } from "../types/Command";
import { CommandType } from "../types/CommandType";

export class Parser {
    constructor() { }

    /**
     * Tokenizes the input code string into an array of tokens.
     * It uses a regular expression to match sequences of word characters 
     * (commands and numbers) as well as brackets for nested commands.
     * @param code The input code string to tokenize.
     * @returns An array of tokens extracted from the input code.
     */
    private static tokenize(code: string): string[] {
        /**
         * This regex matches:
         * - \w+ : sequences of word characters (commands and numbers)
         * - \[ : opening brackets for nested commands
         * - \] : closing brackets for nested commands
         * The 'g' flag ensures we get all matches in the string, not just the first one.
         */
        return code.toUpperCase().match(/\w+|\[|\]/g) || [];
    }

    private static createBracketMap(tokens: string[]): Map<number, number> {
        const bracketMap = new Map<number, number>();
        const stack: number[] = [];

        tokens.forEach((token, idx) => {
            if (token === '[') {
                stack.push(idx);
            } else if (token === ']') {
                const openingIdx = stack.pop();
                if (openingIdx !== undefined) {
                    bracketMap.set(openingIdx, idx);
                } else {
                    throw new Error("Mismatched closing bracket at index " + idx);
                }
            }
        });

        if (stack.length > 0) {
            throw new Error("Mismatched opening bracket at index " + stack[0]);
        }

        return bracketMap;
    }

    public static parse(code: string): Command[] {
        const tokens = Parser.tokenize(code);
        const bracketMap: Map<number, number> = Parser.createBracketMap(tokens);
        return Parser.parseInternal(tokens, bracketMap);
    }

    private static parseInternal(tokens: string[],
        bracketMap: Map<number, number>,
        ctx = { idx: 0 },
        limit?: number
    ): Command[] {
        const commands: Command[] = [];
        const end = limit !== undefined ? limit : tokens.length;

        while (ctx.idx < end) {
            const token: string = tokens[ctx.idx];
            if (token in CommandType) {
                switch (token) {
                    case CommandType.REPEAT:
                        const times = parseFloat(tokens[ctx.idx + 1]);
                        if (isNaN(times)) throw new Error("REPEAT requires a number");

                        const openIdx = ctx.idx + 2;
                        const closeIdx = bracketMap.get(openIdx);

                        if (closeIdx === undefined) {
                            throw new Error("Mismatched brackets");
                        }

                        ctx.idx = openIdx + 1;

                        const nestedCommands = this.parseInternal(tokens, bracketMap, ctx, closeIdx);

                        commands.push({
                            type: CommandType.REPEAT,
                            value: times,
                            nestedCommands,
                        });

                        ctx.idx = closeIdx + 1;
                        break;
                    default:
                        const requiresArg: boolean = [
                            CommandType.FD,
                            CommandType.BK,
                            CommandType.RT,
                            CommandType.LT,
                            CommandType.SETX,
                            CommandType.SETY
                        ].includes(token as CommandType);

                        const value = requiresArg ? parseFloat(tokens[ctx.idx + 1]) : undefined;

                        if (requiresArg && isNaN(value!)) {
                            throw new Error(`Command ${token} requires a numeric argument.`);
                        }

                        commands.push({
                            type: token as CommandType,
                            value
                        });

                        ctx.idx += requiresArg ? 2 : 1;
                        break;
                }
            } else {
                // Wenn wir innerhalb eines Blocks sind (limit gesetzt), 
                // bricht die Rekursion bei einem ']' ab, ohne einen Fehler zu werfen.
                if (token === ']' && limit !== undefined) {
                    return commands;
                }

                if (token === '[' || token === ']') {
                    throw new Error(`Unexpected bracket "${token}" at index ${ctx.idx}`);
                }
                throw new Error(`Unknown command "${token}"`);
            }
        }
        return commands;
    }
}