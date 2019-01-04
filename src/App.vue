<template>
  <v-app id="sandbox" :dark="dark">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      absolute
      overflow
      app
    >
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Timeline</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/create">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>New Event</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <span @click="gotoHome">
          <AppName/>
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-3">
        <AppName/>
      </span>
      <v-fab-transition>
        <v-btn color="cyan" v-show="showFab()" @click="gotoCreate" fab fixed bottom right>
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AppName from "@/components/AppName";
import CreateEvent from "@/components/CreateEvent";

import firebase from "firebase/app";
import { firestoreDb } from "@/firebase";
import { mutations } from "vuex";

export default {
  name: "App",
  components: {
    AppName,
    CreateEvent
  },
  data: () => ({
    dark: true,
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    }
  }),
  created() {
    const onError = src => error =>
      console.log(`Firebase onSnapshot failed: ${error} src: ${src}`);

    const entriesCollection = firestoreDb
      .collection("entries")
      .orderBy("datetime");

    // Subscribe to changes in Firestore collections in Firebase
    entriesCollection.onSnapshot(entriesRef => {
      this.$store.commit("startLoading");
      this.$store.commit("clearEntries");
      entriesRef.forEach(doc => {
        // console.log("entry added: %o", doc.data());
        this.$store.commit("addEntry", doc.data());
      });
      this.$store.commit("stopLoading");
    }, onError("entries"));
  },
  methods: {
    gotoHome() {
      this.$router.push("/");
    },
    gotoCreate() {
      this.$router.push("/create");
    },
    showFab() {
      return (
        this.$router.currentRoute.path.indexOf("create") === -1 &&
        this.$router.currentRoute.path.indexOf("review") === -1
      );
    }
  }
};
</script>
<style>
</style>
