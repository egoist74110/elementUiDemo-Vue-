import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    user:{
      username:'请登录！'
    }
  },
  mutations:{
    setUser(state,user){
      state.user = user;
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    }),
  ]
})
