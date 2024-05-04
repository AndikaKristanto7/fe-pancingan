/**
 * This class is intended for making http calls (get, post, put, delete)
 * with separate functions to generate headers needed when
 * we hit our APIs
 */

import axios from 'axios'

class Http {  
  
  constructor(){
    if(this.areWeTestingWithJest()){
      return this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraWthenVraXRhbm9AZ21haWwuY29tIiwiaWF0IjoxNzE0ODE4NzYzLCJleHAiOjE3MTY2MTg3NjN9.RWzzZtbcePARXLoegG_fWd9aaDJyIRfEDQuD9H_MP_s"
    }
    this.cookie = document.cookie.split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
    this.token = ''
    if(this.cookie.user){
      this.cookie.user = JSON.parse(this.cookie.user)
      // console.log(this.cookie.user.token)
      this.token = this.cookie.user.token
    }
  }

  areWeTestingWithJest() {
    return process.env.JEST_WORKER_ID !== undefined;
  }

  getLang() {
    const i18nLocale = sessionStorage.getItem('i18nLocale')

    if (i18nLocale === 'en') {
      return 'en_US'
    }

    return 'id_ID'
  }

  generateHeaders(
    contentType,
    token = ""
  ) {
    const header = {}
    header['Content-Type'] = contentType
    if(token !== ""){
      header['Authorization'] = `Bearer ${token}`
    }
    return header
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
      this.token
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
      
      payload.append('file', data.file)
    
    }

    // generate headers for this request
    const headers = this.generateHeaders(
        contentType,
        this.token
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
        "application/json",
        this.token
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
