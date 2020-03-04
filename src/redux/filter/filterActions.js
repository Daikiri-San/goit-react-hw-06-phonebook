import types from './filterTypes';

const changeFilter = str => {
  return {
    type: types.changeFilter,
    payload: {
      filter: str,
    },
  };
};

export default { changeFilter };
