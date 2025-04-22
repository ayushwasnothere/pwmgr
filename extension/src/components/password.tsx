import { ClipboardDocumentIcon, GlobeAltIcon } from "@heroicons/react/24/solid";
import { copyToClipboard } from "../utils/copyToClipboard";

interface Password {
  tag?: string;
  username?: string;
  password?: string;
  url?: string;
  note?: string;
}

export const Password = ({
  password,
  onClick,
}: {
  password: Password;
  onClick: () => void;
}) => {
  return (
    <div className="w-full flex text-white bg-white/20 rounded-lg p-4 py-2 hover:bg-purple-500/20 cursor-pointer transition-all duration-200 ease-in-out">
      <div className="flex w-full" onClick={onClick}>
        <div className="flex items-center gap-4 mr-auto">
          <GlobeAltIcon className="h-6 w-6 text-purple-500" />
          <div className="flex flex-col text-sm">
            {password.tag}
            <div className="text-[10px] text-gray-400">{password.username}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center mr-2">
        <ClipboardDocumentIcon
          className="h-5 w-5 text-white cursor-pointer hover:text-purple-500"
          onClick={() => {
            copyToClipboard(String(password.password));
          }}
        />
      </div>
    </div>
  );
};
