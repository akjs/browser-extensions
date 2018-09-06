const title = document.querySelector('title').innerHTML;

const descriptionMeta = document.querySelector('meta[content="description"]');

const description = descriptionMeta
  ? descriptionMeta.getAttribute('value')
  : title;

const url = window.location.href;

chrome.runtime.onMessage.addListener((request /*, sender, sendResponse*/) => {
  console.log('req', request);
  if (request.message === 'clicked_browser_action') {
    console.log({
      title,
      description,
      url
    });

    chrome.runtime.sendMessage({
      message: 'save_link',
      details: {
        title,
        description,
        url
      }
    });
  }
});
