import React, { useState, useEffect } from "react"

const Pinboard = () => {
  const [pins, setPins] = useState(0) // TODO set initial state for loading pins
  useEffect(() => {
    fetch("/.netlify/functions/pinboard")
      .then(response => response.json())
      .then(result => {
        setPins(result.data.records)
      })
  }, [])

  return (
    <>
      <h3>Pinboard</h3>
      <ul>
        {pins.length &&
          pins.map((item, i) => (
            <li key={item.id}>
              <p>{item.fields.Title}</p>
              <p>{item.fields.Description}</p>
            </li>
          ))}
      </ul>
    </>
  )
}

export default Pinboard
