import React from 'react'
import moment from 'moment'

export default function LaunchItem({ launch }) {
  const launchDate = moment(launch.launch_date_utc).format('LL') // e.g., "March 13, 2025"
  const timeAgo = moment(launch.launch_date_utc).fromNow() // e.g., "2 days ago"

  return (
    <div className="launch-item">
      <div className="launch-logo">
        {launch.links.mission_patch_small ? (
          <img
            src={launch.links.mission_patch_small || '/placeholder.svg'}
            alt={`${launch.mission_name} patch`}
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg?height=100&width=100'
              e.currentTarget.alt = 'Mission patch unavailable'
            }}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="launch-details">
        <h2>{launch.mission_name}</h2>
        <div className="launch-info">
          <p>
            <strong>Rocket:</strong> {launch.rocket.rocket_name} ({launch.rocket.rocket_type})
          </p>
          <p>
            <strong>Status:</strong>
            <span className={`status ${launch.launch_success ? 'success' : 'failed'}`}>
              {launch.launch_success ? 'Successful' : 'Failed'}
            </span>
          </p>
          <p>
            <strong>Date:</strong> {launchDate} <span className="time-ago">({timeAgo})</span>
          </p>
        </div>
        <p className="launch-description">
          {launch.details ? launch.details : 'No details available for this mission.'}
        </p>
        <div className="launch-links">
          {launch.links.article_link && (
            <a
              href={launch.links.article_link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-button article-link"
            >
              Read Article
            </a>
          )}
          {launch.links.video_link && (
            <a
              href={launch.links.video_link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-button video-link"
            >
              Watch Video
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
