import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Event from "./event"
import { screenSizeM } from "../utils/styles"

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 8px;

  @media (max-width: ${screenSizeM}) {
    flex-direction: column;
  }
`

const UpcomingEvents = () => {
  const [eventsState, setEventsState] = useState({
    events: [],
    loading: true,
  })

  useEffect(() => {
    fetch("/.netlify/functions/events")
      .then(response => response.json())
      .then(result => {
        setEventsState({ events: result.data.records, loading: false })
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <EventsContainer>
      {eventsState.loading && <h3>Loading upcoming events...</h3>}
      {eventsState.events.length &&
        eventsState.events.map((event, i) => {
          return (
            <Event
              key={i}
              title={event.fields["Name"]}
              dates={event.fields["Dates"]}
              url={event.fields["Event website"]}
            />
          )
        })}
    </EventsContainer>
  )
}

export default UpcomingEvents
