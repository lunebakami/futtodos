const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export interface Post {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    author?: {
        id: string;
        name: string;
        email: string;
    };
}

export async function getAllPosts(): Promise<Post[]> {
    try {
        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getPostById(id: string): Promise<Post | null> {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const response = await fetch(`${API_URL}/posts/slug/${slug}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
} 