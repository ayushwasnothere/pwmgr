import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface PasswordInputProps {
  placeholder: string;
  password: string;
  setPassword: (password: string) => void;
}

export const PasswordInput = ({
  placeholder,
  password,
  setPassword,
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mt-1 relative">
      <input
        type={isPasswordVisible ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 py-4 w-full text-white rounded-lg bg-white/15 text-sm"
        placeholder={placeholder}
      />

      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        {isPasswordVisible ? (
          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  );
};
