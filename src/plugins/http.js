/*
App
Created at 09/04/2021 11:44
Author: Khaliq ALI
 */
import axios from 'axios'
import apiRouter from '../router/api-routes'

const http = axios.create({
  baseURL: apiRouter.baseURL
})

http.interceptors.request.use(function (request) {
  if (!request.baseURL.indexOf(apiRouter.baseURL)) {
    console.log('owner site')
  } else {
    console.log('other site')
  }
  return request
}, function (error) {
  return error
})

http.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error.response ||
    { response: { status: error.statusCode, message: error.message } })
})

export default http
