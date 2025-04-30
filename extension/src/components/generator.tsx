import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { generatePassword } from "../utils/passwordGenerator";
import { copyToClipboard } from "../utils/copyToClipboard";

export const Generator = ({
  showToast,
}: {
  showToast: (message: string, type?: "success" | "error") => void;
}) => {
  const [passLength, setPassLength] = useState(14);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [minNumbers, setMinNumbers] = useState(1);
  const [minSymbols, setMinSymbols] = useState(0);
  const [password, setPassword] = useState(
    generatePassword({
      totalLength: passLength,
      numSymbols: minSymbols,
      numNumbers: minNumbers,
    }),
  );
  return (
    <div className="justify-center px-5 text-white flex flex-col items-center w-full h-full gap-6">
      <div className="bg-white/20 w-full h-18 rounded-lg flex justify-between items-center p-4 text-lg">
        <div className="select-text">{password}</div>
        <div className="flex gap-4 mr-2">
          <ArrowPathIcon
            className="h-5 w-5 text-white cursor-pointer hover:text-purple-500"
            onClick={() => {
              setPassword(
                generatePassword({
                  totalLength: passLength,
                  numSymbols: minSymbols,
                  numNumbers: minNumbers,
                }),
              );
            }}
          />
          <ClipboardDocumentIcon
            className="h-5 w-5 text-white cursor-pointer hover:text-purple-500"
            onClick={() => {
              copyToClipboard(password);
              showToast("Password copied", "success");
            }}
          />
        </div>
      </div>
      <div className="gap-1 flex flex-col text-white text-sm font-semibold w-full">
        <div className="mr-auto w-full">Options</div>
        <div className="w-full p-4 bg-white/20 rounded-lg">
          <div className="text-xs text-white/60 ml-1">Length</div>
          <input
            value={passLength}
            type="number"
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d+$/.test(val) || val === "") {
                setPassLength(parseInt(val));
              }
            }}
            className="mt-1 p-3 py-2 w-full text-white border border-white/60 rounded-lg text-sm hover:border-purple-500/60 focus:border-purple-500 focus:outline-none focus:border-2"
          />
          <div className="text-xs text-white/60 ml-1 mt-2 font-normal">
            Value must be between 5 and 128. Use 14 characters or more to
            generate a stronger password.
          </div>
        </div>
      </div>
      <div className="flex bg-white/20 w-full rounded-lg p-4 flex-col gap-2">
        <div>Include</div>
        <div className="flex justify-between mt-2">
          <div>
            <input
              type="checkbox"
              checked={upper}
              onChange={() => setUpper(!upper)}
            />
            <span className="ml-2 text-sm">A-Z</span>
          </div>
          <div>
            <input
              type="checkbox"
              checked={lower}
              onChange={() => setLower(!lower)}
            />
            <span className="ml-2 text-sm">a-z</span>
          </div>

          <div>
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            <span className="ml-2 text-sm">0-9</span>
          </div>
          <div>
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />
            <span className="ml-2 text-sm">!@#$%^&</span>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex flex-col w-full">
            <div className="text-xs text-white/60 ml-1">Min numbers</div>
            <input
              value={minNumbers}
              type="number"
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d+$/.test(val) || val === "") {
                  setMinNumbers(parseInt(val));
                }
              }}
              className="mt-1 p-3 py-2 w-full text-white border border-white/60 rounded-lg text-sm hover:border-purple-500/60 focus:border-purple-500 focus:outline-none focus:border-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="text-xs text-white/60 ml-1">Min special</div>
            <input
              value={minSymbols}
              type="number"
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d+$/.test(val) || val === "") {
                  setMinSymbols(parseInt(val));
                }
              }}
              className="mt-1 p-3 py-2 w-full text-white border border-white/60 rounded-lg text-sm hover:border-purple-500/60 focus:border-purple-500 focus:outline-none focus:border-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
