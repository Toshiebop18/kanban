import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded; // Attach decoded user to request
        next(); // Proceed to next middleware
        return;
    });
    return;
};
