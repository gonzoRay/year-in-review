<template>
  <v-container>
    <v-layout column fill-height>
      <v-flex>
        <AppName large class="pa-3"></AppName>
      </v-flex>

      <v-flex class="about-body">
        <p
          height="300px"
          class="body-1"
        >This app was created to quickly capture memories and events from the past year and display them in a fun way.</p>
      </v-flex>

      <v-flex>
        <h1 class="caption">
          This site was created by
          <a target="_blank" href="https://github.com/gonzoRay">gonzoRay</a>.
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppName from "@/components/AppName";

export default {
  name: "About",
  components: {
    AppName
  }
};
</script>

<style>
.about-body {
  min-height: 100px;
}
</style>
