import { FC, Fragment } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Calculator, Home, Form } from "./components";

const App: FC = () => {
  return (
    <Fragment>
      <nav className="fixed w-screen top-0 px-10 py-5">
        <ul className="flex gap-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calculator">Calculator</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Fragment>
  );
};

export default App;
