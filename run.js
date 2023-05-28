const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

let consecutiveFailures = 0;

async function getLink() {
  const {
    stdout,
  } = await exec('./link.sh');
  return stdout.replace('\n', '');
}

const interval = setInterval(async () => {
    const link = await getLink();


    if (link.length < 10) {
        console.log('🤷 no link found');

        consecutiveFailures++;
        if (consecutiveFailures >= 5) {
            console.error(`Got ${consecutiveFailures} consecutive failures. Seems we reached the limit. Bailing out. 👋`);
            clearInterval(interval);
        }
        return;
    }

    console.log(`🙌 ${link}`);

    consecutiveFailures = 0;

    fs.writeFileSync('links', `\n${link}`, { flag: "a+" });
}, 1000);

