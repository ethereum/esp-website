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

const ExplorePageV2 = () => {
  const [formState, setFormState] = useState({
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
  })

  const { addToast } = useToasts()

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

  // TODO add email validation
  const isFormValid = () => {
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
      if (!formState[field]) {
        isValid = false
      }
    })
    return isValid
  }

  const isValid = isFormValid()

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
        <Form onSubmit={handleSubmit}>
          <Label>
            <span>
              Your name <Required>*</Required>
            </span>
            <div>
              <small>
                Use whichever preferred name you would like our team to address
                you by.
              </small>
            </div>

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
            <span>Project name</span>
            <div>
              <small>
                What's name of the project you’re currently working on? This is
                optional.
              </small>
            </div>
            <Input
              type="text"
              name="projectName"
              value={formState.projectName}
              onChange={handleInputChange}
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
              value={formState.teamProfile}
              onChange={handleInputChange}
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
              value={formState.areaOfExpertise}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <span>
              Why Ethereum? <Required>*</Required>
            </span>
            <TextArea
              name="whyEthereum"
              value={formState.whyEthereum}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <span>
              What's a project or development that you were excited about
              recently? <Required>*</Required>
            </span>
            <TextArea
              name="recentProjectsOrDevelopments"
              value={formState.recentProjectsOrDevelopments}
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
            What questions can we answer for you?
            <TextArea
              name="questions"
              value={formState.questions}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            What country are you located in?
            <Select options={countryOptions} onChange={handleSelectChange} />
          </Label>

          <Label>
            What city are you located in?
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

export default ExplorePageV2
