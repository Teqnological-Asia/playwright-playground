import { FC } from "react";
import "./index.css";
import reactLogo from "./react.svg";
import playwrightLogo from "./playwright-logo.svg";

const Home: FC = () => {
  return (
    <div className="home-container">
      <div className="App">
        <h2 className="text-3xl font-bold">This is a Playwright Playground</h2>
        <div className="flex justify-center py-4">
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://playwright.dev/" target="_blank" rel="noreferrer">
            <img src={playwrightLogo} className="logo playwright" alt="Playwright logo" />
          </a>
        </div>
        <h1 className="text-xl font-bold">Vite + React + Playwright</h1>
        <div className="card">Developed by Truong Le</div>
      </div>
    </div>
  );
};

export default Home;
