require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middelewares/logger');

const app = express();
const routers = require('./routes/index.js');

const PORT = 3003;

const errorHandler = require('./middelewares/errorHandle');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const allowedCors = [
//   'localhost:3000',
// 'wow.kalinkina.students.nomoredomains.rocks'
// ];
// app.use(cors({
//   origin: allowedCors,
// }));
app.use(cors({
  origin: 'http://localhost:3003',
  credentials: true,
}));
app.use(requestLogger);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use('/', routers);
app.use(errorLogger);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log('listening'));
