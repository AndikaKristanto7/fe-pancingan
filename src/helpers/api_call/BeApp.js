import httpCall from '../../helpers/Http'

const Env = require('../../helpers/Env')

const env = new Env()

class BeApp {
  constructor() {
    this.baseUrl = `${env.getEnv('API_URL')}/api/v1`
    this.blog = `${this.baseUrl}/blog`
    this.uploadUrl = `${env.getEnv('API_URL')}/picture`
  }

  getBlogs(param = {}){
    return httpCall.get(`${this.blog}s`,param)
  }

  postBlog(data){
    return httpCall.post(`${this.blog}`,data)
  }

  getBlogBySlug(slug){
    return httpCall.get(`${this.blog}/${slug}`)
  }

  updateBlogBySlug(slug,data){
    return httpCall.put(`${this.blog}/${slug}`,data)
  }

  deleteBlogBySlug(slug){
    return httpCall.delete(`${this.blog}/${slug}`)
  }

  postLogin(data){
    return httpCall.post(`${this.baseUrl}/login`,data)
  }

  postUpload(data){
    return httpCall.post(`${this.uploadUrl}`,data)
  }

  publishBlog(slug){
    return httpCall.put(`${this.blog}/publish/${slug}`)
  }

}
export default new BeApp()