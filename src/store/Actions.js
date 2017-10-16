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
      .then(data => commit('updateClassJobs', data))
      .catch(err => console.log(err));
  },
  fetchLatest({ commit }) {
    return Promise.resolve()
      .then(() => JSON.parse(localStorage.getItem('ecg-latest-list')))
      .then(data => commit('updateList', data))
      .catch(err => console.error(err));
  },
  searchList({ commit, state }) {
    const query = {
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
      const [ levelRow, levelHigh ] = state.search.level.split(' - ');
      query["level_view|gt"] = levelRow;
      query["level_view|lt"] = levelHigh;
    }

    return Promise.resolve()
      .then(() => get(`https://api.xivdb.com/search`, query))
      .then(data => {
        commit('updatePage', data.recipes.paging);
        return Promise.all(data.recipes.results.map(item => get(item.url_api)));
      })
      .then(data => {
        commit('updateList',      data);
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
};
