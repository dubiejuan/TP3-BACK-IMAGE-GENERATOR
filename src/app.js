const { decodeToken } = require('./middleware/TokenMiddleware');
const { bindRoutes } = require('./routes/index');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandlerMiddleware } = require('./middleware/errorHandlerMiddleware');
const app = express();
const server = require('http').Server(app);

const port = 3000;

app.use(cors());
app.use(morgan('combined'));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(decodeToken);

bindRoutes(app);
app.use(errorHandlerMiddleware);
server.listen(port, () => console.log(`Listening on http://${port}/`));
module.exports = server;