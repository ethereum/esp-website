import React from "react"
import styled from "styled-components"
import SEO from "../components/seo"
import { REFERRAL_SOURCES } from "../utils/form-inputs"
// import horzLogo from "../images/horz-logo.svg"
// import vertLogo from "../images/vert-logo.svg"

const Header = styled.header`
  max-width: 548px;
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  padding: 2rem 4rem;
  border-radius: 4px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const Input = styled.input`
  border: 2px solid #d1d1d1;
`
const TextArea = styled.textarea`
  border: 2px solid #d1d1d1;
`

class ExplorePageV2 extends React.Component {
  state = {
    nameOrProject: "",
    profile: "",
    areaOfExpertise: "",
    whyEthereum: "",
    recentProjectDevelopment: "",
    previousWork: "",
    questions: "",
    location: "",
    contactEmail: "",
    referralSource: "",
    referralName: "",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.submitInquiry()
  }

  submitInquiry = () => {
    fetch("/.netlify/functions/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(result => {
        console.log("Inquiry Success:", { result })
      })
      .catch(error => {
        console.error("Inquiry Error:", error)
      })
  }

  render() {
    return (
      <>
        <SEO title="Explore Inquiry" />
        <div className="page-content">
          {/* <div className="image">
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
          </div> */}
          <Header>
            <h1>Exploring possibilities</h1>
            <p>
              Tell us a bit about yourself, your skills, what you're excited
              about, and what questions you have. We only collect the following
              information submitted below and will not use or share for any
              purposes other than evaluation.
            </p>
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Label>
              Name or project
              <Input
                type="text"
                name="nameOrProject"
                value={this.state.nameOrProject}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Profile
              <div>
                <small>
                  Tell us a little bit about yourself - whatever you think we
                  should know.
                </small>
              </div>
              <TextArea
                name="profile"
                value={this.state.profile}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Area of expertise
              <div>
                <small>
                  What is unique about your skill set? What kinds of problems do
                  you enjoy solving?
                </small>
              </div>
              <TextArea
                name="areaOfExpertise"
                value={this.state.areaOfExpertise}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Why Ethereum?
              <TextArea
                name="whyEthereum"
                value={this.state.whyEthereum}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              What's a project or development that you were excited about
              recently?
              <TextArea
                name="recentProjectDevelopment"
                value={this.state.recentProjectDevelopment}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Previous work
              <div>
                <small>
                  Please provide links to published code, research, or other
                  documentation of what you're working on.
                </small>
              </div>
              <TextArea
                name="previousWork"
                value={this.state.previousWork}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              What questions can we answer for you?
              <TextArea
                name="questions"
                value={this.state.questions}
                onChange={this.handleInputChange}
              />
            </Label>

            {/* TODO update to search dropdown? break out into city/country? or leave as text Input? */}
            <Label>
              Where are you located?
              <Input
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Contact email
              <Input
                type="email"
                name="contactEmail"
                value={this.state.contactEmail}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              How did you hear about Ecosystem Support?
              <select
                required
                defaultValue={"DEFAULT"}
                name="referralSource"
                onChange={this.handleInputChange}
              >
                <option hidden disabled value="DEFAULT">
                  -- select an option --
                </option>
                {REFERRAL_SOURCES.map((source, i) => {
                  return (
                    <option key={i} value={source}>
                      {source}
                    </option>
                  )
                })}
              </select>
            </Label>
            <Label>
              Did anyone recommend that you contact Ecosystem Support? If so,
              who?
              <Input
                type="text"
                name="referralName"
                value={this.state.referralName}
                onChange={this.handleInputChange}
              />
            </Label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        </div>
      </>
    )
  }
}

export default ExplorePageV2
