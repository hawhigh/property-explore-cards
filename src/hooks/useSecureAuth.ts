
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useSecureAuth = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('get_current_user_role');
        if (error) throw error;
        setUserRole(data);
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const isAdmin = userRole === 'admin';
  const isAgent = userRole === 'agent';
  const isAuthenticated = !!user;

  return {
    user,
    userRole,
    isAdmin,
    isAgent,
    isAuthenticated,
    isLoading
  };
};
