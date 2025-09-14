import { useState } from "react";
import { BottomLabel } from "../components/bottomLabel";
import { PurpleButton } from "../components/button";
import { PasswordInput } from "../components/passwordInput";
import { cryptoKeyToBase64, deriveKey } from "../utils/encryption";

export default function SignUp({
  setDisplay,
  setIsAuthenticated,
  showToast,
}: {
  setDisplay: (display: string) => void;
  showToast: (message: string, type?: "success" | "error") => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-5 px-10">
      <div className="text-white font-bold text-4xl mb-8">Create Account</div>
      <div className="w-full max-w-[400px]">
        <div className="text-xs text-white/60">Username</div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <div className="text-xs text-white/60 px-0.5">
        This is the master password. It cannot be recovered again if forgotten.
      </div>
      <PurpleButton
        name="Create Account"
        onClick={async () => {
          if (password !== confirmPassword || !username) {
            console.log("Passwords do not match or username is empty");
            return;
          }
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/user/signup`,
            {
              body: JSON.stringify({ username, password }),
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
          );
          if (res.status !== 200) {
            const data = await res.json();
            showToast(data.message, "error");
            console.log("Error signing up");
            return;
          }
          const data = await res.json();
          const derivedKey = await deriveKey(password, data.salt);
          chrome.storage.local.set({
            isLogged: true,
            loginTime: Date.now(),
            token: data.token,
            key: await cryptoKeyToBase64(derivedKey),
          });

          setIsAuthenticated(true);
          showToast("Account created", "success");
        }}
      />
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
