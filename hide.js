const suggestedChannelIdentifierLeftBar = "ScTransitionBase-sc";
const suggestedChannelIdentifierCenterBig = "ScTransformWrapper-sc";
const suggestedChannelIdentifierFeaturedChannels =
  "featured-content-carousel__item-container";

async function init() {
  console.info("Twitch Streamer Hider loaded");

  const defaultStreamers = await fetchStreamer();
  const customStreamers = await fetchCustomStreamer();

  const streamers = [...defaultStreamers, ...customStreamers];

  setInterval(() => {
    if (isOnHideStreamerPage(streamers)) {
      window.location.href = "https://www.twitch.tv/";
    } else {
      searchStreamer(streamers);
    }
  }, 2000);
}

async function fetchStreamer() {
  const streamersJSONURL = chrome.runtime.getURL("streamer.json");
  const response = await fetch(streamersJSONURL);
  const streamers = await response.json();

  return streamers;
}

async function fetchCustomStreamer() {
  try {
    const streamersJSONURL = chrome.runtime.getURL("streamer.custom.json");
    const response = await fetch(streamersJSONURL);
    const streamers = await response.json();

    return streamers;
  } catch (e) {
    // No custom streamers
    return [];
  }
}

function searchStreamer(streamers) {
  const bodyDOM = document.querySelector("html");

  streamers.forEach((streamer) => {
    if (bodyDOM.innerHTML.indexOf(streamer) > -1) {
      try {
        removeStreamer(streamer);
      } catch (e) {
        console.error(e);
      }
    }
  });
}

function isOnHideStreamerPage(streamers) {
  const url = window.location.href;

  return streamers.some((streamer) => url.includes(streamer));
}

function removeStreamer(streamer) {
  const streamerDOM = document.querySelectorAll(`[href="/${streamer}"]`);
  streamerDOM.forEach((element) => {
    let parent = element.parentElement;
    let counter = 0;
    while (counter < 20) {
      if (
        parent.className.includes(suggestedChannelIdentifierLeftBar) ||
        parent.className.includes(suggestedChannelIdentifierCenterBig) ||
        parent.className.includes(suggestedChannelIdentifierFeaturedChannels)
      ) {
        parent.remove();
        break;
      }
      parent = parent.parentElement;
      counter++;
    }
  });
}

init();
