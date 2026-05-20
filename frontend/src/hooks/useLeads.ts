import { useState, useEffect, useCallback } from 'react';
import { Lead, LeadFilters, PaginationMeta } from '../types';
import { fetchLeads } from '../api/leads.api';
import { useDebounce } from './useDebounce';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<LeadFilters>({
    status: '',
    source: '',
    search: '',
    sort: 'latest',
    page: 1,
  });

  const debouncedSearch = useDebounce(filters.search, 400);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = { ...filters, search: debouncedSearch };
      const res = await fetchLeads(params);
      setLeads(res.data.data);
      setMeta(res.data.meta);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => { load(); }, [load]);

  const updateFilter = (key: keyof LeadFilters, value: string | number) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: key !== 'page' ? 1 : value as number }));

  return { leads, meta, isLoading, error, filters, updateFilter, reload: load };
};