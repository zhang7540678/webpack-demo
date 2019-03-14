import Request from '@request';

const state = {
  province: [],
  city: {},
  options: [],
  optCityState: {}
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
  updateOptions(state, {id, value}) {
    state.options = value;
    id && (state.optCityState[id] = true);
  }
}

let actions = {
  getProvince({commit, state, dispatch}, {provinceId, type}) {
    let vm = this;
    if(state.province.length != 0 && type != 'cascade'){
      return;
    }
    if(state.options.length != 0 && type == 'cascade'){
      return;
    }

    Request({
      url: '/tradeApi/getProvinceList.do',
      data: {},
      loading: false
    }).then(res => {
      if(res.code == 200){
        if(type != 'cascade'){
          commit('updateProvince', res.result.pageItems);
        }else{
          commit('updateOptions', {
            value: formatOptionsProvince(res.result.pageItems)
          });
        }
        //若有省级数据，则带出市级数据
        if(provinceId && type == 'cascade'){
          dispatch('getCity', {provinceId, type});
        }
      }
    })
  },
  getCity({commit, state}, {provinceId, type}){
    let vm = this;
    if(state.city[provinceId] && type != 'cascade'){
      return Promise.resolve(state.city[provinceId]);
    }
    if(state.optCityState[provinceId] && type == 'cascade'){
      return;
    }
    return Request({
      url: '/tradeApi/getCityList.do',
      data: {
        provinceId
      },
      loading: false
    }).then(res => {
      if(res.code == 200){
        if(type != 'cascade'){
          commit('updateCity', {
            id: provinceId,
            value: res.result.pageItems
          });
          return Promise.resolve(res.result.pageItems);
        }else{
          commit('updateOptions', {
            id: provinceId,
            value: formatOptionsCity(res.result.pageItems, provinceId, state)
          });
        }
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
  var newArr = state.options;
  newArr.forEach(item => {
    if(item.value == id){
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

