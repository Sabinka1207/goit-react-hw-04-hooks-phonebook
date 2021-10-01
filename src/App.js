import { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./Components/ContactForm/ContactForm";
import shortid from "shortid";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import Notiflix from "notiflix";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const addContact = (name, number) => {
    const normalizedName = name.toLowerCase();
    const doubledNames = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedName)
    ).length;
    if (!doubledNames) {
      const contact = {
        id: shortid.generate(),
        name: name,
        number: number,
      };
      setContacts((contacts) => [contact, ...contacts]);
    } else {
      Notiflix.Report.warning(
        "Warning",
        `${name} is already in contacts`,
        "OK"
      );
    }
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    if (contacts) {
      const parcedContacts = JSON.parse(contacts);
      setContacts(parcedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;
