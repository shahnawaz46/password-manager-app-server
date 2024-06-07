import { Vault } from '../model/vault.model.js';

export const getAllVault = async (req, res) => {
  const { category } = req.query;
  try {
    if (category === 'All') {
      const allPassword = await Vault.find({ user: req.data._id })
        .select('name data category')
        .skip(0)
        .limit(10)
        .sort({ createdAt: -1 });

      return res.status(200).json({ password: allPassword });
    }

    // if category is App or Browser then i don't need to calculate the count
    else if (category === 'App' || category === 'Browser') {
      const allPassword = await Vault.find({ user: req.data._id, category })
        .select('name data category')
        .sort({ createdAt: -1 });
      return res.status(200).json({ password: allPassword });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};

export const addVault = async (req, res) => {
  const { name, data, category } = req.body;
  try {
    const isAlreadyExists = await Vault.findOne({ user: req.data._id, name });
    if (isAlreadyExists) {
      return res
        .status(409)
        .json({ error: `Data of ${isAlreadyExists.name} already present` });
    }

    const vault = await Vault.create({
      user: req.data._id,
      name,
      data,
      category,
    });
    return res.status(201).json({
      name: vault.name,
      data: vault.data,
      category: vault.category,
      _id: vault._id,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};

export const deleteVault = async (req, res) => {
  try {
    await Vault.findByIdAndDelete(req.body.id);
    return res.status(201).json({
      msg: 'Deleted Successfully',
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};

export const editVault = async (req, res) => {
  const { _id, ...rest } = req.body;
  try {
    // if user want to edit the name then i am checking name is already present or not
    if (rest?.name) {
      const isAlreadyExists = await Vault.findOne({
        user: req.data._id,
        name: rest.name,
      });
      if (isAlreadyExists) {
        return res
          .status(409)
          .json({ error: `Data of ${isAlreadyExists.name} already present` });
      }
    }

    const vault = await Vault.findByIdAndUpdate(_id, rest, {
      new: true,
    }).select('name data category');

    return res.status(201).json(vault);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};

export const searchVault = async (req, res) => {
  const { search, category } = req.query;

  try {
    // .*: Matches any characters zero or more times (wildcard)
    // $options: 'i': Enables case-insensitive matching
    const vault = await Vault.find({
      $and: [
        { user: req.data._id },
        category === 'App' || category === 'Browser' ? { category } : {},
        { name: { $regex: `${search}.*`, $options: 'i' } },
      ],
    })
      .skip(0)
      .limit(10)
      .select('name data category')
      .sort({ createdAt: -1 });

    return res.status(201).json(vault);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};

export const count = async (req, res) => {
  try {
    const vault = await Vault.find({ user: req.data._id });
    let app = 0;
    let browser = 0;
    vault.forEach((item) =>
      item.category === 'App'
        ? app++
        : item.category === 'Browser'
        ? browser++
        : null
    );
    return res.status(200).json({ all: vault.length, app, browser });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};
