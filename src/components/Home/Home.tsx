import { FC, useState } from "react";
import "./index.css";
import reactLogo from "./react.svg";

const Home: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="home-container">
      <div className="App">
        <h2 className="text-2xl font-bold">This is a Playwright Playground</h2>
        <div className="flex justify-center">
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  );
};

export default Home;
