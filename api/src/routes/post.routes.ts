import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { auth } from '../middleware/auth';

const router = Router();
const postController = new PostController();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.get('/slug/:slug', postController.getPostBySlug);
router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

export default router; 