import React, { useState } from 'react';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import Gallery from './components/Gallery'
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('')
  const [searching, setSearching] = useState(false)
  const search = () => {
    const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q="
    if (value.length) {
      setSearching(true)
      fetch(`${BASE_URL}${value}`, {
        method: 'GET', headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => {
          let { items } = json;
          if (items) {
            setItems(items)
            setError('')
          } else {
            setError('Book Not Found, Try another book')
          }
          setSearching(false)
        })
        .catch(err => {
          setError('An error occured. Tip: Check internet connection')
          setSearching(false)
        })
    }

  }
  return (
    <div className="global">
      <h2>{searching ? 'Searching Book ...' : 'Search book'}</h2>
      <FormGroup>
        <InputGroup>
          <FormControl onChange={e => setValue(e.target.value)} onKeyPress={e => {
            if (e.key === 'Enter') {
              search()
            }
          }} type='text' placeholder='Search for a book' className="formcontrol" />
          <button className='btn btn-primary glyph-icon' disabled={searching ? 'disabled' : ''}>
            <i onClick={(e) => {
              e.preventDefault()
              search()
            }} className="glyphicon glyphicon-search "></i>
          </button>

        </InputGroup>
      </FormGroup>
      <Gallery items={items} error={error} />
    </div>
  );
}

export default App;
