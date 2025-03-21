import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateSlug } from '../src/utils/slug';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        name: 'Admin User',
      },
    }),
    prisma.user.create({
      data: {
        email: 'editor@example.com',
        password: await bcrypt.hash('editor123', 10),
        name: 'Editor User',
      },
    }),
    prisma.user.create({
      data: {
        email: 'author@example.com',
        password: await bcrypt.hash('author123', 10),
        name: 'Author User',
      },
    }),
    prisma.user.create({
      data: {
        email: 'user@example.com',
        password: await bcrypt.hash('user123', 10),
        name: 'Regular User',
      },
    }),
  ]);

  // Create posts
  const posts = [
    {
      title: 'Getting Started with TypeScript',
      description: 'Learn the basics of TypeScript and how to use it in your projects.',
      imageUrl: 'https://example.com/typescript.jpg',
      authorId: users[0].id,
    },
    {
      title: 'Building REST APIs with Express',
      description: 'A comprehensive guide to building RESTful APIs using Express.js.',
      imageUrl: 'https://example.com/express.jpg',
      authorId: users[0].id,
    },
    {
      title: 'Docker for Beginners',
      description: 'Understanding Docker and containerization for modern applications.',
      imageUrl: 'https://example.com/docker.jpg',
      authorId: users[1].id,
    },
    {
      title: 'The Future of Web Development',
      description: 'Exploring upcoming trends and technologies in web development.',
      imageUrl: 'https://example.com/future.jpg',
      authorId: users[2].id,
    },
    {
      title: 'Best Practices for API Design',
      description: 'Learn the essential principles for designing robust APIs.',
      imageUrl: 'https://example.com/api.jpg',
      authorId: users[1].id,
    },
  ];

  await prisma.post.createMany({
    data: posts.map(post => ({
      ...post,
      slug: generateSlug(post.title)
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 