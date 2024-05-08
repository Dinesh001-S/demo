import { useState } from 'react';
import axios from "axios";

function App() {
  const [bio, setBio] = useState([]);
  const [clicked, setClicked] = useState(false);

  const fetchData = () => {
    axios.get("https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json")
      .then(response => {
        setBio(response.data);
        setClicked(true); // Set clicked to true after fetching data
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const response = () => {
    return bio.map(index => (
      <li key={index.id}>
        <div>
          <p>Name: {index.name}</p>
          <p>Language: {index.language}</p>
        </div>
      </li>
    ));
  }

  return (
    <div className="App">
      <button onClick={fetchData}>Click</button>
      {clicked && (
        <ul>
          {response()}
        </ul>
      )}
    </div>
  );
}

export default App;
