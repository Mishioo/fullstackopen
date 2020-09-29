import React from 'react'

const Filter = ({ filter, setFilter }) => {

  const searchFilter = (event) => setFilter(event.target.value)
  
  return (
    <div>
      filter shown with: {' '}
      <input
        value={filter}
        onChange={searchFilter}
        placeholder="Enter name..."
      />
    </div>
  )

}

export default Filter