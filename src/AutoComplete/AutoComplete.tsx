import React, { useState } from 'react';
import type Option from '../types/types';
import './AutoComplete.css';

interface Props {
  options: Option[];
}

const AutoComplete: React.FC<Props> = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

      // Call asynchronous filter function
    const filtered = await filterOptionsAsync(value, options);

    setFilteredOptions(filtered);
  };

  const filterOptionsAsync = async (value: string, options: Option[]) => {
    return new Promise<Option[]>(resolve => {
      setTimeout(() => {
        const filtered = options.filter(option =>
          option.title.toLowerCase().includes(value.toLowerCase())
        );
        resolve(filtered);
      }, 100);
    });
  };

  const handleOptionClick = (option: Option) => {
    setInputValue(option.title);
    setFilteredOptions([]);
  };

  const returnMatch = (title:string, input:string) => {
      const start = title.substring(0,title.indexOf(input))
      const end = title.substring(title.indexOf(input) + input.length,title.length)
      return (
        <div>
          {start}
          <span className="match">
            {input}
          </span>
          {end}
        </div>
      )
  }  

  return (
    <div className="autocomplete">
      <div className='header'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className='searchInput'
      />
      </div>
        <div className="options">
          {filteredOptions.length ? filteredOptions.map(option => (
            <div key={option.id} className="option" onClick={() => handleOptionClick(option)}>
              {returnMatch(option.title, inputValue)}
            </div>
          ))
          :
          <>No Options Found</>
          }
        </div>
    </div>
  );
};

export default AutoComplete;