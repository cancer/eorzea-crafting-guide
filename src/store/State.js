export const state = {
  levels: [],
  jobs:   [],
  craftList: {
    items: [],
    page:  null,
  },
  searching: false,
  search: {
    job:     '',
    level:   '',
    keyword: '',
  },
  itemData: {
    id:    '',
    name:  '',
    icon:  '',
    level: '',
    masterbook: {
      required: false,
    },
    job: {
      id:    '',
      level: '',
    },
  },
  recipe:    [],
  materials: [],
};
