import React from "react";

import posthogClient from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useRouteError,
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
            ErrorBoundary: RouteErrorBoundary,
            lazy: async () => ({ Component: (await import("./App")).default }),
          },
          {
            path: "/resume",
            // element: <Resume />,
            HydrateFallback: () => null,
            ErrorBoundary: RouteErrorBoundary,
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

function RouteErrorBoundary() {
  const error = useRouteError();

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-accent font-mono text-sm">route error</p>
      <h1 className="text-text-hi mt-4 text-4xl">This page stumbled.</h1>
      <p className="mt-4">
        {error instanceof Error ? error.message : "Please try again."}
      </p>
      <button
        className="text-accent mt-8"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </main>
  );
}
