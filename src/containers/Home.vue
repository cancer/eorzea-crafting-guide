<template>
  <div class="Container">
    <div class="ToolBar">
      <div class="ToolBar_Main">
        <h3 class="ToolBar_Heading">🔍 キーワード検索</h3>
        <input @change="searchKeyword" :value="search.keyword" class="ToolBar_Search" type="text">
      </div>
      <!--div class="ToolBar_Sub">
        <select class="ToolBar_DisplayCount" name="" id=""></select>
        <ul class="ToolBar_Pager">
          <li class="ToolBar_PagerItem"><a href="">&lt;&lt;</a></li>
          <li class="ToolBar_PagerItem"><a href="">&lt;</a></li>
          <li class="ToolBar_PagerItem">1 / 5</li>
          <li class="ToolBar_PagerItem"><a href="">&gt;</a></li>
          <li class="ToolBar_PagerItem"><a href="">&gt;&gt;</a></li>
        </ul>
      </div-->
    </div>
    <div class="CraftList">
      <div v-if="searching" class="Loading">
        <loading class="Loading_Main"></loading>
      </div>
      <table v-if="!searching" class="CraftList_Table">
        <tr v-for="item in craftList.items" :key="item.id" class="CraftList_TableRow">
          <td class="CraftList_TableCell">
            <a @click.prevent="navigateToDetail(item.id)" href="">
              {{item.name}}
            </a>
            <!--router-link :to=""></router-link-->
          </td>
          <td class="CraftList_TableCell">
            <a @click.prevent="navigateToDetail(item.id)" href="">
              {{item.job.name}}
            </a>
          </td>
          <td class="CraftList_TableCell">
            <a @click.prevent="navigateToDetail(item.id)" href="">
              Lv {{item.job.level}}
            </a>
          </td>
        </tr>
      </table>
    </div>
    <div class="Selection">
      <div class="ClassSelection">
        <h3 class="ClassSelection_Heading">🛠 クラス別検索</h3>
        <ul class="ClassSelection_List">
          <li
            v-for="job in jobs"
            :key="job.id"
            :class="{ 'ClassSelection_ListItem--active': job.id === search.job }"
            class="ClassSelection_ListItem"
          >
            <a @click.prevent="searchJob(job.id)" href="">
              <img :src="job.icon" :alt="getJobNameById(job.id)">
            </a>
          </li>
        </ul>
      </div>
      <div class="LevelSelection">
        <h3 class="LevelSelection_Heading">📖 手帳別検索</h3>
        <ul class="LevelSelection_List">
          <li
            v-for="(level, index) in levels"
            :key="index"
            class="LevelSelection_ListItem"
            :class="{ 'LevelSelection_ListItem--active': index === currentLevelIndex }"
          >
            <a @click.prevent="searchLevel(level)" href="">{{level}}</a>
          </li>
        </ul>
      </div>
    </div>
    <pager v-if="craftList.page" :paging="craftList.page" class="Pager"></pager>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Loading from '../components/Loading';
import Pager from '../components/Pager';

export default {
  computed: {
    ...mapState([
      'craftList',
      'jobs',
      'levels',
      'search',
      'searching',
    ]),
    ...mapGetters([
      'getJobNameById',
      'getJobIconById',
      'currentLevelIndex',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchLatest',
      'searchList',
      'changeKeyword',
      'changeJob',
      'changeLevel',
      'saveLatest',
    ]),
    searchKeyword(event) {
      this.changeKeyword(event.target.value);
    },
    searchJob(id) {
      if (this.search.job === id) {
        this.changeJob('');
        return;
      }

      this.changeJob(id);
    },
    searchLevel(level) {
      if (`${this.search.levelLow} - ${this.search.levelHigh}` === level) {
        this.changeLevel('');
        return;
      }

      this.changeLevel(level);
    },
    navigateToDetail(id) {
      this.saveLatest(id);
      this.$router.push(`/detail/${id}`);
    },
  },
  watch: {
    search: function() {
      this.searchList();
    }
  },
  created: function() {
    if (this.search.hasCondition === false) {
      this.fetchLatest();
      return;
    }

    this.searchList();
  },
  components: {
    Loading,
    Pager,
  },
};
</script>

<style scoped lang="scss">
  $heading-color: #ded9d5;
  $box-color: #41444e;
  $box-radius: 5px;
  $box-border: 0px;


  .Container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 100px auto 30px;
    grid-template-areas: "selection tool-bar"
                         "selection craft-list"
                         ".         pager";
    grid-gap: 10px 20px;
    width: 1024px;
    margin: 0 auto;
  }
  .ToolBar {
    grid-area: tool-bar;
    display: flex;
    width: 800px;
    padding: 10px;
    border: $box-border;
    border-radius: $box-radius;
    box-sizing: border-box;
    background-color: $box-color;

    &_Main {
      flex: 1 1 auto;
    }

    &_Sub {
      flex: 0 0 200px;
    }

    &_Heading {
      margin: 0;
      margin-bottom: 10px;
      color: $heading-color;
    }
    &_Search {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
      padding: 3px 10px;
      color: #ffdd61;
      box-sizing: border-box;
      border: 1px solid #797e8d;
      background-color: #5a5e69;
    }

    &_Pager {
      display: flex;

      &Item {
        flex: 1 1 auto;
        list-style: none;
      }
    }
  }
  .CraftList {
    grid-area: craft-list;
    padding: 10px 0px;
    box-sizing: border-box;

    &_Heading {
      height: 40px;
      line-height: 40px;
      margin: 0 0 10px;
      padding-left: 10px;
      color: $heading-color;
    }
    &_Table {
      $C: &;

      width: 100%;
      margin: 0 auto;
      border-radius: 5px;
      border-collapse: collapse;
      border-spacing: 0;
      border-left: 1px solid #5a6075;
      border-right: 1px solid #5a6075;

      &Row {
        background-color: #555861;
        &:nth-child(2n-1) {
          background-color: #41444e;
        }
        &:first-child {
          #{$C}Cell {
            border-top: none;
          }
        }
        &:hover {
          background-color: rgba(255, 234, 24, 0.25);
          a {
            text-decoration: underline;
          }
        }
      }
      &Cell {
        height: 64px;
        line-height: 64px;
        padding-left: 10px;
        border-top: 1px solid #7d8ba2;
        font-weight: bold;
        font-size: 18px;
        color: #fff;
        a {
          display: block;
          height: 100%;
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }
  .Selection {
    grid-area: selection;
    width: 200px;
    padding: 10px;
    border-radius: $box-radius;
    border: $box-border;
    box-sizing: border-box;
    background-color: $box-color;
  }
  .ClassSelection {
    height: 150px;

    &_Heading {
      margin: 0;
      color: $heading-color;
    }
    &_List {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      width: 180px;
      height: 100px;
      margin: 10px auto;
      padding: 12px 5px 5px;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background-color: rgba(255, 255, 255, 0.1);

      &Item {
        list-style: none;
        text-align: center;
        a {
          display: block;
          width: 100%;
          height: 100%;
          &:hover {
            img {
              border: 1px solid #bbb298;
            }
          }
        }
        &--active {
          a {
            img {
              border: 1px solid #ffe69f;
            }
          }
        }
        img {
          display: block;
          margin: auto;
          box-sizing: border-box;
          border-radius: 5px;
        }
      }
    }
  }
  .LevelSelection {
    padding: 5px;

    &_Heading {
      margin: 0;
      color: $heading-color;
    }
    &_List {
      width: 170px;
      padding: 16px 8px 16px 0;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background-color: rgba(255, 255, 255, 0.1);

      &Item {
        list-style: none;
        width: 170px;
        height: 36px;
        line-height: 36px;
        padding-left: 8px;
        box-sizing: border-box;
        &:hover {
          background-color: #787d8c;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          color: #80dcff;
          text-decoration: none;
          &:hover {
            color: #07b2f3;
            text-decoration: underline;
          }
        }
        &--active {
          background-color: #908d6b;
          a {
            color: #fff;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .Pager {
    grid-area: pager;
  }
  .Loading {
    position: relative;
    width: 100%;
    height: 100%;

    &_Main {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
  }
</style>
