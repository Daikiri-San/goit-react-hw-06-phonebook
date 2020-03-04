import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThemeContext from '../contexts/ThemeContext';
import ContactsActions from '../redux/contacts/contactsActions';
import Filter from './Filter';
import Layout from './Layout';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Header from './Header';
import TextNotification from './TextNotification';
import '../base.css';

class App extends Component {
  state = {
    apearPage: false,
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const { addLocalContacts } = this.props;
    this.setState({
      apearPage: true,
    });
    if (savedContacts) {
      return addLocalContacts(JSON.parse(savedContacts));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.contacts !== this.props.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.props.contacts));
    }
  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.props;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { apearPage } = this.state;
    const { contacts } = this.props;
    const visibleContacts = this.getVisibleContacts();

    return (
      <ThemeContext>
        <Layout>
          <Header text={'Phonebook'} apearPage={apearPage} />
          <ContactForm />

          {contacts.length >= 2 && <Filter />}
          <ContactList contacts={visibleContacts} />
          {contacts.length === 0 && (
            <TextNotification message={'There are no contacts. Add some :)'} />
          )}
          {contacts.length > 1 && visibleContacts.length === 0 && (
            <TextNotification message={'No contacts found :('} />
          )}
        </Layout>
      </ThemeContext>
    );
  }
}

const mapStateToPtops = state => {
  return {
    contacts: state.contacts,
    filter: state.filter,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     addLocalContacts: array =>
//       dispatch(ContactsActions.addLocalContacts(array)),
//   };
// };

const mapDispatchToProps = {
  addLocalContacts: ContactsActions.addLocalContacts,
};

export default connect(mapStateToPtops, mapDispatchToProps)(App);
