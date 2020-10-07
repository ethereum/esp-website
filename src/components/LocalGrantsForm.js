import React, { useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"

import { REFERRAL_SOURCES, COUNTRIES } from "../utils/form-inputs"
import {
  Form,
  Label,
  Input,
  Checkbox,
  CheckboxInput,
  TextArea,
  Button,
  Required,
} from "./SharedStyledComponents"

const StyledForm = styled(Form)`
  margin-top: 2rem;
`

const PROJECT_STAGES = ["Idea phase", "Early phase", "Live service", "Other"]

const projectStageOptions = PROJECT_STAGES.map(stage => {
  return { value: stage, label: stage, name: "projectStage" }
})

const PROJECT_CATEGORIES = ["Technology", "Community", "Education", "Other"]

const projectCategoryOptions = PROJECT_CATEGORIES.map(category => {
  return { value: category, label: category, name: "projectCategory" }
})

const TEAM_CATEGORIES = ["Individual", "Team"]

const teamOptions = TEAM_CATEGORIES.map(team => {
  return { value: team, label: team, name: "individualOrTeam" }
})

const countryOptions = COUNTRIES.map(country => {
  return { value: country, label: country, name: "country" }
})

const referralSourceOptions = REFERRAL_SOURCES.map(source => {
  return { value: source, label: source, name: "referralSource" }
})

const requiredFields = [
  "wave",
  "projectName",
  "projectCategory",
  "projectStage",
  "projectDescription",
  "problemBeingSolved",
  "impact",
  "challenges",
  "individualOrTeam",
  "teamProfile",
  "name",
  "contactEmail",
  "referralSource",
]

const LocalGrantsForm = ({ wave }) => {
  const [formState, setFormState] = useState({
    isPending: false,
    // form fields
    wave,
    projectName: "",
    projectCategory: "",
    projectStage: "",
    projectDescription: "",
    problemBeingSolved: "",
    impact: "",
    challenges: "",
    individualOrTeam: "",
    teamProfile: "",
    name: "",
    contactEmail: "",
    contactAlternative: "",
    city: "",
    country: "",
    referralSource: "",
    referralSourceOther: "",
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
    setFormState({ ...formState, isPending: true })
    fetch("/.netlify/functions/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then(response => {
        setFormState({ ...formState, isPending: false })
        if (response.status !== 200) {
          addToast("Error submitting, please try again.", {
            appearance: "error",
            autoDismiss: true,
          })
        } else {
          addToast("Success!", {
            appearance: "success",
            autoDismiss: true,
          })
          navigate("/en/thanks/")
        }
      })
      .catch(error => {
        setFormState({ ...formState, isPending: false })
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
    for (const field of requiredFields) {
      if (!formState[field]) {
        return false
      }
    }
    return true
  }

  const isValid = isFormValid()
  const isButtonDisabled = !isValid || formState.isPending
  const buttonText = formState.isPending ? "Submitting..." : "Submit"

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Label>
        <span>
          Project Name <Required>*</Required>
        </span>
        <Input
          type="text"
          name="projectName"
          value={formState.projectName}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>
          Project Category <Required>*</Required>
        </span>
        <Select
          options={projectCategoryOptions}
          onChange={handleSelectChange}
        />
      </Label>
      <Label>
        <span>
          Stage of Project <Required>*</Required>
        </span>
        <Select options={projectStageOptions} onChange={handleSelectChange} />
      </Label>
      <Label>
        <span>
          Project Description <Required>*</Required>
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
          Problem Being Solved <Required>*</Required>
        </span>
        <div>
          <small>
            As concretely as possible, what problem is your project attempting
            to solve?
          </small>
        </div>
        <TextArea
          name="problemBeingSolved"
          value={formState.problemBeingSolved}
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        <span>
          Impact <Required>*</Required>
        </span>
        <div>
          <small>
            How will your project / solution address the problem? How will your
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
          Challenges <Required>*</Required>
        </span>
        <div>
          <small>
            What are the most significant obstacles facing your project or your
            team right now? What are some of your most pressing needs?
          </small>
        </div>
        <TextArea
          name="challenges"
          value={formState.challenges}
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        <span>
          Individual or Team <Required>*</Required>
        </span>
        <Select options={teamOptions} onChange={handleSelectChange} />
      </Label>
      <Label>
        <span>
          Individual or Team profile <Required>*</Required>
        </span>
        <div>
          <small>
            Please write or link to bio(s). If team, who are the members of your
            team? Please include Twitter, GitHub, LinkedIn, websites, etc.
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
          Contact Person <Required>*</Required>
        </span>
        <Input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          maxLength="150"
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
          maxLength="150"
        />
      </Label>
      <Label>
        <span>Alternative Contact (Telegram/Discord)</span>
        <Input
          type="text"
          name="contactAlternative"
          value={formState.contactAlternative}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>Where is your contact person based (country)?</span>
        <Select options={countryOptions} onChange={handleSelectChange} />
      </Label>
      <Label>
        <span>Where is your contact person based (city)?</span>
        <Input
          type="text"
          name="city"
          value={formState.city}
          onChange={handleInputChange}
          maxLength="40"
        />
      </Label>
      <Label>
        <span>
          How did you hear about the ESP Local Grants program?{" "}
          <Required>*</Required>
        </span>
        <Select options={referralSourceOptions} onChange={handleSelectChange} />
      </Label>
      {formState.referralSource === "Other" && (
        <Label>
          <span>
            How specifically did you hear about the ESP Local Grants program?
          </span>
          <Input
            type="text"
            name="referralSourceOther"
            value={formState.referralSourceOther}
            onChange={handleInputChange}
            maxLength="150"
          />
        </Label>
      )}
      <Label>
        <span>
          Did anyone recommend that you contact Ecosystem Support? If so, who?
        </span>
        <Input
          type="text"
          name="referralName"
          value={formState.referralName}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Checkbox>
        <CheckboxInput
          type="checkbox"
          name="newsletter"
          value={formState.newsletter}
          onChange={handleCheckBoxChange}
        />
        Subscribe to the ESP Newsletter? You'll hear from us every few weeks,
        and we'll only ever contact you with ESP news.
      </Checkbox>
      <div>
        <Button disabled={isButtonDisabled} type="submit">
          {buttonText}
        </Button>
      </div>
    </StyledForm>
  )
}

export default LocalGrantsForm
