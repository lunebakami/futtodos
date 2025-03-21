import { PrismaClient } from '@prisma/client';
import { ICreateBlogInput, IUpdateBlogInput } from '../types';
import { generateSlug } from '../utils/slug';

const prisma = new PrismaClient();

export class PostService {
  async createPost(data: ICreateBlogInput, authorId: string) {
    const slug = generateSlug(data.title);
    return prisma.post.create({
      data: {
        ...data,
        authorId,
        slug,
      },
      include: {
        author: true,
      },
    });
  }

  async getPosts() {
    return prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  async getPostById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async getPostBySlug(slug: string) {
    return prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
      },
    });
  }

  async updatePost(id: string, data: IUpdateBlogInput) {
    const updateData = { ...data };
    if (data.title) {
      updateData.slug = generateSlug(data.title);
    }
    return prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        author: true,
      },
    });
  }

  async deletePost(id: string) {
    return prisma.post.delete({
      where: { id },
    });
  }
} 