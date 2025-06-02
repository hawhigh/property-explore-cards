
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type PropertyStatus = Database['public']['Enums']['property_status'];

interface PropertyFilters {
  search?: string;
  status?: PropertyStatus;
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
}

export const usePropertyManagement = () => {
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ['user-properties', user?.id, filters],
    queryFn: async () => {
      if (!user) return [];

      let query = supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }

      if (filters.priceMin) {
        query = query.gte('price', filters.priceMin);
      }

      if (filters.priceMax) {
        query = query.lte('price', filters.priceMax);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handlePropertyUpdated = () => {
    refetch();
    setEditingProperty(null);
  };

  const handlePropertyAdded = () => {
    refetch();
    setShowAddModal(false);
  };

  // Group properties by status for better organization
  const groupedProperties = properties.reduce((acc, property) => {
    const status = property.status || 'active';
    if (!acc[status]) acc[status] = [];
    acc[status].push(property);
    return acc;
  }, {} as Record<string, typeof properties>);

  return {
    user,
    properties,
    isLoading,
    showAddModal,
    setShowAddModal,
    editingProperty,
    setEditingProperty,
    filters,
    setFilters,
    viewMode,
    setViewMode,
    groupedProperties,
    handlePropertyUpdated,
    handlePropertyAdded,
    refetch
  };
};
