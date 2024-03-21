/**
 * This class is intended for making http calls (get, post, put, delete)
 * with separate functions to generate headers needed when
 * we hit our APIs
 */

import axios from 'axios'

class Http {

  getLang() {
    const i18nLocale = sessionStorage.getItem('i18nLocale')

    if (i18nLocale === 'en') {
      return 'en_US'
    }

    return 'id_ID'
  }

  generateHeaders(
    contentType,
  ) {
    return {
      'Content-Type': contentType
    }
  }

  get(url, params) {
    let uri = url
    const esc = encodeURIComponent

    if (params) {
      const query = Object.keys(params)
        .map(k => `${esc(k)}=${esc(params[k])}`)
        .join('&')

      uri = `${url}?${query}`
    }

    // generate headers for this request
    const headers = this.generateHeaders(
        'application/json'
    )
    const response = axios({
      method: 'get',
      url: uri,
      headers
    })

    response
    .then((res) => {
        return res
    })

    return response
  }

  delete(url, params) {
    let uri = url
    const esc = encodeURIComponent
    if (params) {
      const query = Object.keys(params)
        .map(k => `${esc(k)}=${esc(params[k])}`)
        .join('&')

      uri = `${url}?${query}`
    }

    // generate headers for this request
    const headers = this.generateHeaders(
      'application/json',
    )
    const response = axios({
      method: 'delete',
      url: uri,
      headers
    })

    response
    .then((res) => {
        return res
    })

    return response
  }

  post(url, data) {
    let payload
    let contentType
    let responseType = 'json'

    if (data.responseType === 'blob') {
      payload = JSON.stringify(data.value)
      contentType = 'application/json'
      responseType = data.responseType
    }
    else if (!data.file) {
      payload = JSON.stringify(data)
      contentType = 'application/json'
    }
    else {
      contentType = 'multipart/form-data'
      payload = new FormData()
      payload.append('isPrivate', data.isPrivate)

      // payload for oss
      payload.append('file', data.file)
      payload.append('data', JSON.stringify(data.parameter))

      // payload for ocr
      payload.append('image', data.file)
    }

    // generate headers for this request
    const headers = this.generateHeaders(
        contentType
    )
    const response = axios({
      method: 'post',
      url,
      responseType,
      data: payload,
      headers
    })

    response
    .then((res) => {
        return res
    })

    return response
  }

  put(url, data) {
    const payload = JSON.stringify(data)
    const headers = this.generateHeaders(
        "application/json"
    )
    const response = axios({
      method: 'put',
      url,
      data: payload,
      headers
    })

    response
    .then((res) => {
        return res
    })

    return response
  }
}

export default new Http()
