const fs = require('fs');
const links = fs.readFileSync('links', 'utf8');
const linksArray = links.split('\n').filter(l => !!l);
const words = fs.readFileSync('words_alpha.txt', 'utf8');
const threeLetterWords = words.split('\r\n').filter(word => word.length === 3);
const fourLetterWords = words.split('\r\n').filter(word => word.length === 4);

console.log(`Searching for links where every block matches at least a word in ${linksArray.length} links`);

linksArray.forEach(link => {
    const [ block1, block2, block3 ] = link.replace('meet.google.com/', '').split('-');

    const matchingWordsBlock1 = matchingWords(block1, threeLetterWords);
    const matchingWordsBlock2 = matchingWords(block2, fourLetterWords);
    const matchingWordsBlock3 = matchingWords(block3, threeLetterWords);

    if (!!matchingWordsBlock1.length && !!matchingWordsBlock2.length && !!matchingWordsBlock3.length) {
        console.log({ link, matchingWordsBlock1, matchingWordsBlock2, matchingWordsBlock3 });
    }
});

function matchingWords(letters, words) {
    return words.reduce((acc, word) => {
        if (letters === word) acc.push(word);
        return acc;
    }, []);
}