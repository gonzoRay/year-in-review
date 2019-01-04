<template>
  <v-container fill-height>
    <v-stepper v-model="currentStep" flat vertical>
      <v-stepper-step :complete="currentStep > 1" step="1" editable>
        Title
        <small>Be brief</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-layout column justify-space-between>
          <v-flex xs1 d-flex>
            <div class="headline title-input">What would you like to add to the timeline?</div>
          </v-flex>
          <v-flex xs1>
            <div class="title">
              <v-text-field
                v-model="newEntry.title"
                prepend-icon="title"
                placeholder="What was it?"
                required
              ></v-text-field>
            </div>
          </v-flex>
          <v-spacer></v-spacer>

          <v-flex xs1 md12 align-end d-flex>
            <div class="action-button">
              <v-btn
                color="cyan"
                :block="$vuetify.breakpoint.xsOnly"
                @click="currentStep = 2"
                outline
                large
              >Next</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-stepper-content>
      <v-stepper-step :complete="currentStep > 2" step="2" editable>
        When?
        <small>Pick a date</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-layout column justify-space-between>
          <v-flex xs1 d-flex>
            <div class="headline title-input">What month was this?</div>
          </v-flex>
          <v-flex xs1 md12 d-flex>
            <v-menu
              ref="dateMenu"
              v-model="dateMenu"
              :nudge-right="40"
              :close-on-content-click="false"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="newEntry.datetime"
                label="Pick the date"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                ref="picker"
                v-model="newEntry.datetime"
                color="cyan"
                no-title
                :min="datePickerMin"
                :max="datePickerMax"
              >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="dateMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="pickDate(newEntry.datetime)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs1 md12 align-end d-flex>
            <div class="action-button">
              <v-btn
                color="cyan"
                :block="$vuetify.breakpoint.xsOnly"
                @click="currentStep = 3"
                outline
                large
              >Continue</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-stepper-content>
      <v-stepper-step :complete="currentStep > 3" step="3" editable>
        Description
        <small>Go nuts</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-layout column justify-space-between>
          <v-flex xs1 d-flex>
            <div class="headline title-input">Give me those juicy details!</div>
          </v-flex>
          <v-flex xs1 md12 d-flex>
            <div class="action-button">
              <v-textarea
                v-model="newEntry.comment"
                prepend-icon="notes"
                placeholder="Any specific thoughts or details to add?"
                required
              ></v-textarea>
            </div>
          </v-flex>
          <v-flex xs1 md12 align-end d-flex>
            <div class="action-button">
              <v-btn
                color="success"
                :block="$vuetify.breakpoint.xsOnly"
                @click="gotoReviewEvent"
                outline
                large
              >Review this event</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CreateEvent",
  data() {
    return {
      currentStep: 1,
      dateMenu: false,
      datePickerMin: "2018-01-01",
      datePickerMax: "2018-12-01"
    };
  },
  watch: {
    dateMenu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "MONTH"));
    }
  },
  methods: {
    gotoReviewEvent() {
      this.updateEntry(this.newEntry);
      this.$router.push("review");
    },
    pickDate(selectedValue) {
      this.$refs.dateMenu.save(selectedValue);
      this.currentStep = 3;
    },
    ...mapGetters(["newEntry"]),
    ...mapMutations(["updateEntry"])
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
