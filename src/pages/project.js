import React, { useState } from "react"
import { navigate } from "gatsby"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"

import SEO from "../components/seo"
import { REFERRAL_SOURCES, COUNTRIES } from "../utils/form-inputs"
import {
  PageBody,
  Form,
  Label,
  Input,
  Checkbox,
  CheckboxInput,
  TextArea,
  Button,
  FormHeader,
  Required,
} from "../components/SharedStyledComponents"

const countryOptions = COUNTRIES.map(country => {
  return { value: country, label: country, name: "country" }
})

const referralSourceOptions = REFERRAL_SOURCES.map(source => {
  return { value: source, label: source, name: "referralSource" }
})

const ProjectPage = () => {
  const [formState, setFormState] = useState({
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
    newsletter: "",
  })

  const { addToast } = useToasts()

  const handleCheckBoxChange = event => {
    const target = event.target
    const name = target.name
    setFormState({ ...formState, [name]: target.checked })
  }

  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    setFormState({ ...formState, [name]: value })
  }

  const handleSelectChange = selectedOption => {
    setFormState({ ...formState, [selectedOption.name]: selectedOption.value })
  }

  const submitInquiry = () => {
    fetch("/.netlify/functions/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then(response => response.json())
      .then(() => {
        addToast("Success!", {
          appearance: "success",
          autoDismiss: true,
        })
        navigate("/thanks/")
      })
      .catch(error => {
        console.error(error)
        addToast("Error submitting, please try again.", {
          appearance: "error",
          autoDismiss: true,
        })
      })
  }

  const handleSubmit = event => {
    event.preventDefault()
    submitInquiry()
  }

  const isFormValid = () => {
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
      if (!formState[field]) {
        isValid = false
      }
    })
    return isValid
  }

  const isValid = isFormValid()

  return (
    <>
      <SEO title="Project Inquiry" />
      <PageBody>
        <FormHeader>
          <h1>Specific Project</h1>
          <p>
            Tell us a bit about your project goals, motivations, needs,
            challenges, and any other information you feel is pertinent for us
            to know. You'll hear back from someone on the Ecosystem Support team
            very soon! We only collect the following information submitted below
            and will not use or share for any purposes other than evaluation.
          </p>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <Label>
            <span>Project name</span>
            <Input
              type="text"
              name="projectName"
              value={formState.projectName}
              onChange={handleInputChange}
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
              value={formState.projectDescription}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <span>
              Team profile <Required>*</Required>
            </span>
            <div>
              <small>
                Who are the members of your team? Please write or link to bios.
              </small>
            </div>
            <TextArea
              name="teamProfile"
              value={formState.teamProfile}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <span>
              Impact <Required>*</Required>
            </span>
            <div>
              <small>
                What key problem or need do you hope to address? How will your
                work impact the larger Ethereum ecosystem? Who will benefit from
                your work?
              </small>
            </div>
            <TextArea
              name="impact"
              value={formState.impact}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <span>
              Needs and Challenges <Required>*</Required>
            </span>
            <div>
              <small>
                What are the most significant obstacles facing your project or
                your team right now? What are some of your most pressing needs?
              </small>
            </div>
            <TextArea
              name="challenges"
              value={formState.challenges}
              onChange={handleInputChange}
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
              value={formState.previousWork}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <span>
              Contact person <Required>*</Required>
            </span>
            <Input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <span>
              Contact email <Required>*</Required>
            </span>
            <Input
              type="email"
              name="contactEmail"
              value={formState.contactEmail}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            Where is your contact person based (country)?
            <Select options={countryOptions} onChange={handleSelectChange} />
          </Label>

          <Label>
            Where is your contact person based (city)?
            <Input
              type="text"
              name="city"
              value={formState.city}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            How did you hear about Ecosystem Support?
            <Select
              options={referralSourceOptions}
              onChange={handleSelectChange}
            />
          </Label>

          <Label>
            Did anyone recommend that you contact Ecosystem Support? If so, who?
            <Input
              type="text"
              name="referralName"
              value={formState.referralName}
              onChange={handleInputChange}
            />
          </Label>

          <Checkbox>
            <CheckboxInput
              type="checkbox"
              name="newsletter"
              value={formState.newsletter}
              onChange={handleCheckBoxChange}
            />
            Subscribe to the ESP Newsletter? You'll hear from us every few
            weeks, and we'll only ever contact you with ESP news.
          </Checkbox>

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

export default ProjectPage
