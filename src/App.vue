<template>
  <v-app id="sandbox" :dark="darkTheme">
    <v-navigation-drawer
      v-if="currentUser"
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
        <v-list-tile class="clickable" @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Log out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        v-if="primaryDrawer.type !== 'permanent' && currentUser"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <span @click="gotoHome">
          <AppName/>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="currentUser" class="welcome-msg hidden-xs-only">Welcome {{ getFirstName() }}</span>
      <v-menu v-model="userMenu" :close-on-content-click="false" :nudge-width="200" offset-x>
        <v-btn icon large slot="activator">
          <v-avatar v-if="currentUser">
            <img :src="getUserPhotoUrl()" alt="user avatar">
          </v-avatar>
        </v-btn>
        <v-card v-if="currentUser">
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="getUserPhotoUrl()" alt="user avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ getUsername() }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ getUserEmail() }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-switch :value="darkTheme" @change="toggleDarkMode" color="accent"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Use dark theme</v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-btn color="primary" flat @click="gotoHome()">My Timeline</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="logout()">Log out</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
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
    userMenu: false,
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: false,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    }
  }),
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
        this.$router.currentRoute.path.indexOf("login") === -1 &&
        this.$router.currentRoute.path.indexOf("review") === -1
      );
    },
    toggleDarkMode() {
      this.$store.dispatch("toggleDarkTheme");
      // this.$store.dispatch('saveUserPrefs', { useDarkTheme: this.useDarkTheme });
      this.userMenu = false;
    },
    getFirstName() {
      const currentUserDisplayName = this.currentUser
        ? this.currentUser.displayName
        : "";
      return currentUserDisplayName ? currentUserDisplayName.split(" ")[0] : "";
    },
    getUsername() {
      return (this.currentUser && this.currentUser.displayName) || "";
    },
    getUserEmail() {
      return this.currentUser ? this.currentUser.email : "";
    },
    getUserPhotoUrl() {
      return this.currentUser ? this.currentUser.photoURL : "";
    },
    subscribeToSnapshot() {
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
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (error) {
        alert(error.message || error);
        this.userMenu = false;
      } finally {
        this.$router.replace("/login");
      }
    }
  },
  computed: {
    ...mapGetters(["currentUser", "darkTheme"]),
    ...mapMutations(["setUserData", "toggleDarkTheme"])
  },
  created() {
    // Listen for auth changes
    firebase.auth().onAuthStateChanged(async user => {
      // Check if we have a user and if there is no user data in the store already
      if (user && !this.$store.state.currentUser) {
        // Get the uid of the user
        const uid = user.uid;
        // Fetch user details based on the uid of the logged in user
        const result = await firestoreDb
          .collection("users")
          .doc(uid)
          .get();
        // Check if the user was found in the firestore db
        // If yes then save the data in the store
        if (result.exists) {
          const userData = result.data();
          this.$store.commit("setUserData", userData);
          this.subscribeToSnapshot();
        }
      } else {
        // We have no user data, clear the store
        this.$store.commit("setUserData", null);
      }
    });
  }
};
</script>
<style lang="stylus">
.google-logo {
  img {
    padding-right: 12px;
  }
}

.welcome-msg {
  padding-right: 10px;
}

.clickable {
  cursor: pointer;
}
</style>
