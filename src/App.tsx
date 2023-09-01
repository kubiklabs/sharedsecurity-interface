import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SideBar from "./components/Navigation/SideBar";
import { RecoilRoot } from "recoil";
import Header from "./components/Navigation/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <SideBar />
      <Header />
    </RecoilRoot>
  );
}

export default App;
