<template>
  <div class="Pager">
    <ul class="Pager_Container">
      <li class="Pager_Item" :class="{ disabled: paging.page === 1 }">
        <a @click.prevent="changePage(1)" href="">&lt;&lt;</a>
      </li>
      <li class="Pager_Item" :class="{ disabled: disabledPrev }">
        <a @click="changePage(paging.prev)" href="">&lt;</a>
      </li>
      <li
        v-for="(page, idx) in paging.pages"
        :key="idx"
        :class="{ active: idx === currentIndex }"
        class="Pager_Item"
      ><a @click.prevent="changePage(page)" href="">{{page}}</a></li>
      <li class="Pager_Item" :class="{ disabled: disabledNext }">
        <a @click.prevent="changePage(paging.next)" href="">&gt;</a>
      </li>
      <li class="Pager_Item" :class="{ disabled: paging.page === paging.total }">
        <a @click.prevent="changePage(paging.total)" href="">&gt;&gt;</a>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    currentIndex() {
      return this.paging.pages.indexOf(this.paging.page);
    },
    disabledPrev() {
      return this.paging.page === this.paging.prev;
    },
    disabledNext() {
      return this.paging.page === this.paging.next;
    },
  },
  methods: {
    ...mapActions([
      'changePage',
    ]),
  },
}
</script>

<style lang="scss" scoped>
  $box-color: #41444e;
  $box-radius: 5px;

  .Pager {
    width: 100%;
    height: 46px;
    line-height: 46px;
    border-radius: $box-radius;
    background-color: $box-color;

    &_Container {
      display: flex;
      min-width: 300px;
      margin: 0 auto;
      padding: 0;
    }

    &_Item {
      flex: 1 1 auto;
      list-style: none;
      a {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #fff;
        text-decoration: none;
        &:hover {
          background-color: rgba(255, 234, 24, 0.25);
          text-decoration: underline;
        }
      }
      &.active {
        pointer-events: none;
        background-color: rgba(40, 209, 255, 0.38);
      }
      &.disabled {
        pointer-events: none;
        background-color: #535661;
        a,
        a:hover {
          color: #6f737e;
        }
      }
    }
  }
</style>
