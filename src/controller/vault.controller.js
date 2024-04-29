import { Vault } from '../model/vault.model.js';

export const getAllPassword = async (req, res) => {
  const { category } = req.query;
  try {
    if (category === 'All') {
      const allPassword = await Vault.find({ user: req.data._id });

      let app = 0;
      let browser = 0;
      allPassword.forEach((item) =>
        item.category === 'App'
          ? app++
          : item.category === 'Browser'
          ? browser++
          : null
      );
      return res.status(200).json({
        password: allPassword,
        count: { all: allPassword.length, app, browser },
      });
    } else if (category === 'App' || category === 'Browser') {
      const allPassword = await Vault.find({ user: req.data._id, category });
      return res.status(200).json({ password: allPassword });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};
