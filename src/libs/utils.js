/* 
** 全局的过滤 
*/

/* 
* 字母大写化
*/
export function toUpper(value){
  return value.toLocaleUpperCase();
}

/* 
* 对Date的扩展，将 Date 转化为指定格式的String
* @param date 日期时间
* @param fmt 日期格式
* "yyyy-MM-dd hh:mm:ss.S" ==> 2006-07-02 08:09:04.423 
* "yyyy-M-d h:m:s.S"      ==> 2006-7-2 8:9:4.18 
*/
export function formatDate(date, fmt) { //author: meizz 
  date = new Date(date);
  !fmt && (fmt='yyyy-MM-dd');
  var o = { 
    "M+" : date.getMonth()+1,     //月份 
    "d+" : date.getDate(),     //日 
    "h+" : date.getHours(),     //小时 
    "m+" : date.getMinutes(),     //分 
    "s+" : date.getSeconds(),     //秒 
    "q+" : Math.floor((date.getMonth()+3)/3), //季度 
    "S" : date.getMilliseconds()    //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
  fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
  if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}

/* 
** 金额千分化
** @param num 数字
** @param decimals 保留小数点位数
** @param flag 是否保留小数位尾部零 默认为true 
*/
export function toThousands(num, decimals, flag) {
  if(!decimals && decimals!='0') decimals = 2;
  if(!num){
    num = 0;
    num = num.toFixed(decimals);
  }
  if(flag==='' || flag==null || flag==undefined){
    flag = true;
  }

  var info = parseFloat(num).toFixed(decimals).toString().split('.');
  num=info[0];
  var result = '';
  while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  info[0] = result;
  if(!flag){
    var len = info[1].length;
    var arr = info[1].split('');
    var index = 1;
    while(arr[len-index] == '0' && index<=len){
      index++;
    }
    arr = arr.slice(0, len-index+1);
    if(arr.length>0){
      info[1] = arr.join('');
    }else{
      info.pop()
    }
  }
  return info.join('.');
}

/* 
** 金额元转万元
** @params num 数字
** @param decimals 保留小数点位数 默认为6
*/
export function formatToWangYuan(num, decimals) {
  var numberReg = /^[0-9]+.?[0-9]*$/;
  if(!numberReg.test(num)){
    return '';
  }
  if(!decimals) decimals=6;

  var origin = decimals - 4;
  if(origin<0) origin = 0;
  num = parseFloat(num).toFixed(origin).toString();
  var numArr = num.split('.');
  var newNum = numArr[0]+numArr[1];
  if(newNum.length <= decimals){
    var zeroNum = decimals+1-newNum.length;
    newNum = fillZero(zeroNum) + newNum;
  }
  var len = newNum.length
  var index = len - decimals;
  var arr = newNum.split('');
  var newIndex = 1;
  while(arr[len-newIndex] == '0' && newIndex<=decimals){
    newIndex++;
  }
  arr = arr.slice(0,len-newIndex+1);
  if(arr.length>index){
    arr.splice(index, 0, '.');
  }

  return toThousands(arr.join (''), decimals, false);
}

/* 
** 补充零
** @params num 零的个数
*/
export function fillZero(num){
  var str = '';
  var index = 0;
  while(index<num){
    str += '0';
    index++;
  }

  return str;
}

/* 
** 金额万元转元
** @params num 数字
** @param decimals 保留小数点位数 默认为2
*/
export function formatWangToYuan(num, decimals) {
  if(isNull(num)){
    return '';
  }
  if(isNull(decimals)){
    decimals = 2;
  }

  num = parseFloat(num).toFixed(decimals+4).toString();
  var index = num.indexOf('.');
  var numArr = num.split('');
  var pre = num[index];
  numArr.splice(index+4,1,'.');
	numArr.splice(index,1,'0');

  return numArr.join('').replace(/\.$/, '')
}function formatWangToYuan(num, decimals) {
  if(isNull(num)){
    return '';
  }
  if(isNull(decimals)){
    decimals = 2;
  }

  num = parseFloat(num).toFixed(decimals+4).toString();
  var index = num.indexOf('.');
  var numArr = num.split('');
  var pre = num[index];
  numArr.splice(index+5,0,'.');
	numArr.splice(index,1,'');

  return numArr.join('').replace(/\.$/, '')
}

/* 
** 判断值是否未数字
** @params val 值
*/
export function isNumber(val) {
  let numReg = /^(0|[1-9]\d*)(\.\d+)?$/;
  if(isNull(val)){
    return false;
  }

  val = val.toString();

  return numReg.test(val);
}

/* 
** 判断是否为空值
** @params val 值
*/

export function isNull(val){
  if(val===null || val===undefined || val===''){
    return true;
  }else{
    return false
  }
}

/* 
** 金额转大写
** @params val 值
*/
export function formatNumToZn(n) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
  var unit = "千百拾亿千百拾万千百拾元角分", str = "";
  n += "00";
  var p = n.indexOf('.');
  if (p >= 0){
    n = n.substring(0, p) + n.substr(p+1, 2);
    unit = unit.substr(unit.length - n.length);   
  }
  for (var i=0; i < n.length; i++){
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  }
  return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}
