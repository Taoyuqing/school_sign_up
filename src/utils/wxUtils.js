import http from './axios'

let getToken = () => {
  return new Promise((r, j) => {
    http
      .get('/jbjg/weixin/getToken')
      .then((res) => {
        r(res.data)
      })
      .catch((e) => {
        j(e)
      })
  })
}
let getWXConfig = async (toekn) => {
  let config = await getToken()
  window.wx.ready(() => {
    window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: config.appId, // 必填，公众号的唯一标识
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填，生成签名的随机串
      signature: config.signature, // 必填，签名
      jsApiList: [], // 必填，需要使用的JS接口列表
    })
  })
  return config
}
let getUrlParam = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) //匹配目标参数
  if (r != null) return unescape(r[2])
  return null //返回参数值
}
let createOrder = async (openId,outTradeNo,totalFee,payRes) => {
  let params = {}
  params.body = '江北建工'
  params.spbillCreateIp = '127.0.0.1'
  params.tradeType = 'JSAPI'
  params.openid = openId
  //   params.outTradeNo = payorder
  // params.outTradeNo = `${parseInt(Math.random() * 10000000000)}`
  params.outTradeNo = `${outTradeNo}`
  params.notifyUrl = 'http://www.jiuhaoyong.com/jbjg/'
  params.totalFee = totalFee*100
  // params.subMchId = 'wecharshh'
  
  try{
    let data = await http.post('/jbjg/pay/createOrder', params)
    if (typeof WeixinJSBridge == 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady(
        data.data.appId,
        data.data.timeStamp,
        data.data.nonceStr,
        data.data.packageValue,
        data.data.paySign
      ).then((res) => {
        if (res != 'fail') {
          //   paycallback(params.outTradeNo)
          payRes('支付成功了')
        }
      })
    }
  }catch(e){
    payRes('支付失败了')
  }
  console.log(data)

}
let onBridgeReady = async (
  appId,
  timeStamp,
  nonceStr,
  packagename,
  paySign
) => {
  return new Promise((r, j) => {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: appId, //公众号名称，由商户传入
        timeStamp: timeStamp, //时间戳，自1970年以来的秒数
        nonceStr: nonceStr, //随机串
        package: packagename,
        signType: 'MD5', //微信签名方式：
        paySign: paySign, //微信签名
      },
      function(res) {
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
          r('success')
        } else {
          j('fail')
        }
      }
    )
  })
}

// 授权
let getauthorize = async () => {
  let config = await getWXConfig()
  let origin = location.href
  let urlNow = encodeURIComponent(origin)
  let scope = 'snsapi_userinfo'
  let appid = config.appId
  let url =
    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
    appid +
    '&redirect_uri=' +
    urlNow +
    '&response_type=code&scope=' +
    scope +
    '&state=15123317313&connect_redirect=1#wechat_redirect'
  window.location.href = url
}
export { getWXConfig, getUrlParam, getauthorize, createOrder }
