<template>
  <div class="Container">
    <div class="Navigation">
      <router-link :to="'/'">&lt;&lt; リストへ戻る</router-link>
    </div>
    <div class="ItemView">
      <h2 class="ItemView_Name">{{itemData.name}}</h2>
      <img :src="itemData.icon" class="ItemView_Icon" width="120" height="120">
      <div class="ItemView_Description">
        <div class="ItemView_Job">
          <div class="ItemView_JobIcon">
            <img :src="getJobIconById(itemData.job.id)">
          </div>
          <div class="ItemView_JobName">{{getJobNameById(itemData.job.id)}}: Lv {{itemData.job.level}}</div>
        </div>
        <div v-if="itemData.masterbook.required" class="ItemView_Master">
          {{itemData.masterbook.name}}
        </div>
        <div class="ItemView_ItemLevel">
          アイテムレベル: {{itemData.level}}
        </div>
      </div>
      <div class="CraftAmount">
        <h4 class="CraftAmountHeading">製作個数</h4>
        <div class="CraftAmount_Inner">
          <button
            @click="decAmount"
            class="CraftAmount_Button CraftAmount_ButtonDec">-</button>
          <input
            :value="amount"
            @change="onChangeAmount"
            class="CraftAmount_Value">
          <button
            @click="incAmount"
            class="CraftAmount_Button CraftAmount_ButtonInc">+</button>
        </div>
      </div>
    </div>
    <div class="Recipe">
      <h3 class="RecipeHeading">📙 製作レシピ</h3>
      <recipe-table :recipes="recipe"></recipe-table>
    </div>

    <div class="Material">
      <h3 class="MaterialHeading">💎 必要な素材数</h3>
      <table class="MaterialTable">
        <tr v-for="item in materials" :key="item.id" class="MaterialTable_Row">
          <td class="MaterialTable_Icon">
            <img :src="item.icon" width="40" height="40">
          </td>
          <td class="MaterialTable_Amount">
            {{item.quantity}}
          </td>
          <td class="MaterialTable_ItemName">
            {{item.name}}
          </td>
        </tr>
      </table>
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
      'amount',
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
      'decAmount',
      'incAmount',
      'changeAmount',
    ]),
    onChangeAmount(event) {
      this.changeAmount(event.target.value);
    }
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

<style lang="scss" scoped>
  $heading-color: #fff;
  $box-color: #41444e;
  $box-radius: 5px;

  .Container {
    display: grid;
    grid-template-columns: 0.25fr 0.25 0.5fr;
    grid-template-rows: 26px 150px auto;
    grid-template-areas: "navigation . ."
                         "item-view item-view item-view"
                         "material material recipe";
    grid-column-gap: 40px;
    width: 1200px;
    height: auto;
    min-height: 1000px;
    margin: 0 auto;
    padding: 10px 20px 20px;
    border-radius: $box-radius;
    box-sizing: border-box;
    background-color: $box-color;
  }
  .Navigation {
    grid-area: navigation;
    padding: 0 0 10px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      color: #c5c9d6;
      &:hover {
        color: #e5ebff;
      }
    }
  }
  .ItemView {
    grid-area: item-view;
    display: grid;
    grid-template-columns: 150px 1fr 200px;
    grid-template-rows: 50px 1fr 84px;
    grid-template-areas: "icon name ."
                         "icon descriptions ."
                         "icon descriptions amount";
    width: 1160px;
    color: #fff;

    &_Name {
      grid-area: name;
      margin: 10px 0;
    }
    &_Icon {
      grid-area: icon;
      display: block;
      margin: 10px auto;
      border: 1px solid #9fa6bf;
      border-radius: 10px;
    }
    &_Description {
      grid-area: descriptions;
      height: auto;
    }
    &_Job {
      display: flex;
      height: 32px;
      line-height: 32px;
      margin-bottom: 10px;
      &Name {}
      &Icon {}
    }
    &_Master {
      font-weight: bold;
      color: #ffb61d;
    }
  }
  .CraftAmount {
    grid-area: amount;
    width: 200px;
    height: 84px;
    &Heading {
      height: 24px;
      line-height: 24px;
      margin: 0 0 10px;
      font-size: 16px;
      font-weight: normal;
      color: #ded9d5;
    }
    &_Inner {
      display: flex;
      height: 50px;
    }
    &_Button {
      display: block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border: none;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      background: none;
      background-color: #555862;
      &Dec {
        border-radius: 10px 0 0 10px;
      }
      &Inc {
        border-radius: 0 10px 10px 0;
      }
      &:hover {
        background-color: rgba(255, 234, 24, 0.25);
      }
    }
    &_Value {
      width: 100px;
      height: 50px;
      line-height: 50px;
      border: none;
      border-left: 1px solid #6b7077;
      border-right: 1px solid #6b7077;
      box-sizing: border-box;
      font-size: 20px;
      text-align: center;
      color: #ffdd61;
      background-color: #5a5e69;
      &:hover {
        background-color: rgba(255, 234, 24, 0.25);
      }
    }
  }
  .Recipe {
    grid-area: recipe;
    &Heading {
      height: 30px;
      line-height: 30px;
      color: #ded9d5;
    }
  }
  .Material {
    grid-area: material;

    &Heading {
      height: 30px;
      line-height: 30px;
      color: #ded9d5;
    }
    &Table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;

      &_Row {
        height: 46px;
        line-height: 46px;
        border-top: 1px solid #7d8ba2;
        font-size: 18px;
        color: #fff;
        background-color: #555861;
        &:first-of-type {
          border-top: none;
        }
      }
      &_Icon {
        width: 40px;
        padding: 10px;
        img {
          vertical-align: middle;
          border: 1px solid #868ea7;
          border-radius: 5px;
        }
      }
      &_Amount {
        width: auto;
        font-size: 24px;
        font-weight: bold;
        color: #ffdd61;
        text-align: center;
      }
    }
  }
</style>
