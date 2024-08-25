import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jsonInput = JSON.parse(inputData);

      const res = await axios.post('https://api-backend-rose-ten.vercel.app//bfhl', jsonInput);

      setResponse(res.data);
      setError('');
      toast.success('Submission Successful!');
    } catch (err) {
      toast.error('Invalid JSON Input');
    }
  };

  const handleOptionChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;
    document.title = response.roll_number;
    return (
      <div className='response'>
        <h3>Response:</h3>
        {selectedOptions.some(option => option.value === 'Alphabets') && (
          <p>Alphabets: {response.alphabets.join(', ')}</p>
        )}
        {selectedOptions.some(option => option.value === 'Numbers') && (
          <p>Numbers: {response.numbers.join(', ')}</p>
        )}
        {selectedOptions.some(option => option.value === 'Highest lowercase alphabet') && (
          <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
        )}
      </div>
    );
  };

  return (
    <div className='container'>
      <ToastContainer />
      <h1>{response?.roll_number || 'Your Roll Number'}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder='Enter JSON here'
          className='input-textarea'
        />
        <button type='submit' className='submit-button'>Submit</button>
      </form>
      {error && <p className='error-text'>{error}</p>}

      {response && (
        <div className='dropdown-container'>
          <Select
            options={options}
            isMulti
            value={selectedOptions}
            onChange={handleOptionChange}
            className='multi-select'
            classNamePrefix='select'
          />
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
