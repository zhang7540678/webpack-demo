/* 
** 对axios请求的封装
*/
import Axios from 'axios';
import { Loading, MessageBox } from 'element-ui';

let loadingCount = 0;
let loadingInstance; //loading实例
//显示loading状态
let startLoading = () => {
  if(loadingCount>0) return;
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
//关闭loading状态
let closeLoading = () => {
  loadingCount--;
  if(!loadingCount){
    setTimeout(() => {
      loadingInstance.close()
    },0)
  }
}

function Request(option = {}){
  let {
    url,
    method='GET',
    data={},
    timeout=30000,
    loading=true
  } = option;
  let params={};

  if(loading){
    startLoading();
    loadingCount++;
  }
  if(/^get$/i.test(method)){
    params = Object.assign({}, data);
    data = {};
  }
  let reqData = {url, method, data, params, timeout};
  //发送请求
  let createRequest = new Promise(function(resolve, reject){
    Axios.request(reqData).then(res => {
      //请求完成把loading去掉
      loading && closeLoading();
      
      let resData = res.data || {};
      let isErr = false;
      isErr = isErr || (resData.result == 'FAIL');

      if(!isErr){
        resolve(resData)
      }else{
        let errMsg = ''
        errMsg = errMsg || resData.msg;
        errMsg = errMsg || '未知请求报错！';
        MessageBox({type:'error', title: '提示', message: errMsg});
        reject(errMsg)
      }
    }).catch(error => {
      //请求完成把loading去掉
      closeLoading();
      MessageBox({type:'error', title: '提示', message: error.toString()});
      reject(error);
    })
  })

  return createRequest;
}

export default Request;