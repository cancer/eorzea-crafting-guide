<template>
  <div class="Loading">
    <div class="Loading_Bar Loading_Bar--Item1"></div>
    <div class="Loading_Bar Loading_Bar--Item2"></div>
    <div class="Loading_Bar Loading_Bar--Item3"></div>
    <div class="Loading_Bar Loading_Bar--Item4"></div>
    <div class="Loading_Bar Loading_Bar--Item5"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.component('loading', {});
</script>

<style lang="scss" scoped>
.Loading {
  width: 120px;
  height: 50px;

  &_Bar {
    height: 30px;
    width: 10px;
    background-color: #cecabb;
    display: inline-block;
    margin-right: 5px;
    animation: loading 1s infinite;
    &--Item1 {
      animation-delay: 0.5s;
    }
    &--Item2 {
      animation-delay: 0.6s;
    }
    &--Item3 {
      animation-delay: 0.7s;
    }
    &--Item4 {
      animation-delay: 0.8s;
    }
    &--Item5 {
      animation-delay: 0.9s;
    }
  }
}

@keyframes loading {
  30% {
    transform: scaleY(2);
  }
}
</style>
