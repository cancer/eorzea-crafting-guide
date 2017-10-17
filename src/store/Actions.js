import { httpGet as get } from '../lib/http-get';
import {
  adaptJobs,
  adaptCraftList,
  adaptItemData,
  adaptRecipe,
} from './Adapters'

const craftListSchema = [
  'id',
  'name_ja',
  'level_view',
  'classjob',
];

export const actions = {
  fetchInit({ commit }) {
    return Promise.resolve()
      .then(() => get('https://api.xivdb.com/data/classjobs'))
      .then(data => {
        commit('updateClassJobs', adaptJobs(data));
        commit('updateLevels');
      })
      .catch(err => console.log(err));
  },
  fetchLatest({ commit }) {
    return Promise.resolve()
      .then(() => JSON.parse(localStorage.getItem('ecg-latest-list')) || [])
      .then(data => commit('updateList', data))
      .catch(err => console.error(err));
  },
  searchList({ commit, state }) {
    const query = {
      string:          state.search.keyword,
      classjobs:       state.search.job,
      "level_view|gt": state.search.levelLow,
      "level_view|lt": state.search.levelHigh,
      limit:           state.search.limit,
      page:            state.search.page,
      one:             'recipes',
      language:        'ja',
    };

    return Promise.resolve()
      .then(() => get(`https://api.xivdb.com/search`, query))
      .then(data => {
        commit('updatePage',      data.recipes.paging);
        commit('updateList',      data.recipes.results.map(item => adaptCraftList(item)));
        commit('updateSearching', false);
      })
      .catch(err => console.error(err));
  },
  fetchDetail({ commit }, id) {
    return Promise.resolve()
      .then(() => get(`https://api.xivdb.com/recipe/${id}?language=ja`))
      .then(data => {
        commit('updateDetailItem',   adaptItemData(data));
        commit('updateDetailRecipe', data.tree.map(item => adaptRecipe(item)));
      })
      .catch(err => console.log(err));
  },
  changeKeyword({ commit, state }, keyword) {
    commit('updateHasCondition',    true);
    commit('updateSearching',       true);
    commit('updateSearchCondition', Object.assign({}, state.search, { keyword }));
  },
  changeJob({ commit, state }, job) {
    commit('updateHasCondition',    true);
    commit('updateSearching',       true);
    commit('updateSearchCondition', Object.assign({}, state.search, { job }));
  },
  changeLevel({ commit, state }, level) {
    const [levelLow, levelHigh] = level.split(' - ');
    commit('updateHasCondition',    true);
    commit('updateSearching',       true);
    commit('updateSearchCondition', Object.assign({}, state.search, { levelLow, levelHigh }));
  },
  changePage({ commit, state }, page) {
    commit('updateHasCondition',    true);
    commit('updateSearching',       true);
    commit('updateSearchCondition', Object.assign({}, state.search, { page }));
  },
  toggleToBuyMarket({ commit, getters, state }, id) {
    console.log(state.buyMarket, getters.isToBuyMarket(id))
    if (getters.isToBuyMarket(id)) {
      commit('removeToBuyMarketList', state.buyMarket.filter(itemId => {
        return itemId !== id;
      }));
      return;
    }
    commit('updateToBuyMarketList', id);
  },
  incAmount({ commit, state }) {
    const data = state.amount + 1;
    commit('updateAmount', data);
  },
  decAmount({ commit, state }) {
    const data = state.amount - 1;
    if (data < 1) {
      commit('updateAmount', 1);
      return;
    }
    commit('updateAmount', data);
  },
  changeAmount({ commit, state }, data) {
    if (data < 1) {
      commit('updateAmount', 1);
      return;
    }
    commit('updateAmount', data);
  },
  saveLatest({ commit, state }, id) {
    return Promise.resolve()
      .then(() => JSON.parse(localStorage.getItem('ecg-latest-list')) || [])
      .then(_list => {
        // 同じのが重複しないようにないように
        const list = _list.filter(item => item.id !== id);
        // Max 20 超えたら古いの消す
        if (list.length === 20) {
          list.pop();
        }
        list.unshift(state.craftList.items.find(item => item.id === id));
        return list;
      })
      .then(list => localStorage.setItem('ecg-latest-list', JSON.stringify(list)));
  }
};
