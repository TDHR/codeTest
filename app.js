const Koa = require('koa');
const request = require('superagent');
const view = require('koa-views');
const routers = require('./server/router/index');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const cors = require('koa2-cors');
const ora = require('ora');
const spinner = ora('Loading unicorns').start();
// const myCipher = require('./util/cipher');
// const myRandom = require('./util/myRandom');
setTimeout(() => {
    spinner.color = 'red';
    spinner.text = 'Loading rainbows';
},3000);

//设置跨域访问
app.use(cors());
app.use(bodyParser());

// app.use(async (ctx)=>{
//     ctx.body= inform+ '\n' + address;
//
// })

// app.all('*',function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// })
app.use(view(path.join(__dirname,'./server/views'),{
    extension:'ejs'
}));
app.use(routers.routes())
    .use(routers.allowedMethods());

app.listen('3009',()=> {
    // console.log(myCipher("{'adf':打发第三方}"));//加密

    console.log('正在监听'+ 3009)
});