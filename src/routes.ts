interface Route {
  path: string;
  title: string;
}

const routes: Route[] = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/calculator",
    title: "Calculator",
  },
  {
    path: "/form",
    title: "Form",
  },
  {
    path: "/mocking",
    title: "API Mocking",
  },
  {
    path: "/interceptor",
    title: "Interceptor",
  },
  {
    path: "/login",
    title: "Mock Login E2E",
  },
  {
    path: "/components",
    title: "Components",
  },
];

export default routes;
