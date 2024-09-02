import jwt from 'jsonwebtoken';

const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      // If no token is found, send a 401 Unauthorized response
      return res.status(401).json({ error: 'Access Denied. No token provided.' });
    }

    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = verified; // Attach the verified user to the request

    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    // If there's an error during verification, return a 400 Bad Request response
    return res.status(400).json({ error: 'Invalid token.' });
  }
};

export default authMiddleware;
