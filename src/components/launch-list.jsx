'use client';

import React from 'react';
import { useEffect, useRef } from 'react';
import LaunchItem from './launch-item';
import Loading from './loading';

export default function LaunchList({ launches, loadMore, hasMore, isLoading }) {
  const observer = useRef(null);
  const lastLaunchElementRef = useRef(null);

  useEffect(() => {
    // Disconnect previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create new observer
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    // Observe last element
    if (lastLaunchElementRef.current) {
      observer.current.observe(lastLaunchElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [launches, hasMore, isLoading, loadMore]);

  return (
    <div className="launch-list">
      {launches.map((launch, index) => (
        <div
          key={launch.flight_number}
          ref={index === launches.length - 1 ? lastLaunchElementRef : null}
        >
          <LaunchItem launch={launch} />
        </div>
      ))}

      {isLoading && hasMore && (
        <div className="loading-more">
          <Loading />
        </div>
      )}
    </div>
  );
}
