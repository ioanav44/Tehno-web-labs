// This file is intentionally left blank.
const birthYears = [2000, 2010, 1995, 1980, 2015, 2003];
const currentYear = new Date().getFullYear();

const agesOver18 = birthYears
    .map(year => currentYear - year)
    .filter(age => age > 18);

console.log(agesOver18);

const sumDivBy = (numbers, divisor) => {
    return numbers.filter(num => num % divisor === 0).reduce((sum, num) => sum + num, 0);
};


const arr = [3, 5, 12, 3, 5, 3];
console.log(sumDivBy(arr, 3)); 

const formatNamedString = (s, params) => {
    let modified = s;
    for (const key in params) {
        const pattern = new RegExp(`\\{${key}\\}`, 'g');
        modified = modified.replace(pattern, params[key]);
    }
    return modified;
};

console.log(formatNamedString("un {substantiv} este {adjectiv}", {
    substantiv: "căluț",
    adjectiv: "drăguț"
}));

const reduce = (array, reducer, initialValue) => {
    let aux = initialValue;
    for (const element of array) {
        aux = reducer(aux, element);
    }
    return aux;
};

const sampleArray = [1, 2, 3, 4, 5];
console.log(reduce(sampleArray, (acc, x) => acc + x, 0));


const censorText = (text, dictionary) => {
    return text.split(' ').map(word =>  dictionary.includes(word)? word.replace(/./g, (ch, i) => i === 0 || i === word.length - 1 ? ch : '*'): word).join(' ');
};

console.log(censorText("javascript este minunat", ["este"]));

const sortByKey = (arr, key) => {
    return arr.slice().sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
};

const people = [
    { name: "Ana", age: 22 },
    { name: "Mihai", age: 19 },
    { name: "Ioana", age: 25 }
];

console.log(sortByKey(people, "age")); 

const average = arr => arr.reduce((sum, x) => sum + x, 0) / arr.length;

console.log(average([1, 2, 3, 4, 5]));