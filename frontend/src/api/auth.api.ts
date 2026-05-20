import api from './axios';
import { User, ApiResponse } from '../types';

interface AuthPayload { token: string; user: User; }

export const registerUser = (data: { name: string; email: string; password: string; role?: string }) =>
  api.post<ApiResponse<AuthPayload>>('/auth/register', data);

export const loginUser = (data: { email: string; password: string }) =>
  api.post<ApiResponse<AuthPayload>>('/auth/login', data);

export const getMe = () =>
  api.get<ApiResponse<User>>('/auth/me');