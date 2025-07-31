import React from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./global.css";

posthog.init(import.meta.env.VITE_POSTHOG_KEY as string, {
  api_host: import.meta.env.VITE_POSTHOG_HOST as string,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
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
          {
            path: "*",
            element: <Navigate to="/" replace />,
          },
        ])}
      />
    </PostHogProvider>
  </React.StrictMode>
);
