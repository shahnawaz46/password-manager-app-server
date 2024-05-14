export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  // console.log(req.body, error);
  if (error) {
    return res.status(400).json({ error: error?.details[0]?.message });
  }
  next();
};
