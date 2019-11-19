import React from "react"
import PropTypes from "prop-types"
import Loader from "../components/loader"
import horzLogo from "../images/horz-logo.svg"
import vertLogo from "../images/vert-logo.svg"

const formData = {
  project: {
    embedURL: "https://airtable.com/embed/shrYI1Wb0KlDurdfj",
    desktopHeight: 2320,
    mobileHeight: 2690,
  },
  explore: {
    embedURL: "https://airtable.com/embed/shrbQqhJ28dlPmAjd",
    desktopHeight: 2240,
    mobileHeight: 2520,
  },
}

class Airtable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  handleFormLoad = () => {
    this.setState({ isLoading: false })
  }

  render() {
    const formHeight =
      window.innerWidth > 480
        ? formData[this.props.form].desktopHeight
        : formData[this.props.form].mobileHeight
    return (
      <div style={{ paddingTop: `100px` }}>
        <div className="image">
          <img
            className="horz-logo"
            src={horzLogo}
            alt="Ecosystem Support Program Horizontal Logo"
          />
          <img
            className="vert-logo"
            src={vertLogo}
            alt="Ecosystem Support Program Vertical Logo"
          />
        </div>

        <Loader
          style={{ marginTop: `80px` }}
          isLoading={this.state.isLoading}
        />

        <div>
          <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
          <iframe
            className="airtable-embed airtable-dynamic-height"
            src={formData[this.props.form].embedURL}
            frameBorder="0"
            title={this.props.form}
            height={formHeight}
            onLoad={this.handleFormLoad}
            style={{
              background: `transparent`,
              margin: `8px`,
              width: `95%`,
            }}
          ></iframe>
        </div>
      </div>
    )
  }
}

Airtable.propTypes = {
  form: PropTypes.string.isRequired,
}

export default Airtable
