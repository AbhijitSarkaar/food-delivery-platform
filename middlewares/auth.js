import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, login again',
    });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'invalid credentials' });
  }
};

export default auth;
