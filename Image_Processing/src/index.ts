import express, { Application } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import routes from './routes/index2';
dotenv.config();
const PORT = process.env.PORT || 3000;
// create an instance server  
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('dev'));
app.use('/api', routes);

// add routing for / path

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});

export default app;
