import { useState, useEffect } from 'react';
import shortid from 'shortid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Contact from './Contact';
import Filter from './Filter';

function App() {
  
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const parsedContacts = JSON.parse(window.localStorage.getItem('contacts'));

  useEffect(() => {
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    {
      contacts.some(contact => contact.name === name)
        ? Notify.info(`${name} is already in contacts`, {
            timeout: 11000,
          })
        : setContacts(state => [contact, ...state]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId),
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className="container">
      <h1 className="first-title">Phonebook</h1>
      <ContactForm onSubmited={addContacts} />
      <h2 className="second-title">Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList>
        <Contact contacts={visibleContacts} onDelete={deleteContact} />
      </ContactList>
    </div>
  );
}

export default App;
