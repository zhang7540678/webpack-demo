/* 
** mutations
*/
import * as TYPES from './mutation-types';
export default {
  [TYPES.COUNT_ADD] (state) {
    state.count++;
  },
  [TYPES.COUNT_DEL] (state) {
    state.count--;
  }
}