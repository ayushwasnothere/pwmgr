import { LockClosedIcon as LockOutline } from "@heroicons/react/24/outline";
import { LockClosedIcon as LockSolid } from "@heroicons/react/24/solid";
import { ArrowPathIcon as GenerateOutline } from "@heroicons/react/24/outline";
import { ArrowPathIcon as GenerateSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Generator } from "../components/generator";
import Vault from "../components/vault";

export default function Dashboard() {
  const [tab, setTab] = useState("vault");
  return (
    <div className="h-full w-full flex flex-col bg-black items-center justify-center">
      <div className="w-full h-20 bg-white/10 px-4 text-white flex items-center justify-between text-2xl font-bold">
        <div>{tab === "generate" ? "Generator" : "Passwords"}</div>
      </div>
      {tab === "generate" ? <Generator /> : <Vault />}
      <div className="w-full h-20 bg-white/10 flex">
        <div
          className="w-1/2 h-full flex justify-center items-center hover:bg-purple-500/20 cursor-pointer"
          onClick={() => setTab("vault")}
        >
          {tab === "vault" ? (
            <div className="flex flex-col items-center justify-center text-purple-500 text-xs font-bold">
              <LockSolid className="h-6 w-6" />
              Vault
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300 text-xs font-bold">
              <LockOutline className="h-6 w-6" />
              Vault
            </div>
          )}
        </div>
        <div
          className="w-1/2 h-full flex justify-center items-center hover:bg-purple-500/20 cursor-pointer"
          onClick={() => setTab("generate")}
        >
          {tab === "generate" ? (
            <div className="flex flex-col items-center justify-center text-purple-500 text-xs font-bold hover:">
              <GenerateSolid className="h-6 w-6" />
              Generate
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300 text-xs font-bold">
              <GenerateOutline className="h-6 w-6" />
              Generate
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
