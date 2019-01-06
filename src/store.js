import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
import { firestoreDb } from "@/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    useDarkTheme: true,
    currentUser: null,
    isLoading: false,
    entries: [],
    newEntry: {
      title: "",
      comment: "",
      datetime: null
    }
  },
  getters: {
    darkTheme: state => state.useDarkTheme,
    currentUser: state => state.currentUser,
    isCreating: state => state.isCreating,
    allEntries: state => state.entries,
    newEntry: state => state.newEntry
  },
  mutations: {
    toggleDarkTheme: state => (state.useDarkTheme = !state.useDarkTheme),
    setUserData: (state, payload) =>
      (state.currentUser = { ...state.currentUser, ...payload }),
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
    createEvent({ getters }, payload) {
      return firestoreDb
        .collection("users")
        .doc(getters.currentUser.uid)
        .collection("events")
        .add(payload);
    },
    logout({ commit }) {
      commit("setUserData", null);
      return firebase.auth().signOut();
    },
    toggleDarkTheme({ commit }) {
      commit("toggleDarkTheme");
    }
  }
});
