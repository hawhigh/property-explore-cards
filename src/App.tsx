import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import SingleProperty from '@/pages/SingleProperty';
import PropertyDetail from '@/pages/PropertyDetail';
import Dashboard from '@/pages/Dashboard';
import PropertyManagement from '@/pages/PropertyManagement';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/villa-lucilla" element={<SingleProperty />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/property-management" element={<PropertyManagement />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
