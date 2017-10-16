<template>
  <ul>
    <li v-for="item in recipes" :key="item.id">
      <button v-if="item.hasRecipe" @click="expand">+</button>
      <img :src="item.icon" width="40" height="40">
      {{item.name}}
      {{item.quantity}}必要
      <button v-if="item.hasRecipe" @click="setMarketFlag">マケボで買う</button>
      <recipe-table v-if="item.hasRecipe" :recipes="item.recipe"></recipe-table>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue';

const recipeTable = {
  props: {
    recipes: Array
  },
  methods: {
    expand(event) {
      console.log(event)
    },
    setMarketFlag(event) {
      console.log(event)
    },
  },
};
export default Vue.component('recipe-table', recipeTable);
</script>

<style lang="scss" scoped>
</style>
