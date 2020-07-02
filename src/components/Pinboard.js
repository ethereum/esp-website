import React, { useState, useEffect } from "react"
import styled from "styled-components"
import PinboardCard from "./PinboardCard"

const PinContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Pinboard = () => {
  const [pinboardState, setPinboardState] = useState({
    pins: [],
    loading: true,
  })

  useEffect(() => {
    fetch("/.netlify/functions/pinboard")
      .then(response => response.json())
      .then(result => {
        setPinboardState({
          pins: result.data.records,
          loading: false,
        })
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <PinContainer>
      {pinboardState.loading && <h3>Loading...</h3>}
      {!pinboardState.loading &&
        pinboardState.pins.length &&
        pinboardState.pins
          .filter(
            pin => pin.fields && pin.fields["Display on website"] === "Yes"
          )
          .map(pin => <PinboardCard pin={pin} key={pin.id} />)}
    </PinContainer>
  )
}

export default Pinboard
