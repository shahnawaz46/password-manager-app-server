import express from 'express';
import cors from 'cors';
import mongoDBConnection from './src/database/mongo.database.js';
import userRouter from './src/routes/user.routes.js';
import vaultRouter from './src/routes/vault.routes.js';

const app = express();

// mongoDB connection
mongoDBConnection();

// middleware
app.use(cors({ origin: true }));
app.use(express.json());

// routes
app.use('/api', userRouter);
app.use('/api', vaultRouter);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is Running on Port no ${port}`);
});
