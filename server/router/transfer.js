const router = require('koa-router')();
const transfer = require('../controllers/transfer');

router.post('/',transfer.index);

module.exports = router;