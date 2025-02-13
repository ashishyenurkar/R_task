const JWT_SECRET = 'hkfhsfjdsljfknvndnf'; 

export const authenticateUser = (req, res, next) => {
    const token = req.cookies?.authToken;
  
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
  console.log("token",token)    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = decoded; // Store the user info for use in subsequent requests
     
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token',e:error });
    }
  }