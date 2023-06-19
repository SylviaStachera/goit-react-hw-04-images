import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { useState } from 'react';

const Searchbar = ({ onInputValue }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = evt => {
    const newSearchQuery = evt.currentTarget.value.toLowerCase();
    setSearchQuery(newSearchQuery);
    onInputValue(newSearchQuery);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    onInputValue(searchQuery);

    onInputValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css['searchForm-input']}
          type="text"
          name="searchQuery"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />

        <button type="submit" className={css['searchForm-button']}>
          <span>Search</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onInputValue: PropTypes.func,
};

export default Searchbar;
