import { Router } from 'express';
import multer from 'multer';
import { StorageController } from '../controllers/storage.controller';
import { auth } from '../middleware/auth';

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Apply authentication middleware to all routes
router.use(auth);

// Upload a single file
router.post('/upload', upload.single('file'), StorageController.uploadFile);

// Delete a file
router.delete('/files/:filename', StorageController.deleteFile);

// Get a signed URL for a file
router.get('/files/:filename/url', StorageController.getFileUrl);

export default router; 