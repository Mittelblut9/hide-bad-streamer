const streamers = [
    'scurrows',
]

console.info('Twitch Streamer Hider loading...');

async function init() {
    console.info('Twitch Streamer Hider loaded');
    searchStreamer();
}

function searchStreamer() {
    const bodyDOM = document.querySelector('html');

    streamers.forEach((streamer) => {
        if (bodyDOM.innerHTML.indexOf(streamer) > -1) {
            console.log(`Streamer ${streamer} is live!`)
            removeStreamer(streamer);
        }
    });
}

function removeStreamer(streamer) {
    const streamerDOM = document.querySelector(`[title="${streamer}"]`);
    streamerDOM.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.
    style.display = 'none';
}


setTimeout(() => {
    init().catch((e) => logError(e));
}, 3000);