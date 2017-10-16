import { httpGet as get } from '../lib/http-get';

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
        commit('updateClassJobs', data);
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
    console.log(state.search.page)
    const query = {
      limit:    state.search.limit,
      page:     state.search.page,
      one:      'recipes',
      language: 'ja',
    };
    if (state.search.keyword) {
      query["string"] = state.search.keyword;
    }
    if (state.search.job) {
      query["classjobs"] = state.search.job;
    }
    if (state.search.level) {
      query["level_view|gt"] = state.search.level.low;
      query["level_view|lt"] = state.search.level.high;
    }

    return Promise.resolve()
      .then(() => get(`https://api.xivdb.com/search`, query))
      .then(data => {
        commit('updatePage',      data.recipes.paging);
        commit('updateList',      data.recipes.results);
        commit('updateSearching', false);
      })
      .catch(err => console.error(err));
  },
  fetchDetail({ commit }, id) {
    return Promise.resolve()
      .then(() => get(`https://api.xivdb.com/recipe/${id}`))
      .then(data => commit('updateDetail', data))
      .catch(err => console.log(err));
  },
  changeKeyword({ commit, state }, keyword) {
    commit('updateSearching', true);
    commit('updateSearchCondition', Object.assign({}, state.search, { keyword }));
  },
  changeJob({ commit, state }, job) {
    commit('updateSearching', true);
    commit('updateSearchCondition', Object.assign({}, state.search, { job }));
  },
  changeLevel({ commit, state }, level) {
    const [levelLow, levelHigh] = level.split(' - ');
    commit('updateSearching', true);
    commit('updateSearchCondition', Object.assign({}, state.search, { levelLow, levelHigh }));
  },
  changePage({ commit, state }, page) {
    console.log(page)
    commit('updateSearching', true);
    commit('updateSearchCondition', Object.assign({}, state.search, { page }));
  }
};
