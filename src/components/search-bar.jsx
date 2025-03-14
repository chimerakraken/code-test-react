'use client'

import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search missions or rockets..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  )
}
