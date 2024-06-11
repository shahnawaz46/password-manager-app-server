export const generateNextUrl = (req, query) => {
  const path = req.route.path;

  const nextUrl = `${path}?${query}`;
  return nextUrl;
};
