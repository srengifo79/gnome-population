import { QueryClient, QueryClientProvider } from "react-query";

import Landing from "./pages/landing/Landing";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Landing />
    </QueryClientProvider>
  );
}

export default App;
