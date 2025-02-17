import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "./context/ThemeProvider";
import Flights from "./pages/Flights";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>
          <Flights />
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
