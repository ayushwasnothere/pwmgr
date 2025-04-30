import { useState } from "react";
import Toast from "./toast";

let id = 0;

type ToastItem = {
  id: number;
  message: string;
  type?: "success" | "error";
};

export default function ToastManager() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    const newToast = { id: id++, message, type };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (idToRemove: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== idToRemove));
  };

  return {
    ToastContainer: () => (
      <div className="fixed top-6 left-0 w-full overflow-hidden flex flex-col z-100 items-center text-white gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    ),
    showToast,
  };
}
