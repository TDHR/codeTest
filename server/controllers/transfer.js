const rpcMethod = require('../../rpc/index');
const request = require('superagent');
exports.index = async (ctx) => {
    let params = ctx.request.body;
    //在中转地址中为用户创建二级地址
    let user = params.user;

    //通过产品地址激活二级地址（向二级地址中打token）,返回交易ID
    let address = params.address;
    // console.log(address)
    ctx.body = {
            success:true,
            txID:'123456789adfadsfads',
            address:address,
            user:user
    }

};