import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import slideItemTransition from '../transitions/slideItem.module.css';
import TextNotification from '../TextNotification';

const List = styled.ul`
  margin-bottom: 3rem;
`;

function ContactList({ contacts, filter }) {
  const visibleContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      <TransitionGroup component={List}>
        {visibleContacts.map(({ id, name, number }) => (
          <CSSTransition
            key={id}
            timeout={250}
            classNames={slideItemTransition}
          >
            <ListItem id={id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      {contacts.length === 0 && (
        <TextNotification message={'You have no contacts. Add some :)'} />
      )}
      {contacts.length > 1 && visibleContacts.length === 0 && (
        <TextNotification message={'No contacts found :('} />
      )}
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.array,
  ]),
};

const mapStateToProps = ({ contacts }) => {
  return {
    contacts: contacts.items,
    filter: contacts.filter,
  };
};

export default connect(mapStateToProps)(ContactList);
