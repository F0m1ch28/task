import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

const App = () => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/search', { email, number });
      setSearchResults(response.data);
    } catch (err) {
      setError('Ошибка при поиске. Пожалуйста, попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number:</label>
          <InputMask
            mask="99-99-99"
            maskChar={null}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Поиск'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {searchResults.length > 0 && (
        <div>
          <h2>Результаты поиска:</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <p>Email: {result.email}</p>
                <p>Number: {result.number}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
