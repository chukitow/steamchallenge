import React from 'react'
import ReactDOM from 'react-dom'
import Search from './search';

document.addEventListener('DOMContentLoaded', () => {
  const searchContainer = document.getElementById('search-container');
  if(searchContainer) {
    ReactDOM.render(<Search />, searchContainer);
  }
});
