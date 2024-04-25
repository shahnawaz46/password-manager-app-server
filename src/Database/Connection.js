import mongoose from 'mongoose';

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const URI = `mongodb+srv://${userName}:${password}@password-manager-cluste.lxiohxk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const Connection = async () => {
  try {
    await mongoose.connect(URI, {
      autoIndex: true,
    });
    console.log(`Database connected ${mongoose.version}`);
  } catch (err) {
    console.log(err);
  }
};

export default Connection;
