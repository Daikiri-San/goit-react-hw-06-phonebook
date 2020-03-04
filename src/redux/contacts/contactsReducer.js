import types from './contactsTypes';

const contactsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.addLocalContacts:
      return [...state, ...payload.contacts];

    case types.addContact:
      return [...state, payload.contact];

    case types.removeContact:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
};

export default contactsReducer;

// const newState = [...state];
// return newState.filter(({id}) => id !== action.payload.id);
