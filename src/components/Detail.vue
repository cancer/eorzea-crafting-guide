<template>
  <div>
    <img :src="item.icon">
    {{materials}}
    {{item}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'item',
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
  }
}
</script>

<style>
</style>
