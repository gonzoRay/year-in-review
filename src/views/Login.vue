<template>
  <v-container fill-height>
    <v-layout column align-center>
      <v-flex class="text-xs-center">
        <div class="py-4">
          <AppName large></AppName>
        </div>
      </v-flex>
      <v-flex>
        <v-btn
          large
          color="primary"
          flat
          outline
          class="google-logo"
          @click.prevent="signInWithGoogle"
        >
          <img height="25px" src="../assets/google-logo.png">Sign in with Google
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import { firestoreDb } from "@/firebase";

import AppName from "@/components/AppName";

export default {
  name: "Login",
  components: {
    AppName
  },
  methods: {
    async signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userData = {
        uid: "",
        displayName: "",
        email: "",
        photoURL: "",
        events: []
      };

      try {
        const authenticatedUser = await firebase
          .auth()
          .signInWithPopup(provider);

        userData.uid = authenticatedUser.user.uid;
        userData.displayName = authenticatedUser.user.displayName;
        userData.email = authenticatedUser.user.email;
        userData.photoURL = authenticatedUser.user.photoURL;

        await firestoreDb
          .collection("users")
          .doc(userData.uid)
          .set(userData);

        this.$router.replace("/");
      } catch (error) {
        console.error("Error signing in: ", error);
        alert(error.message || error);
      }
    },
    ...mapGetters(["currentUser", "isLoading"])
  }
};
</script>

<style>
</style>
