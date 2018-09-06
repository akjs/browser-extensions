browser.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('clicked thing');
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: 'save_link' });
  });
});
