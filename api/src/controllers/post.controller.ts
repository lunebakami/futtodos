import { Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { ICreatePostInput, IUpdatePostInput } from '../types';

const postService = new PostService();

export class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const data = req.body as ICreatePostInput;
      const post = await postService.createPost(data, (req as any).user.id);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create post' });
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      const posts = await postService.getPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const post = await postService.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  }

  async getPostBySlug(req: Request, res: Response) {
    try {
      const post = await postService.getPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const data = req.body as IUpdatePostInput;
      const post = await postService.updatePost(req.params.id, data);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update post' });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const post = await postService.deletePost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }
} 