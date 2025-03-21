import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { IUserInput, ILoginInput } from '../types';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const data = req.body as IUserInput;
      const user = await userService.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const data = req.body as Partial<IUserInput>;
      const user = await userService.updateUser(req.params.id, data);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body as ILoginInput;
      const result = await userService.login(data);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }
} 