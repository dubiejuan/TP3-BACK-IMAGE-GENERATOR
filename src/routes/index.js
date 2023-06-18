const imageRouter = require('./image');
const notFoundRouter = require('./notFound');
const healthRouter = require('./health');


const bindRoutes = (app) => {
  app.use('/api/health', healthRouter);
  app.use('/api/image', imageRouter);
  app.use('*', notFoundRouter);
};

module.exports = { bindRoutes };