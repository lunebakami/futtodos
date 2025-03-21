import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
    if (browser) {
        const token = localStorage.getItem('token');
        const currentPath = url.pathname;

        // If there's no token and we're not on the login page, redirect to login
        if (!token && currentPath !== '/login') {
            goto('/login');
            return {
                authenticated: false
            };
        }

        // If there's a token and we're on the login page, redirect to home
        if (token && currentPath === '/login') {
            goto('/');
            return {
                authenticated: true
            };
        }

        return {
            authenticated: !!token
        };
    }

    return {
        authenticated: false
    };
}; 