<template>
  <v-timeline>
    <v-timeline-item v-for="(entry, i) in allEntries" :color="getNextColor(i)" :key="i" small>
      <span
        slot="opposite"
        :class="`headline font-weight-bold ${getNextColor(i)}--text`"
      >{{ entry.datetime | fromFirebaseTimestamp | formatDate($vuetify.breakpoint.xsOnly) }}</span>
      <div class="py-3">
        <h2 :class="`headline font-weight-light mb-3 ${getNextColor(i)}--text`">{{ entry.title }}</h2>
        <div>{{ entry.comment }}</div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Timeline",
  computed: {
    ...mapGetters(["allEntries"])
  },
  methods: {
    getNextColor: currentIndex => {
      console.log("currentIndex: ", currentIndex);
      const colors = ["cyan", "green", "pink", "amber", "orange"];
      if (currentIndex < colors.length) {
        return colors[currentIndex];
      }

      const artificialIndex = Math.abs(colors.length - currentIndex);
      return colors[artificialIndex];
    }
  }
};
</script>

<style>
</style>
