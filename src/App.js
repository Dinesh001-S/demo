import { useState } from 'react';
import axios from "axios";

function App() {
  const [bio, setBio] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [searchedName, setSearchedName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [notAvailable, setNotAvailable] = useState(false);

  const fetchData = () => {
    setLoading(true); // Set loading to true while fetching data

    const params = {
      version: '1.0'
    };

    axios.get(`https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json?name=${searchedName}`, { params })
      .then(response => {
        setBio(response.data);
        const filtered = bio.filter(item => item.name === searchedName);
        setFilteredData(filtered);
        setClicked(true); // Set clicked to true after fetching data
        setLoading(false); // Set loading to false after fetching data

        if (filtered.length === 0) {
          setNotAvailable(true); // Set notAvailable to true if name is not found
        } else {
          setNotAvailable(false); // Set notAvailable to false if name is found
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
      });
  }

  const response = () => {
    if (notAvailable) {
      return <p>Name is not available</p>;
    }

    return filteredData.map(index => (
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
      <input type="text" value={searchedName} onChange={(e) => setSearchedName(e.target.value)} />
      <button onClick={fetchData}>Search</button>
      {loading && <p>Loading...</p>} {/* Show loading indicator if data is being fetched */}
      {clicked && (
        <ul>
          {response()}
        </ul>
      )}
    </div>
  );
}

export default App;