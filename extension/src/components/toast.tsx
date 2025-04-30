import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose: () => void;
};

export default function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  const icon =
    type === "success" ? (
      <CheckCircleIcon className="w-5 h-5 text-white" />
    ) : (
      <XCircleIcon className="w-5 h-5 text-white" />
    );

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
  const progressColor = type === "success" ? "bg-green-800" : "bg-red-800";

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = 100 - (elapsed / duration) * 100;

      if (percentage <= 0) {
        clearInterval(interval);
        onClose();
      } else {
        setProgress(percentage);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    <div className="flex items-center gap-4 w-full px-6">
      <div
        className={`text-white rounded-md shadow-md flex items-center relative justify-between gap-4 p-4 w-full overflow-hidden animate-fade-in ${bgColor}`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{message}</span>
        </div>
        <XMarkIcon
          className="text-white w-5 h-5 cursor-pointer hover:text-gray-200"
          onClick={onClose}
        />
        <div
          className={`absolute bottom-0 left-0 h-1 w-full rounded-b overflow-hidden ${progressColor}`}
        >
          <div
            className="bg-white h-1 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
