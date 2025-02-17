import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "./context/ThemeProvider";
import Flights from "./pages/Flights";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>
          <Flights />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
