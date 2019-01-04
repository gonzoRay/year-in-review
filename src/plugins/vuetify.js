import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: "md",
  theme: {
    primary: "#00bcd4",
    secondary: "#ff9800",
    accent: "#ffc107",
    error: "#f44336",
    warning: "#f57222",
    info: "#607d8b",
    success: "#4caf50"
  }
});
