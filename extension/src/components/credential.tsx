import {
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { copyToClipboard } from "../utils/copyToClipboard";
import { getKeyAndTokenFromStorage } from "../utils/authStore";

interface CredentialProps {
  tag?: string;
  username?: string;
  password?: string;
  id?: number;
  url?: string;
  onEdit?: () => void;
  setShow?: (show: boolean) => void;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const Credential = ({
  tag,
  username,
  password,
  url,
  id,
  onEdit,
  setShow,
  showToast,
}: CredentialProps) => {
  return (
    <div className="w-full flex flex-col justify-between">
      <div className="w-full flex flex-col text-white p-4 gap-6 overflow-y-auto">
        <div className="w-full felx flex-col text-sm">
          <div className="ml-1 font-bold">Item Details</div>
          <div className="w-full flex flex-col p-4 bg-white/20 rounded-lg mt-1 py-4 gap-2">
            <div className="text-xs text-gray-400">Item name</div>
            <div className="select-text">{tag || "Untagged"}</div>
          </div>
        </div>
        <div className="w-full felx flex-col text-sm">
          <div className="ml-1 font-bold">Login credentials</div>
          <div className="w-full flex flex-col p-4 bg-white/20 rounded-lg mt-1 py-4 gap-2">
            <div className="w-full flex flex-col gap-2 border-b border-white/30 pb-4">
              <div className="text-xs text-gray-400">Username</div>
              <div className="flex items-center justify-between">
                <div className="select-text">{username || ""}</div>
                <ClipboardDocumentIcon
                  className="h-5 w-5 mr-2 text-white cursor-pointer hover:text-purple-500"
                  onClick={() => {
                    if (username) {
                      showToast("Username copied", "success");
                      copyToClipboard(username);
                    }
                  }}
                />
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-4">Password</div>
            <div className="flex items-center justify-between">
              <div className="select-text">{password || ""}</div>
              <ClipboardDocumentIcon
                className="h-5 w-5 mr-2 text-white cursor-pointer hover:text-purple-500"
                onClick={() => {
                  if (password) {
                    showToast("Password copied", "success");
                    copyToClipboard(password);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full felx flex-col text-sm">
          <div className="ml-1 font-bold">Website</div>
          <div className="w-full flex flex-col p-4 bg-white/20 rounded-lg mt-1 py-4 gap-2">
            <div className="text-xs text-gray-400">URL</div>
            <div className="flex justify-between items-center">
              <div className="select-text">{url || ""}</div>
              <div className="flex gap-2">
                <ArrowTopRightOnSquareIcon
                  className="h-5 w-5 mr-2 text-white cursor-pointer hover:text-purple-500"
                  onClick={() => {
                    chrome.tabs.create({ url });
                  }}
                />
                <ClipboardDocumentIcon
                  className="h-5 w-5 mr-2 text-white cursor-pointer hover:text-purple-500"
                  onClick={() => {
                    if (url) {
                      showToast("URL copied", "success");
                      copyToClipboard(url);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-16 bg-white/10 p-4 py-3 justify-between items-center">
        <div
          className="bg-purple-500 hover:bg-purple-500/70 font-bold text-white rounded-full px-4 py-2 flex justify-center items-center"
          onClick={onEdit}
        >
          Edit
        </div>
        <TrashIcon
          className="h-5 w-5 mr-2 text-red-500 cursor-pointer hover:scale-125"
          onClick={async () => {
            const data = await getKeyAndTokenFromStorage();
            if (!data) {
              console.error("Failed to get key and token from storage");
              return;
            }
            const { token } = data;
            if (!token) {
              console.error("Encryption token is null");
              return;
            }
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/creds/${id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              },
            );
            if (res.status !== 200) {
              console.error("Failed to delete credential");
              return;
            }
            if (setShow) {
              setShow(false);
              showToast("Credential deleted", "success");
            }
          }}
        />
      </div>
    </div>
  );
};
