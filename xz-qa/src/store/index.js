import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id:'',
    username:'',
    nickname:'',
    article_number:'',
    islogined:false
  },
  mutations: {
    minusArticles(state, payload){
      state.article_number -= payload;
    },
    updateNickname(state, payload){
      state.nickname = payload;
    },
    logined(state, payload){
      state.id = payload.id;
      state.username = payload.username;
      state.article_number = payload.article_number;
      state.islogined = payload.islogined;
      state.islogined = true;
    },
    logoutMutation(state){
      state.id = '';
      state.username = '';
      state.article_number = '';
      state.islogined = '';
      state.islogined = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
