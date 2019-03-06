/* 
** actions
*/
import * as TYPES from './mutation-types';

let actions = {
  //加
  add({commit, state},{name, age}){
    console.log('传参----')
    console.log(name);
    console.log(age)
    commit(TYPES.COUNT_ADD);
  },
  //减
  del({commit, state}){
    if(state.count >= 1){
      commit(TYPES.COUNT_DEL);
    }
  }
}

export default actions;