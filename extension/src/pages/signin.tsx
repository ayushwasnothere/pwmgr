import { useState } from "react";
import { BottomLabel } from "../components/bottomLabel";
import { PurpleButton } from "../components/button";
import { PasswordInput } from "../components/passwordInput";

export default function SignIn({
  setDisplay,
}: {
  setDisplay: (display: string) => void;
}) {
  const [password, setPassword] = useState("");
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-5 px-10">
      <div className="text-white font-bold text-4xl mb-8">Login</div>
      <div className="w-full max-w-[400px]">
        <div className="text-xs text-white/60">Username</div>
        <input
          type="text"
          className="mt-1 p-3 py-4 w-full text-white rounded-lg bg-white/15 text-sm"
          placeholder="Enter username"
        />
      </div>
      <div className="w-full max-w-[400px]">
        <div className="text-xs text-white/60">Password</div>
        <PasswordInput
          placeholder="Enter password"
          password={password}
          setPassword={setPassword}
        />
      </div>
      <PurpleButton name="Login" onClick={() => {}} />
      <BottomLabel
        label="Don't have an account?"
        clickable="Create Account"
        onClick={() => {
          setDisplay("signup");
        }}
      />
    </div>
  );
}
