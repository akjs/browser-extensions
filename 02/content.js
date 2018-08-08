console.log("Chrome extension content script");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message.txt);
  if (message.txt === 'hello') {
    const container = document.querySelector('.splash-container');
    container.style['background-color'] = '#FF00FF';
  }
}