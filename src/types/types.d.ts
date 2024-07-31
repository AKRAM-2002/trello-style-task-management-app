import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: string; // or the specific type if you use a different type for userId
}
