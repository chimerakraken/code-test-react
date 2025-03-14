import React from 'react'

export default function LaunchItem({ launch }) {
  const launchDate = new Date(launch.launch_date_utc).toLocaleDateString()
  const timeAgo = getTimeAgo(new Date(launch.launch_date_utc))

  // Function to calculate time ago
  function getTimeAgo(date) {
    const now = new Date()
    const diffInMs = now - date
    const diffInSecs = Math.floor(diffInMs / 1000)
    const diffInMins = Math.floor(diffInSecs / 60)
    const diffInHours = Math.floor(diffInMins / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    const diffInMonths = Math.floor(diffInDays / 30)
    const diffInYears = Math.floor(diffInDays / 365)

    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
    } else if (diffInMins > 0) {
      return `${diffInMins} ${diffInMins === 1 ? "minute" : "minutes"} ago`
    } else {
      return `${diffInSecs} ${diffInSecs === 1 ? "second" : "seconds"} ago`
    }
  }

  return (
      <div className="launch-item">
        <div className="launch-logo">
          {launch.links.mission_patch_small ? (
              <img
                  src={launch.links.mission_patch_small || "/placeholder.svg"}
                  alt={`${launch.mission_name} patch`}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=100&width=100"
                    e.currentTarget.alt = "Mission patch unavailable"
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
              <strong>Date:</strong> {launchDate} <span className="time-ago">({timeAgo})</span>
            </p>
            <p>
              <strong>Rocket:</strong> {launch.rocket.rocket_name} ({launch.rocket.rocket_type})
            </p>
            <p>
              <strong>Status:</strong>
              <span className={`status ${launch.launch_success ? "success" : "failed"}`}>
              {launch.launch_success ? "Successful" : "Failed"}
            </span>
            </p>
          </div>
          <p className="launch-description">
            {launch.details ? launch.details : "No details available for this mission."}
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

