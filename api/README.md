# Blog API with JWT Authentication

A RESTful API for managing blog posts with JWT authentication.

## Features

- JWT Authentication
- CRUD operations for blog posts
- PostgreSQL database with Prisma ORM
- TypeScript support
- File upload support (separated from core logic)
- Swagger API documentation
- Docker support for PostgreSQL
- Database seeders

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (or Docker for running PostgreSQL)
- npm or yarn

## Setup

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blog_db?schema=public"
   JWT_SECRET="your-super-secret-key-change-this-in-production"
   PORT=3000
   ```

4. Start PostgreSQL (using Docker):
   ```bash
   docker-compose up -d
   ```

5. Initialize the database and run seeders:
   ```bash
   npx prisma migrate dev
   npm run prisma:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

The API documentation is available at `/api-docs` when the server is running. This provides an interactive Swagger UI where you can:
- View all available endpoints
- Test the API directly from the browser
- See request/response schemas
- View authentication requirements

## API Endpoints

### Blog Posts

- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a specific blog post
- `POST /api/blogs` - Create a new blog post (requires authentication)
- `PUT /api/blogs/:id` - Update a blog post (requires authentication)
- `DELETE /api/blogs/:id` - Delete a blog post (requires authentication)

### Authentication

The API uses JWT authentication. Protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database with sample data

## Docker Commands

- `docker-compose up -d` - Start PostgreSQL in detached mode
- `docker-compose down` - Stop PostgreSQL
- `docker-compose logs -f` - View PostgreSQL logs
- `docker-compose ps` - Check PostgreSQL container status

## File Upload

The file upload functionality is separated from the core logic to allow for different implementations (e.g., local storage, cloud storage). You can implement your preferred file upload solution by creating a new service and integrating it with the blog service.

## Sample Users

The seeder creates two sample users:

1. Admin User
   - Email: admin@example.com
   - Password: admin123

2. Editor User
   - Email: editor@example.com
   - Password: editor123 