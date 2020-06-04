const errorHandler = require('../middleware/error.middleware');

const routeHandler = app => {
    app.use(errorHandler);
    app.use('/api', require('./home.route'));
    app.use('/api/gsheet', require('./gsheet.route'));
}

module.exports = routeHandler
 