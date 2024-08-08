import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

const App = () => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      const response = await axios.post(
        'http://localhost:5000/search',
        { email, number },
        { signal: abortControllerRef.current.signal }
      );
      setSearchResults(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Запрос отменен:', err.message);
      } else {
        setError('Ошибка при поиске. Пожалуйста, попробуйте еще раз.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (number) => {
    return number.replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3');
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
                <p>Number: {formatNumber(result.number)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
