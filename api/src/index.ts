import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';
import dotenv from 'dotenv';
// import axios from 'axios';
dotenv.config();

const server = express();

server.use(morgan('dev'));
server.use(cors());
server.use('/', routes);

const PORT = 4000;
server.listen(PORT, () => {
  // axios.get('http://localhost:4000/login');
  console.log(`%s listening port ${PORT}`);
});
// http://localhost:4000