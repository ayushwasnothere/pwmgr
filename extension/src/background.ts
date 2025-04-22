chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "getTabInfo") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(tabs);
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
});
