import React from "react"

const Loader = ({ isLoading }) => (
  <div
    style={{
      height: `26px`,
      color: `#e66981`,
      textAlign: `center`,
      marginTop: `20px`,
      marginBottom: isLoading ? `700px` : 0, // TODO fix
    }}
  >
    {isLoading ? `Loading...` : ``}
  </div>
)

export default Loader
