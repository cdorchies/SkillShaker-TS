import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "./components/templates/headerAuth";
import Footer from "./components/templates/footer";
import { MdOutlineNightlight, MdOutlineLightMode } from "react-icons/md";
import "./app.scss";

export default function App() {
    // LIGHT DARK MODE
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const appClass = isDarkMode ? "dark-mode" : "light-mode";
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      const isDarkModeToString = (!isDarkMode).toString();
      Cookies.set("dark-mode", isDarkModeToString);
    };
  
    useEffect(() => {
      const darkModeCookie = Cookies.get("dark-mode");
      if (darkModeCookie === "true") {
        setIsDarkMode(true);
      }
    }, []);

  return (
    <div id="App" className={"App " + appClass}>
      <Router>
      <div id="LightDarkMode">
            <button className="mode" onClick={toggleDarkMode}>
              {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
            </button>
          </div>
        <Header/>
        <Routes>

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}