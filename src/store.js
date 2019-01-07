import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
import { firestoreDb } from "@/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    useDarkTheme: true,
    currentUser: null,
    isLoading: false,
    events: [],
    newEvent: {
      title: "",
      comment: "",
      datetime: null
    }
  },
  getters: {
    darkTheme: state => state.useDarkTheme,
    currentUser: state => state.currentUser,
    isCreating: state => state.isCreating,
    allEvents: state => state.events,
    newEvent: state => state.newEvent
  },
  mutations: {
    toggleDarkTheme: state => (state.useDarkTheme = !state.useDarkTheme),
    setUserData: (state, payload) => (state.currentUser = payload),
    addEvent: (state, payload) => state.events.push(payload),
    updateEvent: (state, payload) => {
      payload.datetime = new Date(payload.datetime);
      state.newEvent = { ...state.newEvent, ...payload };
    },
    clearEvents: state => (state.events.length = 0),
    startLoading: state => (state.isLoading = true),
    stopLoading: state => (state.isLoading = false)
  },
  actions: {
    CREATE_EVENT({ getters }) {
      if (!getters.newEvent) {
        throw new Error("newEvent is empty");
      }

      return firestoreDb
        .collection("users")
        .doc(getters.currentUser.uid)
        .collection("events")
        .add(getters.newEvent);
    },
    UPDATE_EVENT({ commit }, payload) {
      commit("updateEvent", payload);
    },
    DELETE_EVENT({ getters }, payload) {
      console.log("deleting ", payload);
      return firestoreDb
        .collection("users")
        .doc(getters.currentUser.uid)
        .collection("events")
        .doc(payload)
        .delete();
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
