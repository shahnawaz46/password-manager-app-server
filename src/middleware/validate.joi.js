export const validate = (schema) => (req, res, next) => {
  // console.log('req.body:', req.body);
  const { error } = schema.validate(req.body);
  // console.log('error:', error);
  if (error) {
    return res.status(400).json({ error: error?.details[0]?.message });
  }
  next();
};
