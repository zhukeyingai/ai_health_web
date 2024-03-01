import axios from "axios";

const instance = axios.create({
  timeout: 60000,
  headers: { "Content-Type": "application/json; charset=utf-8" },
  baseURL: "/workbench/",
});

// 添加响应拦截器
instance.interceptors.response.use(
  function (res) {
    if (res?.data.status === "500" || res?.data.status === "400") {
      // 其他报错由业务自己处理
      throw res?.data?.message;
    }
    return res;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    return Promise.reject(error);
  }
);

const post = (api: string, params?: any, config?: any) => {
  return new Promise<any>((resolve, reject) => {
    instance
      .post(api, params, config)
      .then((res) => {
        if (res.status !== 201) {
          throw res;
        }
        resolve(res.data);
      })
      .catch((e) => {
        reject(e?.data?.message || e?.message || e);
      });
  });
};

const put = (api: string, params?: any, config?: any) => {
  return new Promise<any>((resolve, reject) => {
    instance
      .put(api, params, config)
      .then((res) => {
        if (res.status !== 200) {
          throw res;
        }
        resolve(res.data);
      })
      .catch((e) => {
        reject(e?.data?.message || e?.message || e);
      });
  });
};

const patch = (api: string, params?: any, config?: any) => {
  return new Promise<any>((resolve, reject) => {
    instance
      .patch(api, params, config)
      .then((res) => {
        if (res.status !== 200) {
          throw res;
        }
        resolve(res.data);
      })
      .catch((e) => {
        reject(e?.data?.message || e?.message || e);
      });
  });
};

const get = (api: string, config?: any) => {
  return new Promise<any>((resolve, reject) => {
    instance
      .get(api, config)
      .then((res) => {
        if (res.status !== 200) {
          throw res;
        }
        resolve(res.data);
      })
      .catch((e) => {
        reject(e?.data?.message || e?.message || e);
      });
  });
};

const request = { get, post, put, patch };
export default request;
