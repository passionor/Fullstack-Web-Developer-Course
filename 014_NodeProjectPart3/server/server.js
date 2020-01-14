const Koa = require('koa');
const Router = require('koa-router');
const static = require('./routers/static');
const body = require('koa-better-body');
const path = require('path');
const session = require('koa-session');
const fs = require('fs');
const ejs = require('koa-ejs');
const config = require('./config');

let server = new Koa();
server.listen(config.PORT);
console.log(`server running at ${config.PORT}`);

// Middleware
server.use(body({
  uploadDir: config.UPLOAD_DIR
}));

server.keys = fs.readFileSync('.keys').toString().split('\n');
server.use(session({
  maxAge: 20*60*1000,
  renew: true
}, server));

// Database
server.context.db = require('./libs/database');
server.context.config = config;

// Rendering
ejs(server, {
  root: path.resolve(__dirname, 'template'), 
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

server.use(async (ctx, next) => {
  let {HTTP_ROOT} = ctx.config;
  try {
    await next();

    if(!ctx.body) {
      await ctx.render('www/404', {
        HTTP_ROOT
      });
    }
  } catch(e) {
    await ctx.render('www/404', {
      HTTP_ROOT
    });
  }
});

// Router & Static
let router = new Router();

// Unified Error Handling
// router.use(async (ctx, next) => {
//   try {
//     await next();

//     // If next() is normal and need to send something to client
//     // ctx.body = xxx
//   } catch(e) {
//     // ctx.status = 500;
//     // ctx.body = 'Internal Server Error';
//     ctx.throw(500, 'Internal Server Error');

//     console.log(e);
//   }
// });

router.use('/admin', require('./routers/admin'));
router.use('/api', require('./routers/api'));
router.use('/', require('./routers/www'));
static(router);

server.use(router.routes());