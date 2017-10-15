import { state } from './State';

export const getters = {
  getJobNameById: (state, getter) => (id) => {
    return state.jobs.find(job => job.id === id).name;
  },
};
