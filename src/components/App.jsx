import { Component } from 'react';
import { nanoid } from 'nanoid'
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx'
import { ContactList } from './ContactList/ContactList.jsx'

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  // componentDidMount() {
  //   const saveLocalContacts = localStorage.getItem('contacts');
  //   const saveContacts = JSON.parse(saveLocalContacts) ?? [];
  //   const cont = saveContacts.length > 0 ? saveContacts : this.state.contacts;
  //   this.setState({ contacts: cont });
  // }

   componentDidMount() {
    const saveLocalContacts = localStorage.getItem('contacts');
    const saveContacts = JSON.parse(saveLocalContacts);
    if (saveContacts) {
      this.setState({ contacts: saveContacts });
    }
   } 

  componentDidUpdate(prevProps, prevState) {
    if(prevState.contacts !== this.state.contacts) {
      const saveLocalContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', saveLocalContacts);
    }
  }

  handleChangeFilter = event => {
    const newFilter = event.target.value;
    this.setState({ filter: newFilter });
  }

  handleDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.elements.number.value;
    const id = nanoid();
    const newContact = {
      name,
      number,
      id
    }
    this.handleAddProfile(newContact);
    event.currentTarget.reset();
  };

  handleAddProfile = newContact => {
    const checkDuplication = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (checkDuplication) {
      alert(`${newContact.name} is alredy in contscts`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  render() { 
    const filteredProfiles = this.state.contacts.filter(contact =>
          contact.name.toLowerCase().includes(this.state.filter.trim().toLowerCase())
    );

    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm
          handleFormSubmit={this.handleFormSubmit}
        />
        <h2>Contacts</h2>
        <Filter
          handleChangeFilter={this.handleChangeFilter}
          value={this.state.filter}
        />
        <ContactList
          filteredProfiles={filteredProfiles}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
