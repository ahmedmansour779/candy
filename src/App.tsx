import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import ProgressBar from "./components/shared/ProgressBar";
import { ThemeProvider } from "./theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} fallbackElement={<ProgressBar />} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
