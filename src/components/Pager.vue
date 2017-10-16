<template>
  <div class="Pager">
    <ul class="Pager_Container">
      <li class="Pager_Item"><a href="">&lt;&lt;</a></li>
      <li class="Pager_Item" :class="{ disabled: disabledPrev }"><a href="">&lt;</a></li>
      <li
        v-for="(page, idx) in pages"
        :key="idx"
        :class="{ active: idx === currentIndex }"
      >{{page}}</li>
      <li class="Pager_Item" :class="{ disabled: disabledNext }"><a href="">&gt;</a></li>
      <li class="Pager_Item"><a href="">&gt;&gt;</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    paging: {
      page:  Number,
      total: Number,
      pages: Array,
      next:  Number,
      prev:  Number,
    },
  },
  computed: {
    pages() {
      const min = Math.max(this.paging.page - 2, 0);
      const max = Math.min(this.paging.page + 2, this.paging.page - 1);
      return this.paging.pages.slice(min, max);
    },
    currentIndex() {
      return this.pages.indexOf(this.paging.page);
    },
    disabledPrev() {
      return this.paging.page === this.paging.prev;
    },
    disabledNext() {
      return this.paging.page === this.paging.next;
    },
  }
}
</script>

<style lang="scss" scoped>
  .Pager {
    &_Container {
      display: flex;
      width: 200px;
      margin: 0 auto;
    }

    &_Item {
      flex: 1 1 auto;
      list-style: none;
    }
  }
</style>
