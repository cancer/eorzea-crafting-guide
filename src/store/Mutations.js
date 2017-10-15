import { jobIconMappings } from '../constants';

const adaptJobs = (data) => {
  return Object.keys(jobIconMappings).map(jobid => {
    const origin = data.find(job => String(job.id) === jobid);
    return {
      id:    origin.id,
      name:  origin.name_ja,
      abbr:  origin.abbr_ja,
      icon:  jobIconMappings[jobid],
    };
  });
};

const adaptCraftList = (item) => {
  return {
    id:       item.id,
    name:     item.name_ja,
    level:    item.level_view,
    jobId:    item.classjob,
  };
};

export const mutations = {
  updateClassJobs(state, data) {
    state.jobs = adaptJobs(data);
  },
  updateList(state, data) {
    state.craftList = data.map(item => adaptCraftList(item));
  },
  updateDetail(state, data) {
    state.item = data.item;
    state.materials = data.tree.filter(item => {
      // シャードが20までに入ってるので除外
      return item.id > 19;
    });
  },
};
