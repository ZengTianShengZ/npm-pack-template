## axios 封装

#### 前言
本次 axios 封装意在统一接口请求规范，做好接口信息报错统一处理，方便组员间的工程协作

#### 1、基础配置

创建子类继承 QtsAxios，重写错误信息处理方法

```javascript
// axios/index.js
import {Message} from 'element-ui'
import QtsAxios from 'qtsAxios'
class AxiosProd extends QtsAxios {
  constructor() {
    super(process.env.BASE_API) // super 传入 base api
  }
  /**
   * 接口报错处理
   * @param {*} msgData 
   */
  resFalse(msgData) {
    // 自己实现错误信息处理，
    // 这里我是用了 element-ui 的 Message 做统一提醒
    Message({message: msgData.msg, type: 'warning'})
  }
  /**
   * 网络请求出错处理
   * @param {*} msgData 
   */
  resErr(msgData) {
    Message({message: msgData.msg, type: 'error'})
  }
}
// 提供全局方法，挂载到 vue 下实例
export default function (Vue) {
  const axiosProd = new AxiosProd()
  Vue.prototype.$axios = axiosProd
  Vue.prototype.$axiosP = axiosProd.post.bind(axiosProd)
  Vue.prototype.$axiosG = axiosProd.get.bind(axiosProd)
}
```

```
// 同样需要挂载到 vue 实例下才可全局使用
import axios from './axios'
Vue.use(axios)
```

#### 2、API

>  POST

基本用法
```
this.$axios.post(API, 
  {                               // 入参数据
    token: 'xxxxxxxx123',
    headers: {                    // 可自定义请求头
      'Accept': 'application/text',
    }
  }, 
  {                               // 其他配置项
    showErrMsg: true // 默认 true 全局执行错误回调，可设为 false
  })
```
简化用法
```
this.$axiosP(API, {})
```
原始用法
```
this.$axios.require({
	url: 'API',
	data: {}
  method: 'POST',
  headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'}
})
```

>  GET

基本用法
```
this.$axios.get(API, 
  {                               // 入参数据
    token: 'xxxxxxxx123',
    headers: {                    // 可自定义请求头
      'Accept': 'application/text',
    }
  }, 
  {                               // 其他可配置项
    showErrMsg: true // 默认 true 全局执行错误回调，可设为 false
  })
```
简化用法
```
this.$axiosG(API, {})
```
原始用法
```
this.$axios.require({
	url: 'API',
	data: {}
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'}
})
```

>  getUrl

```
const url = this.$axios.getUrl(API, {})
```

获取带参请求的URL,一般用于文件下载同时需要带上token的get请求

🌰 栗子
```
async reqTest() {
	const resData = await this.$axios.post(API, {})
	if (resData.success) {
		console.log(resData)
	}
	//if resData.success === false , 因为错误信息在 axios/index.js 已经统一处理，这边就不必重复处理了
}
```

由于 `this.$axios.post / this.$axios.get` 是个 async 函数，调用该函数时，会立即返回一个Promise对象。所以接口的回调也可以用 .then() 处理，兼容现有工程的写法

```
reqTest() {
	this.$axios.post(API, {}).then(resData => {
		if (resData.success) {
			console.log(resData)
		}
	})
}
```

#### 3、更多配置
由于 axios 封装提供了个基类，子类可以继承基类利用多态思想，覆盖一些基类方法。
> baseInitParams()

如果接口入参需要一些默认参数，子类实现上可以覆盖 `baseInitParams()` 方法
```
baseInitParams() {
    const appKey = 'QTSHE_IOS_USER'
    const version = '4.7.0'
    const user = getLoginInfo('loginMsg')
    const timestamp = new Date().getTime()
    const params = {
      appKey,
      version,
      deviceId: getDeviceId(),
      sign: md5(appKey + timestamp + version),
      token: (user === null) ? '' : user.token,
      timestamp
    }
    return deleteEmptyObjParam(params)
}
```

> baseInitHeaders()

有些项目使用 jwt 登录，需要自定义请求头，可以覆盖 baseInitHeaders() 方法
```
baseInitHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer token`
    }
  }
```  
> baseHandleCode()

需要根据后端接口返回的 code 做拦截处理可以覆盖 baseHandleCode() 方法

```
// 基类默认做了 code 4004 拦截，如果不需要或自定义的话可以覆盖该方法
baseHandleCode (code) {
    if (code === 4004) {
      if (window.location.href.indexOf(`${window.location.host}/app/login`) > 0) {
        window.location.href = '/app/login'
      } else {
        window.location.href = '/app/login?redirect_uri=' + encodeURIComponent(window.location.href)
      }
    }
  }
```
 
#### 4、使用

```
<html>
  <body>
    <script src="https://dn-qtshe-https-js.qbox.me/f2e-npm/1.0.4/qtsAxios.js"></script>
  </body>
</html>
```

在 webpack.config.js 中新增：

```
externals: {
  'qtsAxios': 'qtsAxios' 
}
// 注意配置完需要重新启动 webpack
```

import 引包使用
```
import QtsAxios from 'qtsAxios'

class AxiosProd extends QtsAxios {
  constructor() {
    super('BASE_API')
  }
}
```

具体子类实现可看 [☞ vue-use-demo](https://gitee.com/f2e-npm/qts-axios/blob/master/test/vue-use-demo.js)