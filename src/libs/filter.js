/* 
** 全局的过滤 
*/
import * as utils from './utils'

/* 
* 字母大写化
*/
export function toUpper(value){
  return utils.toUpper(value);
}

/* 
* 日期格式化
*/
export function date(date, fmt) { 
  return utils.formatDate(date, fmt);
}


