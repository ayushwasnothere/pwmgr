import { useState } from "react";
import { BottomLabel } from "../components/bottomLabel";
import { PurpleButton } from "../components/button";
import { PasswordInput } from "../components/passwordInput";

export default function SignUp({
  setDisplay,
}: {
  setDisplay: (display: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-5 px-10">
      <div className="text-white font-bold text-4xl mb-8">Create Account</div>
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
      <div className="w-full max-w-[400px]">
        <div className="text-xs text-white/60">Confirm Password</div>
        <PasswordInput
          placeholder="Re-enter password"
          password={confirmPassword}
          setPassword={setConfirmPassword}
        />
      </div>
      <PurpleButton name="Create Account" onClick={() => {}} />
      <BottomLabel
        label="Already have an account?"
        clickable="Login"
        onClick={() => {
          setDisplay("signin");
        }}
      />
    </div>
  );
}
