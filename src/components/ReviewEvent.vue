<template>
  <v-card class="pa-3">
    <v-card-title class="display-1">Review your event</v-card-title>
    <v-card-text>
      <div class="review-line">
        <div class="caption">Title</div>
        <span class="headline">{{ newEvent.title }}</span>
      </div>
      <div class="review-line">
        <div class="caption">Date</div>
        <span class="title">{{ getMonthAsDate() | formatDate }}</span>
      </div>
      <div class="review-line">
        <div class="caption">Comment</div>
        <span class="body-2">{{ newEvent.comment }}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <div class="action-button">
        <v-btn
          color="cyan"
          :block="$vuetify.breakpoint.xsOnly"
          @click="publishEvent()"
          outline
          large
        >Publish to Storyline</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ReviewEvent",
  methods: {
    getMonthAsDate() {
      return new Date(this.newEvent.datetime);
    },
    publishEvent() {
      this.$store.dispatch("CREATE_EVENT");
      this.$router.replace("/");
    }
  },
  computed: {
    ...mapGetters(["newEvent"])
  }
};
</script>

<style>
.review-line {
  margin-top: 15px;
}
</style>
