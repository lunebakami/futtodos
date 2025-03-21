export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BlogPost {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    slug?: string;
    authorId: string;
    author?: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
}

export interface UpdateUserDto {
    email?: string;
    name?: string;
    password?: string;
}

export interface CreateBlogPostDto {
    title: string;
    description: string;
    imageUrl?: string;
    slug?: string;
}

export interface UpdateBlogPostDto {
    title?: string;
    description?: string;
    imageUrl?: string;
    slug?: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    user: User;
} 