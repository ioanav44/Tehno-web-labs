class EvenStream {
    #current
    constructor(start = 0) {
        this.#current = (start % 2 === 0) ? start : start + 1
    }

    next() {
        const value = this.#current
        this.#current += 2
        return value
    }
}

const s1 = new EvenStream(4)   
for (let i = 0; i < 10; i++) {
    console.log(`s1[${i}] = ${s1.next()}`)
}



class Software {
    constructor(name = 'software') {
        this.name = name
    }
    run() {
        console.log(`${this.name} is running`)
    }
}
class Plugin {
    constructor(name) {
        this.name = name
        this.browser = null
    }
    install(browser) {
        this.browser = browser
        console.log(`Plugin "${this.name}" installed on ${browser.name}`)
    }
    run() {
        const host = this.browser ? this.browser.name : 'unknown host'
        console.log(`Plugin "${this.name}" running in ${host}`)
    }
}
class Browser extends Software {
    constructor(name) {
        super(name)
        this.plugins = []
    }
    install(plugin) {
        this.plugins.push(plugin)
        plugin.install(this)
    }
    run() {
        console.log(`Browser "${this.name}" is running`)
        for (const p of this.plugins) {
            p.run()
        }
    }
}

const chromeX = new Browser('ChromeX')
const adBlock = new Plugin('AdBlock')
const translator = new Plugin('Translator')

chromeX.install(adBlock)
chromeX.install(translator)

chromeX.run()
adBlock.run()



function powGen(base) {
    const cache = { 0: 1, 1: base };
    const pow = (exp) => {
        if (!Number.isInteger(exp) || exp < 0) {
            throw new Error('exp trebuie să fie un întreg nenegativ');
        }
        if (Object.prototype.hasOwnProperty.call(cache, exp)) {
            console.log('found', exp);
            return cache[exp];
        } else {
            console.log('calculated', exp);
            cache[exp] = base * pow(exp - 1);
            return cache[exp];
        }
    };

    return pow;
}

const pow2 = powGen(2);
console.log(pow2(0));



Number.prototype.times = function(fn) {
    const times = Math.floor(Number(this));
    if (times <= 0) return this;
    if (typeof fn === 'function') {
        for (let i = 0; i < times; i++) fn(i);
    }
    return this;
}
//(3).times(i => console.log(`run ${i}`));


function increaseSalary(salaries, percent) {
    if (!Array.isArray(salaries)) throw new TypeError('Primul parametru trebuie să fie un array');
    if (typeof percent !== 'number' || Number.isNaN(percent)) throw new TypeError('Al doilea parametru trebuie să fie un număr');

    return salaries.map(s => {
        if (typeof s !== 'number' || Number.isNaN(s)) throw new TypeError('Array-ul de salarii trebuie să conțină numai numere');
        return +(s * (1 + percent / 100)).toFixed(2);
    });
}

try {
    console.log(increaseSalary([1000, 2000, 1500], 10)); 
    console.log(increaseSalary('not an array', 10)); 
} catch (err) {
    console.error('Error:', err.message);
}



import fetch from "node-fetch";

async function getObjectFromUrl(url) {
    const res = await fetch(url, {
        headers: { "User-Agent": "TehnoWebScript/1.0" } // Nominatim cere User-Agent
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    return res.json();
}

async function getCountryBounds(country) {
    const object = await getObjectFromUrl(`https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(country)}&format=json`);
    if (!object || object.length === 0) throw new Error('Country not found');
    const box = object[0].boundingbox; // [minLat, maxLat, minLon, maxLon]
    return {
        minLatitude: box[0],
        maxLatitude: box[1],
        minLongitude: box[2],
        maxLongitude: box[3]
    };
}

async function getPlanesOverCountry(country) {
    const bounds = await getCountryBounds(country);
    const bbox = `${bounds.minLatitude},${bounds.maxLatitude},${bounds.minLongitude},${bounds.maxLongitude}`;
    const url = `https://opensky-network.org/api/states/all?bbox=${bbox}`;
    const data = await getObjectFromUrl(url);
    const states = Array.isArray(data.states) ? data.states.map(s => ({
        icao24: s[0],
        callsign: s[1] && s[1].trim() || null,
        origin_country: s[2],
        last_position_time: s[3],
        longitude: s[5],
        latitude: s[6],
        baro_altitude: s[7],
        on_ground: s[8],
        velocity: s[9]
    })) : [];
    return { time: data.time, count: states.length, states };
}

getPlanesOverCountry('Romania').then(result => console.log(result)).catch(err => console.error('Error:', err.message));