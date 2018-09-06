const apiUrl = 'https://kakato.herokuapp.com/api/links';
const postData = (url, userToken, data) => {
  // Default options are marked with *
  return fetch(url, {
    body: data, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'x-kakato': userToken,
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    referrer: 'no-referrer' // *client, no-referrer
  }).then(() => {
    console.log('done');
    window.close();
  }); // parses response to JSON
};

chrome.tabs.getSelected(null, function(tab) {
  const title = tab.title;

  chrome.tabs.sendMessage(tab.id, {
    message: 'clicked_browser_action',
    sourced: 'popup'
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'save_link') {
      document.querySelector('input#title').value = request.details.title;
      document.querySelector('input#url').value = request.details.url;
      document.querySelector('textarea#description').innerHTML =
        request.details.title;

      document.querySelector('button').addEventListener('click', e => {
        console.log('button clicked');
        const title = document.querySelector('input#title').value;
        const url = document.querySelector('input#url').value;
        const description = document.querySelector('textarea#description')
          .innerHTML;
        e.preventDefault();
        const data = `name=${title}&url=${url}&description=${description}`;
        chrome.storage.sync.get(['data'], async function(result) {
          await postData(apiUrl, result.data, data);
        });
      });
    }
  });
});
