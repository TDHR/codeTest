const rpc = require('../config/rpc');
const iconv = require('iconv-lite');
//获取主地址
exports.getAddr = async function() {
    rpc.getprimeaddr (function (err, addr) {

        if(err){
            console.error('获取主地址：'+err);
            return err;
            // console.log(err)

        }else {
            // address= '主地址为：'+addr.result
            console.log('主地址为：'+addr.result)
            return addr.result;
            // console.log(addr.result.length)
        }
    })
};
//获取新的二级地址
exports.getNewAddress = async function  (account) {
    rpc.getnewaddress  (account,function (err, info) {
        if(err){
            console.error('获取新的二级地址'+err);
            return err;
            // console.log(err)
        }else {
            // address= '主地址为：'+addr.result
            console.log('主要信息为：'+JSON.stringify(info.result))
            return JSON.stringify(info.result);
        }
    })
};
//根据地址获取账号
exports.getAccount = async function (btcAddress) {
    rpc.getaccount (btcAddress,function (err, info) {
        if(err) {
            console.error('根据地址获取账号' + JSON.stringify(err));
            return err;
        }else {
            console.log('地址账号为：'+ info.result);
            return info.result;
        }
    })
} ;
//根据账号获取地址列表
exports.getaddressesbyaccount = async function (account) {
    rpc.getaddressesbyaccount (account,function (err, info) {
        if(err) {
            console.error('根据账号获取地址列表'+err)
        }else {
            console.log('地址列表为：' + info.result);
            return info.result;
        }
    })
};
//根据账号获取地址（生成二级地址时最好用这个）
exports.getaccountaddress = async function (account) {

    // console.log(account);
    return new Promise(function (resolve, reject) {
        rpc.getaccountaddress (account,function (err, info) {

                if(err) {
                    console.error('根据账号获取地址'+JSON.stringify(err));
                    reject(err);
                }else {
                    console.log('地址为：' + info.result);
                    resolve(info.result) ;
                }
            })

    })
};
//产生签名
exports.signmessage   = async function (btcAddress,message) {
    return new Promise((resolve,reject) => {
        // console.log('原始签名信息'+message);
        // message = JSON.toString(message)

        rpc.signmessage (btcAddress,message,function (err, info) {
            if(err) {
                console.error('产生签名'+JSON.stringify(err))
                reject(err)
            }else {
                // console.log('签名为：' + info.result);
                resolve (info.result);
            }
        })
    })

};
//所有二级地址账号
exports.listAccounts   = async function (btcAddress,message) {
    return new Promise((resolve,reject) => {
        rpc.listaccounts (function (err, info) {
            if(err) {
                console.error('二级地址账号列表'+err);
                reject(err);
            }else {
                // console.log('二级地址账号列表：' + info.result);
                resolve(info.result) ;
            }
        })
    })

};

