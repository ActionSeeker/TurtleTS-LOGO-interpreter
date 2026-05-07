import { describe, it, expect } from 'vitest';
import { Parser } from './Parser';
import { CommandType } from '../types/CommandType';

/**
 * These tests are written against the parser implementation itself,
 * not against a one-off regex. That keeps the parser behavior
 * documented and validated in the same place.
 */

describe('Parser.parse', () => {
    it('turns source code into a flat token list', () => {
        const source = 'FD 100';
        const tokens = Parser.parse(source);

        expect(tokens).toEqual([
            {
                type: CommandType.FD,
                value: 100,
            }
        ]);
    });

    it('keeps bracket tokens when parsing nested blocks', () => {
        const source = 'REPEAT 4 [ FD 50 ]';
        const tokens = Parser.parse(source);

        expect(tokens).toEqual([
            {
                type: CommandType.REPEAT,
                value: 4,
                nestedCommands: [
                    {
                        type: CommandType.FD,
                        value: 50,
                    }
                ],
            }
        ]);
    });

    it.only('parses nested blocks correctly', () => {
        const source = 'REPEAT 10 [REPEAT 4 [FD 100 RT 90] RT 36]';
        const tokens = Parser.parse(source);

        expect(tokens).toEqual([
            {
                type: CommandType.REPEAT,
                value: 10,
                nestedCommands: [
                    {
                        type: CommandType.REPEAT,
                        value: 4,
                        nestedCommands: [
                            {
                                type: CommandType.FD,
                                value: 100,
                            },
                            {
                                type: CommandType.RT,
                                value: 90,
                            }
                        ],
                    },
                    {
                        type: CommandType.RT,
                        value: 36,
                    }
                ],
            }
        ]);
    });

    it('ignores extra whitespace and still returns meaningful tokens', () => {
        const source = 'FD   100   RT    90';
        const tokens = Parser.parse(source);

        expect(tokens).toEqual([
            {
                type: CommandType.FD,
                value: 100,
            },
            {
                type: CommandType.RT,
                value: 90,
            }
        ]);
    });
});

describe('Parser.parse - error handling', () => {
    it('throws an error for mismatched brackets', () => {
        const source = 'REPEAT 4 [ FD 50 ';
        expect(() => Parser.parse(source)).toThrow(/Mismatched opening bracket/);
    });

    it('throws an error for unexpected closing brackets', () => {
        const source = 'FD 100 ]';
        expect(() => Parser.parse(source)).toThrow(/Mismatched closing bracket/);
    });

    it('throws an error for unknown commands', () => {
        const source = 'FDD 100';
        expect(() => Parser.parse(source)).toThrow(/Unknown command "FDD"/);
    });
});
