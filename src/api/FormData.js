import request from '@/utils/request'

export function getFormData(param) {
  return request({
    url: "http://202.114.148.160/WHLDWebApi/api/values",
    // url:"http://202.114.148.160/webapi/api/values",
    method: 'get',
    params: {
      form: param
    }  
  })
}
