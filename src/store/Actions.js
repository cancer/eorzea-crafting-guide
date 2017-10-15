const craftListSchema = [
  'id',
  'name_ja',
  'level_view',
  'classjob',
];

const get = (url, _query) => {
  if (!_query) {
    return new Promise((resolve, reject) => {
      fetch(`${url}`)
        .then(res  => resolve(res.json()))
        .catch(err => reject(err));
    });
  }

  const query = Object.keys(_query).reduce((acc, key) => {
    acc.push(`${key}=${_query[key]}`);
    return acc;
  }, []).join('&');
  return new Promise((resolve, reject) => {
    fetch(`${url}?${query}`)
      .then(res  => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const actions = {
  fetchInit({ commit }) {
    return Promise.resolve()
      .then(() => get('https://api.xivdb.com/data/classjobs'))
      .then(data => commit('updateClassJobs', data))
      .catch(err => console.log(err));
  },
  fetchList({ commit }) {
    return Promise.resolve()
      //fetch(`https://api.xivdb.com/recipe?columns=${craftListSchema.join()}`)
      .then(() => get(`/static/list.json`))
      .then(data => commit('updateList', data))
      .catch(err => console.error(err));
  },
  search({ commit }, query) {
    return Promise.resolve()
      .then(() => get(`https://api.xivdb.com/search`, query))
      .then(data => Promise.all(data.recipes.results.map(item => get(item.url_api))))
      .then(data => {
        commit('updateList', data.map(item => {
          return {
            id:         item.id,
            name_ja:    item.name_ja,
            classjob:   item.classjob.id,
            level_view: item.level_view,
          };
        }));
        commit('updateSearching', false);
      })
      .catch(err => console.error(err));
  },
  searchByKeyword({ commit, dispatch }, keyword) {
    const query = {
      string:   keyword,
      one:      'recipes',
      language: 'ja',
    };
    return dispatch('search', query);
  },
  searchByJob({ commit, dispatch }, jobId) {
    const query = {
      classjobs: jobId,
      one:       'recipes',
      language:  'ja',
    };
    return dispatch('search', query);
  },
  searchByLevel({ commit, dispatch }, level) {
    const [ levelRow, levelHigh ] = level.split(' - ');
    const query = {
      "level_view|gt": levelRow,
      "level_view|lt": levelHigh,
      one:             'recipes',
      language:        'ja'
    };
    return dispatch('search', query);
  },
  fetchDetail({ commit }, id) {
    return Promise.resolve()
      .then(() => get(`https://api.xivdb.com/recipe/${id}`))
      .then(data => commit('updateDetail', data))
      .catch(err => console.log(err));
  },
};
