export const corsMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    
    next();
};