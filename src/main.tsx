import React from "react";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./global.css";

// import App from "./App";
// import Resume from "./components/Resume";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          // element: <App />,
          lazy: async () => ({ Component: (await import("./App")).default }),
        },
        {
          path: "/resume",
          // element: <Resume />,
          lazy: async () => ({
            Component: (await import("./components/resume/Index")).default,
          }),
        },
      ])}
    />
  </React.StrictMode>
);
