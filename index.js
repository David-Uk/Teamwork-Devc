import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routers from './server/routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cors());

app.use('/api/v1', routers);

app.listen(PORT, () => {
  console.log(`Visit localhost:${PORT}`);
});

export default app;
