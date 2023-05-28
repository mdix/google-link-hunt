const fs = require('fs');
const data = fs.readFileSync('links', 'utf8');
const arg = process.argv[2];
const isSearch = typeof arg === 'string' && !!arg.length;

function initAToZ() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return Object.fromEntries([...letters].map((letter) => [letter, 0]));
}

const links = data.split('\n').filter(l => !!l);
const letters = links.reduce((acc, link) => {
    const letters = link.split('/').pop().split('-').join('').split('');

    // search for a word (w/o dashes interfering, e.g. 'team' finds 'tea-mabc-def')
    if (isSearch) {
        const all = letters.join('');
        if (all.includes(arg)) console.log(link);
    }

    letters.forEach(letter => acc[letter]++);

    return acc;
}, initAToZ());


function calculatePercentage(letters) {
    const total = Object.values(letters).reduce((acc, letter) => acc + letter, 0);
    return Object.entries(letters).map(([letter, count]) => {
        const percentage = count / total * 100;
        return { [letter]: percentage };
    });
}

if (!isSearch) {
    console.log(`Relative letter distribution in ${links.length} links:\n`);
    console.log(calculatePercentage(letters).sort((a, b) => Object.values(a)[0] - Object.values(b)[0]));
}
