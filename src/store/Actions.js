const craftListSchema = [
  'id',
  'name_ja',
  'level_view',
  'classjob',
];

export const actions = {
  fetchInit({ commit }) {
    return Promise.resolve()
      .then(() => fetch('https://api.xivdb.com/data/classjobs'))
      .then(res => res.json())
      .then(data => commit('updateClassJobs', data))
      .catch(err => console.log(err));
  },
  fetchList({ commit }) {
    return Promise.resolve()
      //fetch(`https://api.xivdb.com/recipe?columns=${craftListSchema.join()}`)
      .then(() => fetch(`/static/list.json`))
      .then(res => res.json())
      .then((data) => commit('updateList', data))
      .catch(err => console.error(err));
  },
  fetchDetail({ commit }, id) {
    return Promise.resolve()
      .then(() => fetch(`https://api.xivdb.com/recipe/${id}`))
      .then(res => res.json())
      .then((data) => commit('updateDetail', data))
      .catch(err => console.log(err));
  },
};
