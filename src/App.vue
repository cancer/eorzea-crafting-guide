<template>
  <div>
    <div class="Header">
      <h1>Cookook Pad</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'fetchInit',
    ]),
  },
  created: function() {
    this.fetchInit();
  }
}
</script>

<style scoped>
  .Header {
    width: 1024px;
    margin: 0 auto;
  }
</style>
