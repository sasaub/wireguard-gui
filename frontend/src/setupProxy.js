const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://wireguard-gui-production-57a7.up.railway.app',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug'
    })
  );
}; 