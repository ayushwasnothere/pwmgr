chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "getTabInfo") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        const url = tabs[0].url;
        const domain = new URL(url as string).hostname;
        sendResponse({ url, domain });
      } else {
        sendResponse({ error: "No active tab found" });
      }
    });
    return true;
  }
  if (request.action === "logout") {
    chrome.storage.local.remove(["isLogged", "loginTime", "token", "key"]);
    sendResponse({ success: true });
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.remove(["isLogged", "loginTime", "token", "key"]);
});
