import Vue from "vue";
import Vuex from "vuex";

import { firestoreDb } from "@/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    entries: [],
    newEntry: {
      title: "",
      comment: "",
      datetime: null
    }
  },
  getters: {
    isCreating: state => state.isCreating,
    allEntries: state => state.entries,
    newEntry: state => state.newEntry
  },
  mutations: {
    addEntry: (state, payload) => state.entries.push(payload),
    updateEntry: (state, payload) => {
      payload.datetime = new Date(payload.datetime);
      state.newEntry = { ...state.newEntry, ...payload };
    },
    clearEntries: state => (state.entries.length = 0),
    startLoading: state => (state.isLoading = true),
    stopLoading: state => (state.isLoading = false)
  },
  actions: {
    createEvent(context, payload) {
      return firestoreDb.collection("entries").add(payload);
    }
  }
});
