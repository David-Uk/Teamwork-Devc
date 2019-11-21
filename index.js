import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', (request, response) => {
  response.status(404).send({
    status: 404,
    error: 'Not Found !',
  });
});

app.listen(PORT, () => {
  console.log(`Visit port localhost:${PORT}`);
});

export default app;
