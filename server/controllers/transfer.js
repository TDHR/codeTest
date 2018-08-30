const rpcMethod = require('../../rpc/index');
const request = require('superagent');
exports.index = async (ctx ,next) => {
    let params = ctx.request.body;
    //在中转地址中为用户创建二级地址
    let user = params.user;//用户的ID（用户名）
    let productAddress = params.address;//产品的地址
    let userAddress;
     userAddress =await rpcMethod.getaccountaddress(user); //创建用户二级地址
    // for(let i=0;i<100;i++){
    //     //爆破地址池
    //     user = user +i;
    //     userAddress =await rpcMethod.getaccountaddress(user);
    //     console.log(userAddress)
    // }

    if(!userAddress){
        //如果地址池已满，则userAddress为null，发送请求让中转地址做一次交易(先打入后打出)；
        userData = await extendPool(user);
        // console.log(userData)
        if(userData.success){

            let extendedUserAddress = userData.data; //擴展地址池之後的用戶地址

            let txData;
            txData = await activationAddress(extendedUserAddress);// 激活用戶地址
            if(!txData.txData.result){
                //如果交易出錯（項目地址沒幣了！）
                ctx.body = {
                    success:false,
                    message:`项目地址没币了！快打币！打币！打币！地址是：${txData.fromAddress}`
                }
            }
        let address = params.address; //product address
        // console.error(txData) ;
            console.log(txData);
        if(txData.success){

            if(txData.txData.result){
                ctx.body = {
                    success:true,
                    txID:txData.txData.result,
                    address:address,
                    user:user
                }
            }else {
                ctx.body = {
                    success:false,
                    message:txData.txData.error.message
                }
            }
        }
        }else {
            ctx.body = {
                success:false,
                message:userData.message
            }
        }
    }else {

        // console.error(userAddress)
        //通过产品地址激活二级地址（向二级地址中打token）,返回交易ID
        let txData;
        // console.log('lalalallal'+userAddress)
         txData = await activationAddress(userAddress);
         if(!txData.txData.result){
             //如果交易出錯（項目地址沒幣了！）
             ctx.body = {
                 success:false,
                 message:`项目地址没币了！快打币！打币！打币！地址是：${txData.fromAddress}`
             }
         }
         // else {
             // console.log(txData)
             // for(let i =0;i<100;i++){
             //     user = user+i;
             //     userAddress = await rpcMethod.getaccountaddress(user);
             // }
             // console.log(txData);
             // console.log(txData)
             let address = params.address; //product address
             // console.error(txData) ;

             if(txData.success){
                 if(txData.txData.result){
                     ctx.body = {
                         success:true,
                         txID:txData.txData.result,
                         address:address,
                         user:user
                     }
                 }else {
                     // console.log(txData)
                     ctx.body = {
                         success:false,
                         message:txData.txData.error.message
                     }
                 }

             }else {
                 ctx.body = {
                     success:false,
                     message:'水逆'
                 }
             }
         }
         // }




};
//向主地址守护进程发送请求，激活地址（中转地址的二级地址或者中转地址）（用户虚拟地址）
async  function activationAddress(address,productAddress) {
    //address要激活的地址，productAddress产品地址，测试阶段省去这一步。
    return new Promise((resulve,reject) => {
        request
            .post('127.0.0.1:3001/activate')
            .set('Accept','application/json')
            .set('Content-Type','application/json')
            .send({
                address:address
            })
            .end(function (err, result) {
                if(err){
                    reject(err) ;
                }else {
                    // console.log('resultBody: ' + JSON.stringify(result.body));
                    resulve(result.body);
                }
            })
    })

}
//发送宽展地址池请求
async function extendPool(user) {

        let address = await rpcMethod.getAddr();//获取中转地址

        let result = await activationAddress(address);//激活地址池（应该将产品地址一起传过去做验证，测试阶段省去这一步）
    // console.log(result)
        if(!result.txData.result){
            //如果交易出錯（項目地址沒幣了！）
            return {
                success:false,
                message:`项目地址没币了！快打币！打币！打币！地址是：${result.fromAddress}`
            }
        }

        let fromAddress = result.fromAddress;
        let extendTxId = await rpcMethod.sendToAddress(fromAddress);//做返回交易
        if(extendTxId){
            await sleep();//延时函数
            let userAddressNew = await rpcMethod.getaccountaddress(user);
            // if(!userAddressNew){
            //
            // }
            // console.log('扩展地址池之后用户的二级地址'+userAddressNew);
            return {
                success:true,
                message:'扩展成功',
                data:userAddressNew //擴展地址池之後的用戶地址
            }
        }else {
            return  {
                success:false,
                message:'扩展失败，请重试'
            }
        }


}
//当扩展地址池之后要延时去产生二级地址
const sleep = async function () {
    return new Promise((resolve,reject) => {
        setTimeout(function () {
            console.log('延时生效')
            resolve();
        },3000)
    })
};