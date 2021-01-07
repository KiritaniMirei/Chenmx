const path = require('path'); // eslint-disable-line
const request = require('request'); // eslint-disable-line

module.exports = {
  lintOnSave: true,
  publicPath: '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'),
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // eslint-disable-next-line
          require('postcss-pxtorem')({
            rootValue: 40,
            propList: ['*'],
            minPixelValue: 2,
            exclude: /node_modules/,
          }),
        ],
      },
      stylus: {
        import: '~@/assets/css/mixin.styl',
      },
      // less: {
      //   lessOptions: {
      //     modifyVars: {
      //       'text-color': '#111',
      //       'border-radius-base': '2px',
      //     },
      //     javascriptEnabled: true,
      //   },
      // },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 9999,
    https: false,
    hot: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    proxy: {
      '/mockapi': {
        target: 'https://dev.yygongzi.com',
        changeOrigin: true,
        pathRewrite: {
          '^/mockapi': '',
        },
      },
    },
    before(app) {
      app.get('/', (req, res, next) => {
        request.get(
          {
            url: 'http://dev.yygongzi.com/salaryssoapi/test/autoLoginFeishu?userId=21650',
          },
          (err, response) => {
            res.set('set-cookie', response.headers['set-cookie']);
            next();
          }
        );
      });
    },
  },
};
