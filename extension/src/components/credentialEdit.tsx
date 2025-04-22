import { useEffect, useState } from "react";

export const CredentialEdit = ({
  oldCredential,
}: {
  oldCredential?: {
    tag: string;
    username: string;
    password: string;
    url: string;
  };
}) => {
  const [tag, setTag] = useState(oldCredential?.tag || "");
  const [username, setUsername] = useState(oldCredential?.username || "");
  const [password, setPassword] = useState(oldCredential?.password || "");
  const [url, setUrl] = useState(oldCredential?.url || "");

  useEffect(() => {
    const fetchTabInfo = async () => {
      chrome.runtime.sendMessage({ action: "getTabInfo" }, (response) => {
        if (response && response.url && response.domain) {
          setUrl(response.url);
          setTag(response.domain);
        } else {
          console.error("Error fetching tab info", response.error);
        }
      });
    };
    if (!oldCredential) fetchTabInfo();
  }, [oldCredential]);

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div className="w-full flex flex-col text-white p-4 gap-6 h-[473px] overflow-y-auto">
        <div className="w-full felx flex-col text-sm">
          <div className="ml-1 font-bold">Item Details</div>
          <div className="w-full flex flex-col p-4 bg-white/20 rounded-lg mt-1 py-4">
            <div className="text-xs text-gray-400">Item name</div>
            <input
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
              type="text"
              className="mt-1 p-3 py-2 w-full text-white border border-white/60 rounded-lg text-sm hover:border-purple-500/60 focus:border-purple-500 focus:outline-none focus:border-2"
            />
          </div>
        </div>
        <div className="w-full felx flex-col text-sm">
          <div className="ml-1 font-bold">Login credentials</div>
          <div className="w-full flex flex-col p-4 bg-white/20 rounded-lg mt-1 py-4">
            <div className="w-full flex flex-col border-b border-white/30 pb-4">
              <div className="text-xs text-gray-400">Username</div>
              <div className="flex items-center justify-between">
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  className="mt-1 p-3 py-2 w-full text-white border border-white/60 rounded-lg text-sm hover:border-purple-500/60 focus:border-purple-500 focus:outline-none focus:border-2"
                />
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-4">Password</div>
            <div className="flex items-center justify-between">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                className="mt-1 p-3 py-2 w-full text-white border border-white/60 rounded-lg text-sm hover:border-purple-500/60 focus:border-purple-500 focus:outline-none focus:border-2"
              />
            </div>
          </div>
        </div>
        <div className="w-full felx flex-col text-sm">
          <div className="ml-1 font-bold">Website</div>
          <div className="w-full flex flex-col p-4 bg-white/20 rounded-lg mt-1 py-4">
            <div className="text-xs text-gray-400">URL</div>
            <div className="flex justify-between items-center">
              <input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                type="text"
                className="mt-1 p-3 py-2 w-full text-white border border-white/60 rounded-lg text-sm hover:border-purple-500/60 focus:border-purple-500 focus:outline-none focus:border-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-16 bg-white/10 p-4 py-3 justify-between items-center">
        <div className="bg-purple-500 hover:bg-purple-500/70 font-bold text-white rounded-full px-4 py-2 flex justify-center items-center">
          Save
        </div>
      </div>
    </div>
  );
};
