import axios from 'axios'

const apiCall = (method, url, data = '', headers) =>
  axios({
    method: method,
    url: url,
    data: data,
    headers: headers
  })

export default apiCall
