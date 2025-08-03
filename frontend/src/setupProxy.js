const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://wireguard-gui-production.up.railway.app',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug'
    })
  );
}; 