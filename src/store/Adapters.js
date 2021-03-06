import { jobIconMappings } from '../constants';

export const adaptJobs = (data) => {
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

export const adaptCraftList = (data) => {
  return {
    id:   data.id,
    name: data.name,
    job: {
      name:  data.class_name,
      level: data.level_view,
    },
  };
};

export const adaptItemData = (data) => {
  const masterbook = _adaptMasterBook(data.masterbook);
  return {
    id:         data.id,
    name:       data.name_ja,
    icon:       data.icon,
    level:      data.level,
    masterbook: masterbook,
    job: {
      id:    data.classjob.id,
      level: data.level_view,
    },
  };
};

export const adaptRecipe = (data) => {
  const synths = _adaptSynths(data.synths);
  return {
    id:        data.id,
    name:      data.name,
    icon:      data.icon,
    quantity:  data.quantity,
    recipe:    synths.recipes,
    hasRecipe: synths.recipes.length > 0,
    isShard:   data.id < 20,
  };
};

// adapt 秘伝書
const _adaptMasterBook = (data) => {
  if (!data) {
    return {
      required: false,
    };
  }

  return {
    required: true,
    name:     data.name,
  };
};

// synthsにアイテム情報
// treeにレシピ情報っぽい
const _adaptSynths = (synths) => {
  const defaults = {
    jobIds: [],
    recipes: [],
  };

  if (!synths) {
    return defaults;
  }

  const keys = Object.keys(synths);
  if (keys.length === 0) {
    return defaults;
  }

  return {
    jobIds: keys,
    recipes: synths[keys[0]].tree.map(item => adaptRecipe(item)) || [],
  };

};
