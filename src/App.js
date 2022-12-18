import { useState } from "react";
import "./App.css";
import contactsJson from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsJson.slice(0, 5));

  const handleAddContact = () => {
    if (contacts.length === contactsJson.length) {
      return;
    }

    let randomContact =
      contactsJson[Math.floor(Math.random() * contactsJson.length)];

    while (contacts.includes(randomContact)) {
      randomContact =
        contactsJson[Math.floor(Math.random() * contactsJson.length)];
    }

    setContacts([...contacts, randomContact]);
  };

  const handleSortByName = () => {
    const sortArray = contacts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    setContacts([...sortArray]);
  };

  const handleSortByPopularity = () => {
    const sortArray = contacts.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    setContacts([...sortArray]);
  };

  const handleRemove = (id) => {
    const filterArr = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts([...filterArr]);
  };

  return (
    <div className="App">
      <button onClick={handleAddContact}>Add random contact</button>
      <button onClick={handleSortByName}>Sort by name</button>
      <button onClick={handleSortByPopularity}>Sort by popularity</button>

      <table>
        <thead>
          <tr>
            <td>
              <h2>Picture</h2>
            </td>
            <td>
              <h2>Name</h2>
            </td>
            <td>
              <h2>Popularity</h2>
            </td>
            <td>
              <h2>
                Won <br /> Oscar
              </h2>
            </td>
            <td>
              <h2>
                Won <br /> Emmy
              </h2>
            </td>
            <td>
              <h2>Actions</h2>
            </td>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt={contact.name} />
                </td>
                <td>{contact.name}</td>
                <td>
                  {Math.round((contact.popularity + Number.EPSILON) * 100) /
                    100}
                </td>
                <td>{contact.wonOscar && "🏆"}</td>
                <td>{contact.wonEmmy && "🏆"}</td>
                <td>
                  <button onClick={() => handleRemove(contact.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
