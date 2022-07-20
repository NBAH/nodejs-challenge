/**
 * Returns an array of all possible permutations of the input string
 * where each * character is replaced by 0 or 1
 * Time complexity O(2^M)*N
 * Where M is the amount of * in the input and N is the string length
 * @param {string} input - Input string which includes only 0,1,* characters
 */
export const getPermutations = (input: string): string[] => {
    const permutations = [];

    const asterisksCount = (input.match(/\*/g) || []).length;

    if (asterisksCount > 25) {
        console.error(`Input has too many * characters (${asterisksCount}). Processing will take too much time`);
        process.exit(1);
    }

    const permutationsCount = 1 << asterisksCount;

    for (let i = 0; i < permutationsCount; i++) {
        let permutationNumber = i;
        let permutation = '';

        for (let j = 0; j < input.length; j++) {
            if (input[j] !== '*') {
                permutation += input[j];
                continue;
            }

            permutation += permutationNumber % 2;
            permutationNumber = Math.trunc(permutationNumber / 2);
        }

        permutations.push(permutation);
    }

    return permutations;
};
