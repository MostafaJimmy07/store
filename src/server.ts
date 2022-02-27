/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {
  Application,
  Request,
  Response,
  RequestHandler,
} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import db from './database/database';
import client from './database/database';
import router from './routes/index';
//import usersRoute from './controllers/users.controllers';
const app: Application = express();
const port = process.env.port || 5000;
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);

//app.use(morgan('common'));
app.use(helmet());

app.get('/', (req, res) => {
  res.json('Hello Shopping World!');
});
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server Is Running on Port ${port}`);
});
export default app;
