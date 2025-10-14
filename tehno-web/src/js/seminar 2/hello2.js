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

console.log(countDifferentChars("tehno", "techno"));
console.log(listToArray([1, 2, 3]));
console.log(interleaveArrays([1,3,5], [2,4,6]));