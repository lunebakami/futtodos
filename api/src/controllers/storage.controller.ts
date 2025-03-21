import { Request, Response } from 'express';
import { StorageService, UploadedFile } from '../services/storage.service';

export class StorageController {
    static async uploadFile(req: Request, res: Response): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).json({ error: 'No file uploaded' });
                return;
            }

            const uploadedFile: UploadedFile = await StorageService.uploadFile(req.file);
            res.status(201).json(uploadedFile);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to upload file' });
            }
        }
    }

    static async deleteFile(req: Request, res: Response): Promise<void> {
        try {
            const { filename } = req.params;
            await StorageService.deleteFile(filename);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to delete file' });
            }
        }
    }

    static async getFileUrl(req: Request, res: Response): Promise<void> {
        try {
            const { filename } = req.params;
            const url = await StorageService.getFileUrl(filename);
            res.json({ url });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to get file URL' });
            }
        }
    }
} 