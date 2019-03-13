import Request from '@request';

const state = {
  province: [],
  city: {},
  options: []
}

let getters = {
  
}

let mutations = {
  updateProvince(state, value) {
    state.province = value; 
  },
  updateCity(state, {id,value}) {
    state.city[id] = value;
  },
  updateOptions(state, value) {
    state.options = value;
  }
}

let actions = {
  getProvince({commit, state}) {
    let vm = this;
    if(state.province.length != 0){
      return;
    }
    Request({
      url: '/tradeApi/getProvinceList.do',
      data: {},
      loading: false
    }).then(res => {
      if(res.code == 200){
        commit('updateProvince', res.result.pageItems);
        commit('updateOptions', formatOptionsProvince(res.result.pageItems));
      }
    })
  },
  getCity({commit, state}, provinceId){
    let vm = this;
    if(state.city[provinceId]){
      return Promise.resolve(state.city[provinceId]);
    }
    return Request({
      url: '/tradeApi/getCityList.do',
      data: {
        provinceId
      },
      loading: false
    }).then(res => {
      if(res.code == 200){
        commit('updateCity', {
          id: provinceId,
          value: res.result.pageItems
        });
        commit('updateOptions', formatOptionsCity(res.result.pageItems, provinceId, state));
        console.log(formatOptionsCity(res.result.pageItems, provinceId, state))
        return Promise.resolve(res.result.pageItems);
      }
    })
  }
}

function formatOptionsProvince(val){
  var arr = val.map(item => {
    let obj = {};
    obj.label = item.areaName;
    obj.value = item.areaCode;
    obj.city = [];

    return obj;
  })

  return arr;
}

function formatOptionsCity(val,id, state){
  var arr = val.map(item => {
    let obj = {};
    obj.label = item.cityName;
    obj.value = item.cityCode;

    return obj;
  })
  debugger
  var newArr = state.options;
  newArr.forEach(item => {
    if(item.areaCode == id){
      item.city = arr;
    }
  })

  return newArr;
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

