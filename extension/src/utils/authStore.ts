export const isLogged = (callback: (value: boolean) => void) => {
  chrome.storage.local.get(
    ["isLogged", "loginTime"],
    ({ isLogged, loginTime }) => {
      const now = Date.now();
      if (isLogged && now - loginTime < 3600_000) {
        callback(true);
      } else {
        chrome.storage.local.remove(["isLogged", "loginTime"]);
        callback(false);
      }
    },
  );
};

export const getKeyAndTokenFromStorage = (): Promise<{
  key: string;
  token: string;
} | null> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["key", "token"], ({ key, token }) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        // Check if both key and token are valid (not undefined or null)
        if (key && token) {
          resolve({ key, token });
        } else {
          resolve(null);
        }
      }
    });
  });
};
