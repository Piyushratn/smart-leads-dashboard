import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { id: string; role: 'admin' | 'sales' };
}

interface JwtPayload {
  id: string;
  role: 'admin' | 'sales';
}

export const protect = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token' 
    });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    res.status(401).json({ 
      success: false, 
      message: 'Token invalid or expired' 
    });
  }
};