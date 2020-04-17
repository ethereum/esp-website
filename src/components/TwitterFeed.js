import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { screenSizeM } from "../utils/styles"

const FeedContainer = styled.div`
  display: flex;
  justify-content: center;
`
const Feed = styled.div`
  width: 600px;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${screenSizeM}) {
    width: 100%;
  }
`

const TwitterFeed = () => {
  const [height, setHeight] = useState("600")

  useEffect(() => {
    const clientWidth = document.documentElement.clientWidth
    if (clientWidth < 480) {
      setHeight("1000")
    }

    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    document.getElementsByClassName("twitter-embed")[0].appendChild(script)
  }, [])

  return (
    <FeedContainer>
      <Feed>
        <div className="twitter-embed">
          <a
            className="twitter-timeline"
            data-height={height}
            data-chrome="nofooter noborders"
            href="https://twitter.com/EF_ESP"
          >
            Tweets by EF_ESP
          </a>
        </div>
      </Feed>
    </FeedContainer>
  )
}

export default TwitterFeed
