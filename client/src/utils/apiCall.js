import axios from 'axios'

const apiCall = (method, url, data) =>
  axios({
    method: method,
    url: url,
    data: data
  })

export default apiCall
