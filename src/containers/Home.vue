<template>
  <div class="Container">
    <div class="ToolBar">
      <div class="ToolBar_Main">
        <h2 class="ToolBar_Heading">キーワード検索</h2>
        <input @change="searchKeyword" :value="search.keyword" class="ToolBar_Search" type="text">
        選択中 => ジョブ: <img :src="getJobIconById(search.jobId)"> / 手帳: {{search.level}} / キーワード: {{search.keyword}}
      </div>
      <div class="ToolBar_Sub">
        <select class="ToolBar_DisplayCount" name="" id=""></select>
        <ul class="ToolBar_Pager">
          <li class="ToolBar_PagerItem"><a href="">&lt;&lt;</a></li>
          <li class="ToolBar_PagerItem"><a href="">&lt;</a></li>
          <li class="ToolBar_PagerItem">1 / 5</li>
          <li class="ToolBar_PagerItem"><a href="">&gt;</a></li>
          <li class="ToolBar_PagerItem"><a href="">&gt;&gt;</a></li>
        </ul>
      </div>
    </div>
    <div v-if="searching" class="Loading">
      <loading class="Loading_Main"></loading>
    </div>
    <table v-if="!searching" class="CraftList">
      <h3 v-if="search.keyword === ''">最近見たレシピ</h3>
      <h3 v-if="search.keyword !== ''">{{search.keyword}} での検索結果</h3>
      <tr>
        <th class="CraftList_Header">名前</th>
        <th class="CraftList_Header">クラス</th>
        <th class="CraftList_Header">カテゴリ</th>
        <th class="CraftList_Header">Lv</th>
      </tr>
      <tr v-for="item in craftList.items" :key="item.id">
        <td><router-link :to="`/detail/${item.id}`">{{item.name}}</router-link></td>
        <td>{{getJobNameById(item.job.id)}}</td>
        <td>{{item.category}}</td>
        <td>Lv {{item.job.level}}</td>
      </tr>
    </table>
    <div class="Selection">
      <div class="ClassSelection">
        <h3 class="ClassSelection_Heading">クラス別検索</h3>
        <ul class="ClassSelection_List">
          <li v-for="job in jobs" :key="job.id" class="ClassSelection_ListItem">
            <a @click.prevent="searchJob(job.id)" href="">
              <img :src="job.icon" :alt="getJobNameById(job.id)">
            </a>
          </li>
        </ul>
      </div>
      <div class="LevelSelection">
        <h3 class="LevelSelection_Heading">手帳別検索</h3>
        <ul class="LevelSelection_List">
          <li v-for="(level, index) in levels" :key="index" class="LevelSelection_ListItem">
            <a @click.prevent="searchLevel(level)" href="">{{level}}</a>
          </li>
        </ul>
      </div>
      <pager v-if="craftList.page" :paging="craftList.page" class="Pager"></pager>
    </div>
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
    ]),
  },
  methods: {
    ...mapActions([
      'fetchLatest',
      'searchByKeyword',
      'searchByJob',
      'searchByLevel',
      'searchList',
    ]),
    ...mapMutations([
      'updateKeyword',
      'updateJob',
      'updateLevel',
      'updateSearching',
    ]),
    searchKeyword(event) {
      this.updateSearching(true);
      this.updateKeyword(event.target.value);
      //this.searchByKeyword(event.target.value);
    },
    searchJob(id) {
      this.updateSearching(true);
      this.updateJob(id);
      //this.searchByJob(id);
    },
    searchLevel(level) {
      this.updateSearching(true);
      this.updateLevel(level);
      //this.searchByLevel(level);
    }
  },
  watch: {
    search: function() {
      this.searchList();
    }
  },
  created: function() {
    this.fetchLatest();
  },
  components: {
    Loading,
    Pager,
  },
};
</script>

<style scoped lang="scss">
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

    &_Main {
      flex: 1 1 auto;
    }

    &_Sub {
      flex: 0 0 200px;
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
    width: 100%;

    &_Header {
      text-align: left;
    }
  }
  .Selection {
    grid-area: selection;
  }
  .ClassSelection {
    &_List {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;

      &Item {
        list-style: none;
      }
    }
  }
  .LevelSelection {
    &_List {
      &Item {
        list-style: none;
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
