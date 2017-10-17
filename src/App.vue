<template>
  <div>
    <div class="Header">
      <h1>Eorzea Crafting Guide</h1>
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

<style>
  html {
    background-color: #4d5262;
  }
  .Header {
    width: 1024px;
    margin: 0 auto;
    font-family: 'Marcellus SC', serif;
    font-size: 24px;
    color: #ffd767;
    text-shadow: 2px 2px 3px rgba(65, 68, 21, 0.46);
  }
</style>
