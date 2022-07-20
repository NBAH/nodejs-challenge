import { getPermutations } from './permutations';

describe('getPermutations', () => {
    it('Empty string', () => {
        expect(getPermutations('')).toEqual(['']);
    });

    it('*1', () => {
        expect(getPermutations('*1').sort()).toEqual(['01', '11']);
    });

    it('*10', () => {
        expect(getPermutations('*10').sort()).toEqual(['010', '110']);
    });

    it('*10*', () => {
        expect(getPermutations('*10*').sort()).toEqual(['0100', '0101', '1100', '1101']);
    });

    it('101', () => {
        expect(getPermutations('101')).toEqual(['101']);
    });

    it('000', () => {
        expect(getPermutations('000')).toEqual(['000']);
    });

    it('10001010101010101010101001010101000010101111110', () => {
        expect(getPermutations('10001010101010101010101001010101000010101111110')).toEqual([
            '10001010101010101010101001010101000010101111110',
        ]);
    });

    it('*', () => {
        expect(getPermutations('*').sort()).toEqual(['0', '1']);
    });

    it('**', () => {
        expect(getPermutations('**').sort()).toEqual(['00', '01', '10', '11']);
    });

    it('***', () => {
        expect(getPermutations('***').sort()).toEqual(['000', '001', '010', '011', '100', '101', '110', '111']);
    });
});
