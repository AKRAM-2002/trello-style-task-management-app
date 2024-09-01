import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
console.log('Loading environment variables from:', envPath);

dotenv.config({ path: envPath });

export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 4000;

console.log('MONGODB_URI:', MONGODB_URI);
console.log('JWT_SECRET:', JWT_SECRET ? '[REDACTED]' : undefined);
console.log('PORT:', PORT);