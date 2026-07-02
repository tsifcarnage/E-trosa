import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import DashboardLayout from "./layouts/DashboardLayout"

//cache global
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //evite refetch
      retry: 1,
    }
  }
})
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout />
    </QueryClientProvider>
  )
}

export default App
