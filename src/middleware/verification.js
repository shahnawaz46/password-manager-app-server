import jwt from 'jsonwebtoken';

export const verification = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(' ')[1];
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.data = verified;
      next();
    }
  } catch (err) {
    return res.status(401).json({ error: 'Authorization denied' });
  }
  //   if()
};
