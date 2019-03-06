/* 
** actions
*/

let actions = {
  add({commit, state},{name, age}){
    console.log('传参----')
    console.log(name);
    console.log(age)
    commit('add');
  },
  del({commit, state}){
    if(state.count >= 1){
      commit('del');
    }
  }
}

export default actions;