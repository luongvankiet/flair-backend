require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const httpErrors = require('http-errors');
const routes = require('./routers');
const cors = require('cors');
const Response = require('./models/response');

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

//middleware
// app.use(express.json({ limit: '150mb' }));
// app.use(express.urlencoded({ limit: '150mb' }));

//init routes
app.use('/', routes);

app.use((req, res, next) => {
  next(httpErrors.NotFound('This route does not exist'));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send(Response.error(err.message, err.status || 500));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
