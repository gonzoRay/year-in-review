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
    ></v-navigation-drawer>
    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <AppName/>
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
        <v-btn color="cyan lighten-2" key="add" v-model="showFab" dark fab fixed bottom right>
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-footer>
  </v-app>
</template>

<script>
import AppName from "@/components/AppName";
import firebase from "firebase/app";
import { firestoreDb } from "@/firebase";
import { mutations } from "vuex";

export default {
  name: "App",
  components: {
    AppName
  },
  data: () => ({
    showFab: false,
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

    const entriesCollection = firestoreDb.collection("entries");

    // Subscribe to changes in Firestore collections in Firebase
    entriesCollection.onSnapshot(entriesRef => {
      this.$store.commit("startLoading");
      this.$store.commit("clearEntries");
      entriesRef.forEach(doc => {
        console.log("entry added: %o", doc.data());
        this.$store.commit("addEntry", doc.data());
      });
      this.$store.commit("stopLoading");
    }, onError("entries"));
  }
};
</script>
<style>
.v-btn--floating {
  position: relative;
}
</style>
