import React, { useState, useEffect } from "react"

// TODO style
const Pinboard = () => {
  const [pinboardState, setPinboardState] = useState({
    pins: [],
    loading: true,
  })

  useEffect(() => {
    fetch("/.netlify/functions/pinboard")
      .then(response => response.json())
      .then(result => {
        setPinboardState({ pins: result.data.records, loading: false })
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <>
      <h3>Pinboard</h3>
      {pinboardState.loading && <h3>Loading...</h3>}
      <ul>
        {pinboardState.pins.length &&
          pinboardState.pins.map((item, i) => (
            <li key={item.id}>
              <p>Post ID: {item.fields["Post ID"]}</p>
              <p>Title: {item.fields["Title"]}</p>
              <p>Short Description: {item.fields["Short Description"]}</p>
              <p>Long Description: {item.fields["Long Description"]}</p>
              <p>Submission Form: {item.fields["Submission Form"]}</p>
              <p>
                {/* TODO update to pathname to use internal links */}
                <a href={item.fields["Submission Form"]}>Apply here</a>
              </p>
              <p>Posted By: {item.fields["Posted By"]}</p>
              <p>Source URL: {item.fields["Source URL"]}</p>
            </li>
          ))}
      </ul>
    </>
  )
}

export default Pinboard
