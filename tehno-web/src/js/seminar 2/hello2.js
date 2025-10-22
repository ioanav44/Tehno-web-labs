let sayhello = (name) => {
    return `Hello, ${name}!`;
}

const concatStrings = (arr = []) => arr.join('');
console.log(concatStrings(process.argv.slice(2)));

function countDifferentChars(str1, str2) {
    if (str1.length !== str2.length) {
        return -1;
    } else {
        let diff = 0;
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] !== str2[i]) {
                diff++;
            }
        }
        return diff;
    }
}

function listToArray(numbers) {
    const result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(numbers[i]);
    }
    return result;
}

function interleaveArrays(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return -1;
    if (arr1.length !== arr2.length) return -1;
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
        result.push(arr1[i], arr2[i]);
    }
    return result;
}

function fib(n) {
    if (n < 0) return null;
    if (n === 0) return 0;
    if (n === 1) return 1;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const c = a + b;
        a = b;
        b = c;
    }
    return b;
}

if (process.argv.length <= 2) {
    console.log('not enough parameters');
} else {
    const n = Number(process.argv[2]);
    if (!Number.isInteger(n) || n < 0) {
        console.log('invalid parameter');
    } else {
        console.log(fib(n)); // elementul de ordin n (fib(0)=0, fib(1)=1)
    }
}

function letterFrequencies(text) {
    if (typeof text !== 'string') return {};
    // elimină spațiile și normalizează la litere mici
    const normalized = text.replace(/\s+/g, '').toLowerCase();
    const total = normalized.length;
    if (total === 0) return {};
    const counts = {};
    for (let ch of normalized) {
        counts[ch] = (counts[ch] || 0) + 1;
    }
    for (let k in counts) {
        counts[k] = counts[k] / total;
    }
    return counts;
}

console.log(countDifferentChars("tehno", "techno"));
console.log(listToArray([1, 2, 3]));
console.log(interleaveArrays([1,3,5], [2,4,6]));
const sampleString = 'the quick brown fox jumps over the lazy dog';
const input = process.argv.length > 2 ? process.argv.slice(2).join(' ') : sampleString;
console.log(letterFrequencies(input));