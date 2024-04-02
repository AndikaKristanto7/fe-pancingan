/* eslint-disable func-names */
module.exports = function () {
    this.getEnv = function (param) {
      if (param === 'NODE_ENV') {
        return process.env.REACT_APP_NODE_ENV
      }
      if (param === 'APP_NAME') {
        return process.env.REACT_APP_NAME
      }
      if (param === 'APP_LOCALE') {
        return process.env.REACT_APP_LOCALE
      }
      if (param === 'BASE_URL') {
        return process.env.REACT_APP_BASE_URL
      }
      if (param === 'API_URL') {
        return process.env.REACT_APP_API_URL
      }
      if(param === 'TINYMCE_API_KEY'){
        return process.env.REACT_APP_TINYMCE_API_KEY
      }
      if(param === 'GMAP_API_KEY'){
        return process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }
      
      return ''
    }
  }
  