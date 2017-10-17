import { levelList } from '../constants';

export const mutations = {
  updateClassJobs(state, data) {
    state.jobs = data;
  },
  updateLevels(state) {
    state.levels = levelList;
  },
  updateList(state, data) {
    state.craftList.items = data;
  },
  updatePage(state, data) {
    state.craftList.page = data;
    state.search.page    = 1;
  },
  updateDetailItem(state, data) {
    state.itemData = data;
  },
  updateDetailRecipe(state, data) {
    state.recipe = data;
  },
  updateSearchCondition(state, data) {
    state.search = data;
  },
  updateHasCondition(state, data) {
    state.search.hasCondition = data;
  },
  updateSearching(state, data) {
    state.searching = data;
  },
  updateToBuyMarketList(state, data) {
    state.buyMarket.push(data);
  },
  removeToBuyMarketList(state, data) {
    state.buyMarket = data;
  },
  updateAmount(state, data) {
    state.amount = data;
  },
};
