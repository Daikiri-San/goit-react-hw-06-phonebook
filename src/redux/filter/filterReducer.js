import types from './filterTypes';

const filterReducer = (state = '', { type, payload }) => {
  switch (type) {
    case types.changeFilter:
      return (state = payload.filter);

    default:
      return state;
  }
};

export default filterReducer;
