import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { colorGrayLighter, screenSizeM, screenSizeIntS } from "../utils/styles"

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

const Embed = styled.div`
  padding: 1rem;
  border: 1px solid ${colorGrayLighter};
  border-radius: 4px;
  overflow-y: scroll;
`

const TwitterFeed = () => {
  const [dimensions, setDimensions] = useState({ width: "600", height: "450" })

  useEffect(() => {
    const clientWidth = document.documentElement.clientWidth
    if (clientWidth < screenSizeIntS) {
      setDimensions({ width: "300", height: "450" })
    }

    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    document.getElementsByClassName("twitter-embed")[0].appendChild(script)
  }, [])

  return (
    <FeedContainer>
      <Feed>
        <Embed className="twitter-embed">
          <a
            className="twitter-timeline"
            data-height={dimensions.height}
            data-width={dimensions.width}
            data-chrome="nofooter noborders"
            href="https://twitter.com/EF_ESP"
          >
            Tweets by EF_ESP
          </a>
        </Embed>
      </Feed>
    </FeedContainer>
  )
}

export default TwitterFeed
