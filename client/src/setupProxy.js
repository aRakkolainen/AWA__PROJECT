const { createProxyMiddleWare} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', 
        createProxyMiddleWare({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    )
}