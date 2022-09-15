import { useEffect, useRef, useState } from 'react';
import './App.css';
import guitar from './Guitar.json';

const data = guitar;


function App() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([false]);
  const searchRef = useRef();

  const isTyping = search.replace(/\s+/, '').length > 0;

  useEffect(() => {
    document.addEventListener('mousedown', handelClickOutside)
    return () => {
      document.removeEventListener('mousedown', handelClickOutside)
    }
  }, [])

  const handelClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearch('')
    }
  }

  useEffect(() => {

    if (isTyping) {
      const filteredResult = data.filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      setResult(filteredResult.length > 0 ? filteredResult : false)
    } else {
      setResult([false])
    }
  }, [search])

  return (
    <>
      <div className='search' ref={searchRef}>
        <input type='text' value={search} className={isTyping ? 'typing' : null} placeholder='Gitar ara...' onChange={(e) => setSearch(e.target.value)} />
        {isTyping && (
          <div className='search-result'>
            {result && result.map(item => (
              <div key={item.id} className='search-result-item'>
                <div className='imageContainer'>
                  <img src={item.image} alt='' />
                </div>
                <div>
                  <div className='title'>{item.title}</div>
                  <div className='price'>{item.price}</div>
                </div>
              </div>
            ))
            }
            {!result && (
              <div className='result-not-found'>
                "{search}" ile ilgili bir şey bulamadık !
              </div>
            )

            }
          </div>
        )}
      </div>
    </>
  );
}

export default App;
