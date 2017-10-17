export const getters = {
  findJob: state => id => {
    return state.jobs.find(job => job.id === id);
  },
  getJobNameById: (state, getters) => id => {
    const job = getters.findJob(id);
    if (job) {
      return job.name;
    }

    return '';
  },
  getJobIconById: (state, getters) => id => {
    const job = getters.findJob(id);
    if (job) {
      return job.icon;
    }

    return '';
  },
  currentLevelIndex: state => {
    const levelStr = `${state.search.levelLow} - ${state.search.levelHigh}`;
    return state.levels.indexOf(levelStr);
  },
  materials: (state, getters) => {
    const _iterator = (prev, current) => {
      if (getters.isToBuyMarket(current.id))  {
        return prev;
      }
      if (current.recipe.length === 0) {
        prev.push(current);
        return prev;
      }
      return prev.concat(current.recipe.reduce(_iterator, []));
    };
    const materials = state.recipe.reduce(_iterator, []);

    return materials.reduce((prev, current) => {
      const target = prev.find(item => item.id === current.id);
      if (!target) {
        const clone = Object.assign({}, current);
        clone.quantity = clone.quantity * state.amount;
        prev.push(clone);
        return prev;
      }

      return prev.map(item => {
        if (item.id === current.id) {
          item.quantity += current.quantity * state.amount;
        }
        return item;
      });
    }, []).sort((a, b) => b.id - a.id);
  },
  isToBuyMarket: state => id => {
    return !!state.buyMarket.find(itemId => itemId === id);
  },
};
