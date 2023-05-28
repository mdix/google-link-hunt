# google-link-hunt
Generating google meet links and trying to find words in them (+ stats & word search), e.g. (following links are most probably not working as they haven't been generated yet):    
`https://meet.google.com/hac-kerh-ood`     
`https://meet.google.com/las-erbl-ade`     

## Get started
1. Copy `link.sh.example` to `link.sh`
2. Go to Chrome and log into Gmail
3. Click the `Meet` link in the left menu
4. Click `New meeting` (you should see a meeting link)
5. Copy the link and paste it in a new browser window
6. Open the Developer Tools (F12) and go to the `Network` tab and click 'All' on top (next to the search input)
7. Reload the page if it's empty
8. Right-click on the `GET` request that is named `/getalink` (should be the first one in the list) and `Copy` -> `Copy as CURL`
9. Replace `INSERT_CURL_HERE` with the content of your clipboard in `link.sh`

## Usage
### get more links
```bash
node run.js
```

### get letter distribution
```bash 
node stats.js
```

### search for specific word (ignores the `-` in the links)
```bash
node stats.js word
```

### match against word list [default min length]
```bash
node match-words.js
```

### match against word list [custom min length]
```bash
node match-words.js 3
```

### match against word list for links that have at least one word in each block (e.g. "red-good-jam")
```bash
node match-sentence.js
```

## Nota bene
- word list taken from https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt
- you can generate roughly 5000 links before Google blocks you for a while (dynamic part of the link is `null` then instead of `xxx-yyyy-zzz`) - the script will stop automatically when 5 consecutive tries for getting a link failed - generating works again after a day or so
- when you generate your first link, a `links` file will be created - subsequent runs will append to this file
- only letter that you can not have in a link is `l` (probably because it's unambiguous with `1` or `I` or so)