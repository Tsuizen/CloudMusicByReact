import axios, { Method } from 'axios';

if (import.meta.env.DEV) {
  axios.defaults.baseURL = 'http://localhost:3000/';
} else if (import.meta.env.PROD) {
  axios.defaults.baseURL = '';
}

// 超时时间
axios.defaults.timeout = 7000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次请求前判断本地是否有token，如果有则统一添加在http请求头中
    // 即使有token也有可能是过期的，所以要在响应拦截器中对返回状态进行判断
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    return Promise.resolve(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },

  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401：未登录
        // 未登录跳转登陆页面，并携带当前页面的路径
        case 401:
          break;
        // 403: token过期
        // 清除本地token和redux中的token对象
        // 跳转登陆页面
        case 403:
          break;
        // 404: 请求不存在
        case 404:
          break;
        // 其他错误直接抛出错误提示
        default:
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法
 * @param  {string} url
 * @param  {any} params 请求携带的参数
 */
export function get(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * post方法
 * @param  {string} url
 * @param  {any} params 携带的参数
 */
export function post(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

/**
 * request请求方法，自定义请求，传入请求方式和参数
 * @param  {string} url
 * @param  {sring} method
 * @param  {Object} params
 */
export function request(config: {
  url: string;
  method: Method;
  params?: any;
  data?: any;
}) {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: config.url,
        method: config.method,
        data: config.method === 'post' ? config.params : '',
        params: config.method === 'get' ? config.params : ''
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
