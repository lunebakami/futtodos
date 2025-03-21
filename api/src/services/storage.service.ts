import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

export interface UploadedFile {
    filename: string;
    url: string;
    contentType: string;
}

export class StorageService {
    static async uploadFile(file: Express.Multer.File): Promise<UploadedFile> {
        try {
            const filename = `${uuidv4()}-${file.originalname}`;
            const filepath = path.join(uploadsDir, filename);

            // Write file to disk
            await fs.promises.writeFile(filepath, file.buffer);

            // Create URL for the file
            const url = `/uploads/${filename}`;

            return {
                filename,
                url,
                contentType: file.mimetype,
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to upload file: ${error.message}`);
            }
            throw new Error('Failed to upload file: Unknown error');
        }
    }

    static async deleteFile(filename: string): Promise<void> {
        try {
            const filepath = path.join(uploadsDir, filename);
            await fs.promises.unlink(filepath);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete file: ${error.message}`);
            }
            throw new Error('Failed to delete file: Unknown error');
        }
    }

    static async getFileUrl(filename: string): Promise<string> {
        try {
            const filepath = path.join(uploadsDir, filename);
            
            // Check if file exists
            await fs.promises.access(filepath);
            
            return `/uploads/${filename}`;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to get file URL: ${error.message}`);
            }
            throw new Error('Failed to get file URL: Unknown error');
        }
    }
} 