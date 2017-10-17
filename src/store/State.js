export const state = {
  levels: [],
  jobs:   [],
  craftList: {
    items: [],
    page:  null,
  },
  searching: false,
  search: {
    job:       '',
    levelHigh: '',
    levelLow:  '',
    keyword:   '',
    limit:     20,
    page:      1,
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
  buyMarket: [],
  amount: 1,
};
