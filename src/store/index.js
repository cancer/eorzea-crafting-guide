import { state } from './State';
import { getters } from './Getters';
import { mutations } from './Mutations';
import { actions } from './Actions';

const store = {
  state,
  getters,
  mutations,
  actions,
};

export default store;
