import axios from 'axios'
import { Notice } from 'view-design'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const requestingList = []

// 请求拦截
axios.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  Notice.error({
    title: '网络异常',
    desc: '您的网络发生异常，无法连接服务器'
  })
})

// 响应拦截
axios.interceptors.response.use(res => {
  console.log(res)
  return res
}, error => {
  console.log(error)
  let errorInfo = error.response

  if (!errorInfo) {
    const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
    errorInfo = {
      statusText,
      status,
      url: config.url
    }
  }

  Notice.error({
    title: '请求错误',
    desc: `
      状态码: ${errorInfo.status}\n
      链接: ${errorInfo.url}\n
      消息: ${codeMessage[errorInfo.status] || errorInfo.statusText}
    `
  })
  return Promise.reject(error)
})

export function setToken(token) {
  if (token) {
    axios.defaults.headers.token = token
  }
}

export default axios
