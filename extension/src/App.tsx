import { useEffect, useState } from "react";
import "./App.css";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Dashboard from "./pages/dashboard";
import { isLogged } from "./utils/authStore";
import ToastManager from "./components/toastManager";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { ToastContainer, showToast } = ToastManager();

  useEffect(() => {
    isLogged(setIsAuthenticated);
  }, []);

  const [display, setDisplay] = useState(
    isAuthenticated ? "dashboard" : "signin",
  );
  useEffect(() => {
    if (isAuthenticated) {
      setDisplay("dashboard");
    } else {
      setDisplay("signin");
    }
  }, [isAuthenticated]);

  return (
    <div className="select-none h-[600px] w-[380px] bg-black flex items-center justify-center overflow-hidden">
      <ToastContainer />
      {display === "dashboard" ? (
        <Dashboard
          setIsAuthenticated={setIsAuthenticated}
          showToast={showToast}
        />
      ) : display === "signin" ? (
        <SignIn
          showToast={showToast}
          setDisplay={setDisplay}
          setIsAuthenticated={setIsAuthenticated}
        />
      ) : (
        <SignUp
          showToast={showToast}
          setIsAuthenticated={setIsAuthenticated}
          setDisplay={setDisplay}
        />
      )}
    </div>
  );
}

export default App;
