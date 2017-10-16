export const state = {
  levels: [
    '1 - 5',
    '6 - 10',
    '11 - 15',
    '16 - 20',
    '21 - 25',
    '26 - 30',
    '31 - 35',
    '36 - 40',
    '41 - 45',
    '46 - 50',
    '51 - 55',
    '56 - 60',
    '61 - 65',
    '66 - 70',
  ],
  jobs:      [],
  craftList: {
    items: [],
    page: null,
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
