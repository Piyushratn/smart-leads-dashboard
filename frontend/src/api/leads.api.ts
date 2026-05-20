import api from './axios';
import { Lead, ApiResponse, PaginationMeta, LeadFilters } from '../types';

export const fetchLeads = (filters: Partial<LeadFilters>) =>
  api.get<ApiResponse<Lead[]> & { meta: PaginationMeta }>('/leads', { params: filters });

export const fetchLead = (id: string) =>
  api.get<ApiResponse<Lead>>(`/leads/${id}`);

export const createLead = (data: Partial<Lead>) =>
  api.post<ApiResponse<Lead>>('/leads', data);

export const updateLead = (id: string, data: Partial<Lead>) =>
  api.patch<ApiResponse<Lead>>(`/leads/${id}`, data);

export const deleteLead = (id: string) =>
  api.delete<ApiResponse<null>>(`/leads/${id}`);

export const exportLeadsCSV = () =>
  api.get('/leads/export/csv', { responseType: 'blob' });