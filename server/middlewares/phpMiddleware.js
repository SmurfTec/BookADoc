const path = require('path');
const phpExpress = require('php-express')({
  binPath: 'php',
});

const setup = app => {
  app.set('views', path.join(__dirname, '../views/php'));
  app.engine('php', phpExpress.engine);
  app.set('view engine', 'php');

  app.all(/\/.+\.php$/, phpExpress.router);
  app.all(/\/(article|terms|career|help).*/i, phpExpress.router);
};

module.exports = { setup };
