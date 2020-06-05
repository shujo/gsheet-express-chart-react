const errorHandler = require('../middleware/error.middleware');

const routeHandler = app => {
    app.use('/api', require('./home.route'));
    app.use('/api/gsheet', require('./gsheet.route'));


    app.use(errorHandler);
}

module.exports = routeHandler
 