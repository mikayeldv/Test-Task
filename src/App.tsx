import React, {useEffect, useState} from 'react';
import './App.css';
import AutoComplete from './AutoComplete/AutoComplete';
import type Option from './types/types';

function App() {
  const [options, setOptions] = useState<Option[]>([])
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => setOptions(json));
  },[])

  return (
    <div className="App">
     {
      options.length && <AutoComplete options={options}/>
     } 
    </div>
  );
}

export default App;
