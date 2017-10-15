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
  materials: state => {
    const _iterator = (prev, current) => {
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
        prev.push(current);
        return prev;
      }

      return prev.map(item => {
        if (item.id === current.id) {
          item.quantity += current.quantity;
        }
        return item;
      });
    }, []);
  },
};
