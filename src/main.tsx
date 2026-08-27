import React from "react";

import posthogClient from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./global.css";

posthogClient.init(import.meta.env.VITE_POSTHOG_KEY as string, {
  api_host: import.meta.env.VITE_POSTHOG_HOST as string,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PostHogProvider client={posthogClient}>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            // element: <App />,
            HydrateFallback: () => null,
            lazy: async () => ({ Component: (await import("./App")).default }),
          },
          {
            path: "/resume",
            // element: <Resume />,
            HydrateFallback: () => null,
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
  </React.StrictMode>,
);
