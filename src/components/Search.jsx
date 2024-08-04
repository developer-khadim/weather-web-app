import React from 'react'
const Search = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="mb-4">
    <div className="flex items-center border rounded-lg overflow-hidden shadow-md">
      <input 
        type="text"
        placeholder="Enter City Name"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="w-full px-4 py-2 focus:outline-none text-black font-semibold "
      />
      <button 
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>
    </div>
  </div>
  )
}

export default Search