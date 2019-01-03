import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    entries: []
  },
  getters: {
    isCreating: state => state.isCreating,
    allEntries: state => state.entries
  },
  mutations: {
    clearEntries: state => (state.entries.length = 0),
    addEntry: (state, payload) => {
      state.entries.push(payload);
    },
    startLoading: state => (state.isLoading = true),
    stopLoading: state => (state.isLoading = false)
  },
  actions: {
    createEvent(context, payload) {
      context.commit("addEntry", payload);
    }
  }
});
