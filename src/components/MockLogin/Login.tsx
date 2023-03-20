import { FC, Fragment, useState, useEffect } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { ILoginRequest, ILoginResponse, IUser, IAuthorizationResponse } from "./types";
import { WelcomeBox, ResetButton } from "./components";

const LOGIN_ENDPOINT = "https://playwright.free.beeceptor.com/mock-login";
const AUTH_ENDPOINT = "https://playwright.free.beeceptor.com/mock-authorize";

const Login: FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean[]>([false, false]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    token && authorize(token);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & ILoginRequest;

    if (validate(target)) {
      login(target);
    }
  };

  const login = async (info: ILoginRequest) => {
    setLoading(true);
    try {
      const res = await axios.post<ILoginResponse>(LOGIN_ENDPOINT, {
        id: info.id.value,
        password: info.password.value,
      });

      const token = res.data.access_token;
      const decodedInfo = jwt_decode(token) as IUser;
      localStorage.setItem("access_token", token);

      setUser(decodedInfo);
      notify("Login successful");
    } catch {
      setUser(null);
      notify("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const authorize = async (token: string) => {
    setLoading(true);
    try {
      const res = await axios.get<IAuthorizationResponse>(AUTH_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser({
        name: res.data.name,
        age: res.data.age,
        dob: res.data.dob,
      });
      notify("Login successful");
    } catch {
      setUser(null);
      notify("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const validate = (info: ILoginRequest) => {
    const { id, password } = info;
    const errors = [false, false];
    errors[0] = id.value === "";
    errors[1] = password.value === "";
    setErrors(errors);
    return !errors.some((e) => e);
  };

  const notify = (msg: string) => toast(msg);

  return (
    <Fragment>
      <ResetButton />
      <ToastContainer />
      <LoadingOverlay active={loading} spinner text="Loading..." />
      {!user ? (
        <div className="h-screen flex justify-center items-center">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                This a mock login page
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your ID"
                  />
                  {errors[0] && (
                    <span className="text-red block text-sm mt-1 pl-2">ID is missing</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors[1] && (
                    <span className="text-red block text-sm mt-1 pl-2">Password is missing</span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <WelcomeBox name={user.name} age={user.age} dob={user.dob} />
      )}
    </Fragment>
  );
};

export default Login;
