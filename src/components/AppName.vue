<template>
  <span>
    <div class="large" v-if="large">
      <span class="font-weight-light display-3">story</span>
      <span class="font-weight-light pl-1 display-1">
        <span class="d-block">
          <span class="amber--text">[</span>
          <span class="cyan--text px-1">lines</span>
          <span class="amber--text">]</span>
        </span>
      </span>
    </div>
    <div class="normal" v-if="!large">
      <span class="font-weight-light title">story</span>
      <span class="font-weight-light pl-1 body-3">
        <span>
          <span class="amber--text">[</span>
          <span class="cyan--text px-1">lines</span>
          <span class="amber--text">]</span>
        </span>
      </span>
    </div>
  </span>
</template>

<script>
export default {
  name: "AppName",
  props: {
    large: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
.appyear-title {
  padding-right: 3px;
}
</style>
