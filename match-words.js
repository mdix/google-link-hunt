const fs = require('fs');
const links = fs.readFileSync('links', 'utf8');
const linksArray = links.split('\n').filter(l => !!l);
const words = fs.readFileSync('words_alpha.txt', 'utf8');
const wordLength = isNaN(parseInt(process.argv[2])) ? 5 : parseInt(process.argv[2]);
const usefulWordsArray = words.split('\r\n').filter(word => word.length >= wordLength);

console.log(`Searching for words with length ${wordLength}+ in ${linksArray.length} links`);

linksArray.forEach(link => {
    const linkWord = link.replace('meet.google.com/', '').split('-').join('');

    usefulWordsArray.forEach(word => {
        if (linkWord.includes(word)) {
            console.log({ word, link });
        }
    });
});