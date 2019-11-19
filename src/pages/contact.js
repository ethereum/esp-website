import React from "react"
import Layout from "../components/layout"
import Loader from "../components/loader"
import SEO from "../components/seo"
import horzLogo from "../images/horz-logo.svg"
import vertLogo from "../images/vert-logo.svg"

class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  handleFormLoad = () => {
    this.setState({ isLoading: false })
    // debugger
  }

  render() {
    const formHeight = window.innerWidth > 380 ? 1895 : 2385
    return (
      <Layout>
        <SEO title="Home" />
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
              src="https://airtable.com/embed/shrAeswLt0BxGvGu7?backgroundColor=blue"
              frameBorder="0"
              height={formHeight}
              onLoad={this.handleFormLoad}
              style={{
                background: `transparent`,
                margin: `8px`,
                width: `100%`,
              }}
            ></iframe>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ContactPage
