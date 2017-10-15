<template>
  <div>
    <div>
      <h2>{{itemData.name}}</h2>
      <img :src="itemData.icon" width="120" height="120">
      <img :src="getJobIconById(itemData.job.id)">
      <p v-if="itemData.masterbook.required">{{itemData.masterbook.name}}</p>
      <p>{{getJobNameById(itemData.job.id)}}: Lv {{itemData.job.level}}</p>
      <p>アイテムレベル: {{itemData.level}}</p>
    </div>
    <recipe-table :recipes="recipe"></recipe-table>

    <div v-for="item in materials" :key="item.id">
      {{item.name}} {{item.quantity}}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import RecipeTable from '../components/RecipeTable';

export default {
  computed: {
    ...mapState([
      'itemData',
      'recipe',
    ]),
    ...mapGetters([
      'getJobNameById',
      'getJobIconById',
      'materials',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchDetail',
    ]),
  },
  created: function() {
    const id = this.$route.params.id;
    this.fetchDetail(id);
  },
  mounted: function() {
    console.log(this.$route.params);
  },
  components: {
    RecipeTable,
  },
}
</script>

<style>
</style>
