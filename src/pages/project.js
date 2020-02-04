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

class ProjectPage extends React.Component {
  state = {
    name: "",
    contactEmail: "",
    projectName: "",
    projectDescription: "",
    teamProfile: "",
    impact: "",
    challenges: "",
    previousWork: "",
    questions: "",
    city: "",
    country: "",
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
        navigate("/thanks/")
      })
      .catch(error => {
        console.error("Inquiry Error:", error)
      })
  }

  // TODO add email validation
  isFormValid = () => {
    let isValid = true
    const requiredFields = [
      "projectDescription",
      "teamProfile",
      "impact",
      "challenges",
      "name",
      "contactEmail",
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
        <SEO title="Project Inquiry" />
        <PageBody>
          <FormHeader>
            <h1>Specific Project</h1>
            <p>
              Tell us a bit about your project goals, motivations, needs,
              challenges, and any other information you feel is pertinent for us
              to know. You'll hear back from someone on the Ecosystem Support
              team very soon! We only collect the following information
              submitted below and will not use or share for any purposes other
              than evaluation.
            </p>
          </FormHeader>
          <Form onSubmit={this.handleSubmit}>
            <Label>
              <span>Project name</span>
              <Input
                type="text"
                name="projectName"
                value={this.state.projectName}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              <span>
                Project description <Required>*</Required>
              </span>
              <div>
                <small>
                  What are you working on? What does success look like for your
                  project? (2-3 short paragraphs)
                </small>
              </div>
              <TextArea
                name="projectDescription"
                value={this.state.projectDescription}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              <span>
                Team profile <Required>*</Required>
              </span>
              <div>
                <small>
                  Who are the members of your team? Please write or link to
                  bios.
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
                Impact <Required>*</Required>
              </span>
              <div>
                <small>
                  What key problem or need do you hope to address? How will your
                  work impact the larger Ethereum ecosystem? Who will benefit
                  from your work?
                </small>
              </div>
              <TextArea
                name="impact"
                value={this.state.impact}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              <span>
                Needs and Challenges <Required>*</Required>
              </span>
              <div>
                <small>
                  What are the most significant obstacles facing your project or
                  your team right now? What are some of your most pressing
                  needs?
                </small>
              </div>
              <TextArea
                name="challenges"
                value={this.state.challenges}
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
              <span>
                Contact person <Required>*</Required>
              </span>
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
              Where is your contact person based (country)?
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
              Where is your contact person based (city)?
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

export default ProjectPage
