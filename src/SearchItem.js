import React from 'react'

const SearchItem = ({setSearch, search}) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault() }>
        <input 
            type="text"
            id="search"
            role='searchbox'
            placeholder='Search Items' 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
    </form>
  )
}

export default SearchItem