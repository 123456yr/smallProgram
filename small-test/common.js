var app= getApp(); // 微信提供的可以使用app.js中的方法和变量
var RSA = require('./utils/wxapp_rsa.js');
// options: {url, method, header, data, success, fail}
function req(options) {
    var defaultOpt= {
        header: {'Content-Type': 'application/json'},
        method: 'POST',
        fail: function(){
            wx.showToast({
                title:'请求失败!',
                icon: 'none',
                duration: 2000
            })
        }
    }
    options= {...defaultOpt, ...options}
    options.url= app.REQ_URL + options.url;
    encryptRsa(options)
}
// 加密
function encryptRsa(options) {
    // 公钥
    var publicKey_pkcs1 = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0aevqkT/H8fAQYk6mIO7yFQ8Yfluu2SQvyC6qd9PgcDID//3bnO/lo0mJNXCSaDnkMRbC8XtB+9g99MY/yc1VQHhrdwvrOkz/j91A0IeOr/N++MwHlkWz/EkpDihao4L2Qz5f7tlX+WKgHFCdzJc+S3bvbe+Kir5sViVrmPuGGQIDAQAB-----END PUBLIC KEY-----'
      var encrypt_rsa = new RSA.RSAKey();
      encrypt_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
      console.log(encrypt_rsa);
      let paramsData= '' // axios 发的加密的参数
      let paramsString= '' // 把传过来的data数据转成字符创
      let params1= '' // 把paramsString每三十个字符截取一次赋值给params1
      let params2= '' // 把params1循环加密赋值给params2
      var params3= ''
      if(options.data) {
          paramsString= JSON.stringify(options.data);
          if(paramsString.length > 30){
              params1= paramsString.match(/.{1,30}/g); // 得到一个数组
              params1.forEach(d => {
                  var encStr= encrypt_rsa.encrypt(d); // 每个字符创加密
                  var params3= RSA.hex2b64(encStr);
                  params2 += params3
              })
              
          }else{
              var encStr= encrypt_rsa.encrypt(JSON.stringify(options.data));
              params2 = RSA.hex2b64(encStr);
              paramsData= {}
          }
          paramsData= {"request": params2} // 最终的加密串
          options.data= paramsData;
          // 发起https网络请求
          wx.request(options)
      }
}

module.exports = {
    req
}