import axios from 'axios';
import type { User, BlogPost, CreateUserDto, UpdateUserDto, CreateBlogPostDto, UpdateBlogPostDto, ILoginInput, ILoginResponse } from '$lib/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// User operations
export const userService = {
    getAll: () => api.get<User[]>('/users'),
    getById: (id: string) => api.get<User>(`/users/${id}`),
    create: (data: CreateUserDto) => api.post<User>('/users', data),
    update: (id: string, data: UpdateUserDto) => api.put<User>(`/users/${id}`, data),
    delete: (id: string) => api.delete(`/users/${id}`),
    login: (data: ILoginInput) => api.post<ILoginResponse>('/users/login', data)
};

// Blog post operations
export const blogService = {
    getAll: () => api.get<BlogPost[]>('/posts'),
    getById: (id: string) => api.get<BlogPost>(`/posts/${id}`),
    getBySlug: (slug: string) => api.get<BlogPost>(`/posts/slug/${slug}`),
    create: (data: CreateBlogPostDto) => api.post<BlogPost>('/posts', data),
    update: (id: string, data: UpdateBlogPostDto) => api.put<BlogPost>(`/posts/${id}`, data),
    delete: (id: string) => api.delete(`/posts/${id}`)
};

export const storageService = {
    uploadFile: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/storage/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    },
    deleteFile: (filename: string) => api.delete(`/storage/files/${filename}`),
    getFileUrl: (filename: string) => api.get(`/storage/files/${filename}/url`)
}; 