import css from './ContactList.module.css';

const ContactList = ({
    filteredProfiles,
    handleDeleteContact
    }) => {
    return (
        <ul className={css.listContscts}>
          {filteredProfiles.length > 0 && filteredProfiles.map(contact => 
            <li key={contact.id}>
                <p>
                    <span className={css.contactName}>{contact.name}</span>
                    <span className={css.contactNumber}>{contact.number}</span>
                    <button className={css.contactDelete} onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                </p>
            </li>)}
        </ul>
  );
};

export {ContactList};

