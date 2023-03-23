import { FC, Fragment } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Calculator, Home, Form, Mocking, Interceptor, Login } from "@/components";
import routes from "@/routes";

const App: FC = () => {
  return (
    <Fragment>
      <nav className="fixed w-screen top-0 px-10 py-5">
        <ul className="flex justify-center gap-6">
          {routes.map((route, i) => (
            <li key={i}>
              <Link className="text-xl" to={route.path}>
                {route.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/form" element={<Form />} />
        <Route path="/mocking" element={<Mocking />} />
        <Route path="/interceptor" element={<Interceptor />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Fragment>
  );
};

export default App;
