
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const MyProperties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new property management page
    navigate('/property-management');
  }, [navigate]);

  return null;
};

export default MyProperties;
