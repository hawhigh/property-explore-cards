
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import Index from '@/pages/Index';
import SingleProperty from '@/pages/SingleProperty';
import SinglePropertyView from '@/pages/SinglePropertyView';
import PropertyDetail from '@/pages/PropertyDetail';
import Dashboard from '@/pages/Dashboard';
import PropertyManagement from '@/pages/PropertyManagement';
import Auth from '@/pages/Auth';
import SimplifiedAdminDashboard from '@/components/admin/SimplifiedAdminDashboard';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/property-view/:id" element={<SinglePropertyView />} />
            <Route path="/villa-lucilla" element={<SingleProperty />} />
            <Route path="/single" element={<SingleProperty />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/property-management" element={<PropertyManagement />} />
            <Route path="/admin" element={<SimplifiedAdminDashboard />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
