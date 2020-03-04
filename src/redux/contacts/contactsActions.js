import types from './contactsTypes';

const addLocalContacts = array => {
  return {
    type: types.addLocalContacts,
    payload: {
      contacts: array,
    },
  };
};

const addContact = obj => {
  return {
    type: types.addContact,
    payload: {
      contact: obj,
    },
  };
};

const removeContact = id => {
  return {
    type: types.removeContact,
    payload: {
      id,
    },
  };
};

export default { addLocalContacts, addContact, removeContact };
