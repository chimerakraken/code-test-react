import React from 'react';
import './App.css';
import { useState, useEffect, useCallback } from 'react';
import Loading from '../src/components/loading';
import LaunchList from '../src/components/launch-list';
import SearchBar from '../src/components/search-bar';
import '../src/assets/scss/styles.css';

export function SpaceXLaunches() {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const ITEMS_PER_PAGE = 10;

  // Fetch launches data
  const fetchLaunches = useCallback(async (pageNum) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.spacexdata.com/v3/launches?limit=${ITEMS_PER_PAGE}&offset=${(pageNum - 1) * ITEMS_PER_PAGE}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setLaunches((prevLaunches) => [...prevLaunches, ...data]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching launches:', error);
      setIsLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchLaunches(page);
  }, [page, fetchLaunches]);

  // Filter launches based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLaunches(launches);
    } else {
      const filtered = launches.filter(
        (launch) =>
          launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          launch.rocket.rocket_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLaunches(filtered);
    }
  }, [searchTerm, launches]);

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Load more data when user scrolls to bottom
  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container">
      <h1>SpaceX Launches</h1>
      <SearchBar onSearch={handleSearch} />

      {launches.length === 0 && isLoading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <>
          <LaunchList
            launches={filteredLaunches}
            loadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoading}
          />

          {!hasMore && filteredLaunches.length > 0 && (
            <div className="end-message">No more launches to load</div>
          )}

          {filteredLaunches.length === 0 && !isLoading && (
            <div className="no-results">No launches found matching your search</div>
          )}
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <SpaceXLaunches />
    </div>
  );
}

export default App;
