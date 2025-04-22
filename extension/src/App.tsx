import { useState } from "react";
import "./App.css";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Dashboard from "./pages/dashboard";

function App() {
  const [display, setDisplay] = useState("dashboard");
  return (
    <div className="select-none h-[600px] w-[380px] bg-black flex items-center justify-center overflow-hidden">
      {display === "dashboard" ? (
        <Dashboard />
      ) : display === "signin" ? (
        <SignIn setDisplay={setDisplay} />
      ) : (
        <SignUp setDisplay={setDisplay} />
      )}
    </div>
  );
}

export default App;
