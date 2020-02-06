import React from "react"
import { navigate } from "gatsby"
import SEO from "../components/seo"
import { REFERRAL_SOURCES, COUNTRIES } from "../utils/form-inputs"
import {
  PageBody,
  Form,
  Label,
  Input,
  TextArea,
  Select,
  Button,
  FormHeader,
  Required,
} from "../components/SharedStyledComponents"

class ExplorePage extends React.Component {
  state = {
    name: "",
    projectName: "",
    teamProfile: "",
    areaOfExpertise: "",
    whyEthereum: "",
    recentProjectsOrDevelopments: "",
    previousWork: "",
    questions: "",
    city: "",
    country: "",
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
        // navigate("/thanks/")
      })
      .catch(error => {
        console.error("Inquiry Error:", error)
      })
  }

  // TODO add email validation
  isFormValid = () => {
    let isValid = true
    const requiredFields = [
      "name",
      "contactEmail",
      "teamProfile",
      "areaOfExpertise",
      "whyEthereum",
      "recentProjectsOrDevelopments",
    ]
    requiredFields.forEach(field => {
      if (!this.state[field]) {
        isValid = false
      }
    })
    return isValid
  }

  render() {
    const isValid = this.isFormValid()

    return (
      <>
        <SEO title="Explore Inquiry" />
        <PageBody>
          <FormHeader>
            <h1>Exploring possibilities</h1>
            <p>
              Tell us a bit about yourself, your skills, what you're excited
              about, and what questions you have. We only collect the following
              information submitted below and will not use or share for any
              purposes other than evaluation.
            </p>
          </FormHeader>
          <Form onSubmit={this.handleSubmit}>
            <Label>
              <span>
                Your name <Required>*</Required>
              </span>
              <div>
                <small>
                  Use whichever preferred name you would like our team to
                  address you by.
                </small>
              </div>

              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              <span>
                Contact email <Required>*</Required>
              </span>
              <Input
                type="email"
                name="contactEmail"
                value={this.state.contactEmail}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              <span>Project name</span>
              <div>
                <small>
                  What's name of the project you’re currently working on? This
                  is optional.
                </small>
              </div>
              <Input
                type="text"
                name="projectName"
                value={this.state.projectName}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              <span>
                Profile <Required>*</Required>
              </span>
              <div>
                <small>
                  Tell us a little bit about yourself - whatever you think we
                  should know.
                </small>
              </div>
              <TextArea
                name="teamProfile"
                value={this.state.teamProfile}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              <span>
                Area of expertise <Required>*</Required>
              </span>
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
              <span>
                Why Ethereum? <Required>*</Required>
              </span>
              <TextArea
                name="whyEthereum"
                value={this.state.whyEthereum}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              <span>
                What's a project or development that you were excited about
                recently? <Required>*</Required>
              </span>
              <TextArea
                name="recentProjectsOrDevelopments"
                value={this.state.recentProjectsOrDevelopments}
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

            <Label>
              What country are you located in?
              <Select
                required
                defaultValue={"DEFAULT"}
                name="country"
                onChange={this.handleInputChange}
              >
                <option hidden disabled value="DEFAULT"></option>
                {COUNTRIES.map((source, i) => {
                  return (
                    <option key={i} value={source}>
                      {source}
                    </option>
                  )
                })}
              </Select>
            </Label>

            <Label>
              What city are you located in?
              <Input
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
              />
            </Label>

            <Label>
              How did you hear about Ecosystem Support?
              <Select
                required
                defaultValue={"DEFAULT"}
                name="referralSource"
                onChange={this.handleInputChange}
              >
                <option hidden disabled value="DEFAULT"></option>
                {REFERRAL_SOURCES.map((source, i) => {
                  return (
                    <option key={i} value={source}>
                      {source}
                    </option>
                  )
                })}
              </Select>
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
              <Button disabled={!isValid} type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </PageBody>
      </>
    )
  }
}

export default ExplorePage
