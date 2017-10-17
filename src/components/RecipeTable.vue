<template>
  <ul class="RecipeTable">
    <li
      v-for="item in recipes"
      :key="item.id"
      class="RecipeTable_Row"
      :class="{
        'RecipeTable_Row--hasChild': item.hasRecipe,
        'RecipeTable_Row--disabled': isToBuyMarket(item.id)
      }"
    >
      <div class="RecipeTable_Item">
        <img :src="item.icon" width="40" height="40">
        {{item.name}}
        {{item.quantity}}個
      </div>
      <button
        v-if="!item.isShard"
        @click="toggleToBuyMarket(item.id)"
        class="RecipeTable_ToBuyMarket"
      >
        <span v-if="isToBuyMarket(item.id)">✔</span>
        ️<span v-if="!isToBuyMarket(item.id)">⁃</span>
        マケボで買う
      </button>
      <recipe-table v-if="item.hasRecipe && !isToBuyMarket(item.id)" :recipes="item.recipe"></recipe-table>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

const recipeTable = {
  props: {
    recipes: Array
  },
  computed: {
    ...mapGetters([
      'isToBuyMarket',
    ]),
  },
  methods: {
    ...mapActions([
      'toggleToBuyMarket',
    ]),
  },
};
export default Vue.component('recipe-table', recipeTable);
</script>

<style lang="scss" scoped>
  .RecipeTable {
    background-color: #555861;
    margin: 0;
    padding: 0;
    & .RecipeTable {
      margin-top: 10px;
      border-radius: 2px;
      background-color: #666970;
    }

    &_Row {
      display: grid;
      grid-template-columns: auto 140px;
      grid-template-rows: 46px auto;
      grid-template-areas: "item button"
                           "child child";
      list-style: none;
      height: 46px;
      line-height: 46px;
      padding: 14px;
      border-top: 1px solid #7d8ba2;
      font-size: 18px;
      color: #fff;
      &:first-child {
        border-top: none;
      }
      &--hasChild {
        height: auto;
        line-height: auto;
      }
      &--disabled {
        background-color: #3e4048;
        color: #747782;
        img {
          opacity: 0.5;
        }
      }
      & .RecipeTable {
        grid-area: child;
      }
      img {
        vertical-align: middle;
        margin-right: 10px;
        border: 1px solid #868ea7;
        border-radius: 5px;
      }
    }
    &_Item {
      grid-area: item;
    }
    &_ToBuyMarket {
      grid-area: button;
      font-size: 14px;
      color: #fff294;
      border: none;
      background: none;
      &:hover {
        cursor: pointer;
        color: #ffe214;
        text-decoration: underline;
      }
    }
  }
</style>
