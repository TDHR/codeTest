const router = require('koa-router')();
const home = require('./home');
const message = require('./message');
const transfer = require('./transfer');

router.use('/',home.routes(),home.allowedMethods());
router.use('/message',message.routes(),message.allowedMethods());
router.use('/transfer',transfer.routes(),transfer.allowedMethods());

module.exports = router;