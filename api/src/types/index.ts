import { User } from '@prisma/client';

export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlog {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  slug?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author?: IUser;
}

export interface ICreatePostInput {
  title: string;
  description: string;
  imageUrl?: string;
  slug?: string;
}

export interface IUpdatePostInput {
  title?: string;
  description?: string;
  imageUrl?: string;
  slug?: string;
}

export interface IUserInput {
  email: string;
  password: string;
  name: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostResponse {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author?: IUserResponse;
} 