import { Layout } from "./components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>Test</Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
