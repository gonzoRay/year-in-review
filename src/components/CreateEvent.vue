<template>
  <v-container fill-height>
    <v-layout column justify-space-between>
      <v-flex xs1 d-flex>
        <div class="headline title-input">What would you like to add to the timeline?</div>
      </v-flex>
      <v-flex xs1>
        <div class="title">
          <v-text-field
            v-model="newEvent.title"
            prepend-icon="title"
            placeholder="What was it?"
            required
          ></v-text-field>
        </div>
      </v-flex>
      <v-spacer></v-spacer>

      <v-flex xs1 md4 align-end d-flex>
        <div class="action-button">
          <v-btn color="cyan" :block="$vuetify.breakpoint.xsOnly" outline large>Okay!</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "CreateEvent",
  data: () => {
    return {
      newEvent: Object
    };
  }
};
</script>

<style>
.title-input {
  margin: 15px;
}
.action-button {
  margin: 15px;
}
</style>
