import wepy from 'wepy'

// HTTP工具类
export default class http {
  static async request (method, url, data) {
    const header = this.createAuthHeader()
    const param = {
      url: url,
      method: method,
      header: header,
      data: data
    }
    const res = await wepy.request(param);
    if (this.isSuccess(res)) {
      return res.data.data;
    } else {
      throw this.requestException(res);
    }
  }

  /**
   * 判断请求是否成功
   */
  static isSuccess(res) {
    const wxCode = res.statusCode;
    // 微信请求错误
    if (wxCode !== 200) {
      return false;
    }
    const wxData = res.data;
    return !(wxData && wxData.code !== 0);
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {};
    error.statusCode = res.statusCode;
    const serverData = res.data;
    if (serverData) {
      error.serverCode = serverData.code;
      error.serverMessage = serverData.message;
    }
    return error;
  }
  /**
   * 构造权限头部
   */
  static createAuthHeader () {

  }

  static get (url, data) {
    return this.request('GET', url, data)
  }

  static put (url, data) {
    return this.request('PUT', url, data)
  }

  static post (url, data) {
    return this.request('POST', url, data)
  }

  static patch (url, data) {
    return this.request('PATCH', url, data)
  }

  static delete (url, data) {
    return this.request('DELETE', url, data)
  }
}