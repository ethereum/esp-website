import React, { useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"

import { COUNTRIES } from "../utils/form-inputs"
import { validateEmail } from "../utils/validate-email"
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
import { colorRed } from "../utils/styles"

const StyledForm = styled(Form)`
  margin-top: 2rem;
`

const ErrorMessage = styled.small`
  color: ${colorRed};
`

const StyledButton = styled(Button)`
  margin-bottom: 1rem;
`

const countryOptions = COUNTRIES.map(country => ({
  value: country,
  label: country,
  name: "country",
}))
// Inject option to opt-out at the top
countryOptions.unshift({
  value: "",
  label: "(optional)",
  name: "country",
})

const PROJECT_CATEGORIES = [
  "Adoption",
  "Community and Education",
  "Devex, Tooling and Testing",
  "Infrastructure",
  "Interoperability",
  "New Rollups",
  "Standards and Research",
  "Wallets",
  "Other",
]

const TEAM_CATEGORIES = ["Individual", "Team"]

const REFERRAL_SOURCES = [
  "Ethereum Blog",
  "Ethereum Community Events",
  "Other team/project in ecosystem",
  "Other",
]

const requiredFields = [
  "firstName",
  "lastName",
  "contactEmail",
  "company",
  "individualOrTeam",
  "teamProfile",
  "projectCategory",
  "projectName",
  "projectDescription",
  "problemBeingSolved",
  "impact",
  "challenges",
  "referralSource",
]

const RollupGrantsForm = () => {
  const [formState, setFormState] = useState({
    isPending: false,
    round: { value: "Rollup Community Grants | 2021" },
    category: { value: "Layer 2" },
    exploreOrProject: { value: "project" },
    // form fields
    firstName: { value: "", isTouched: false, isValid: false },
    lastName: { value: "", isTouched: false, isValid: false },
    contactEmail: { value: "", isTouched: false, isValid: false },
    company: { value: "", isTouched: false, isValid: false },
    city: { value: "", isTouched: false, isValid: true },
    country: { value: "", isTouched: false, isValid: true },
    individualOrTeam: { value: "", isTouched: false, isValid: false },
    teamProfile: { value: "", isTouched: false, isValid: false },
    projectCategory: { value: "", isTouched: false, isValid: false },
    projectName: { value: "", isTouched: false, isValid: false },
    projectDescription: { value: "", isTouched: false, isValid: false },
    problemBeingSolved: { value: "", isTouched: false, isValid: false },
    impact: { value: "", isTouched: false, isValid: false },
    challenges: { value: "", isTouched: false, isValid: false },
    proposedTimeline: { value: "", isTouched: false, isValid: true },
    requestedAmount: { value: "", isTouched: false, isValid: true },
    referralSource: { value: "", isTouched: false, isValid: false },
    referralSourceIfOther: { value: "", isTouched: false, isValid: true },
    twitter: { value: "", isTouched: false, isValid: true },
    github: { value: "", isTouched: false, isValid: true },
    linkedin: { value: "", isTouched: false, isValid: true },
    questions: { value: "", isTouched: false, isValid: true },
    contactAlternative: { value: "", isTouched: false, isValid: true },
    other: { value: "", isTouched: false, isValid: true },
    newsletter: { value: "", isTouched: false, isValid: true },
  })

  const { addToast } = useToasts()

  const projectCategoryOptions = PROJECT_CATEGORIES.map(category => ({
    value: category,
    label: category,
    name: "projectCategory",
  }))

  const teamOptions = TEAM_CATEGORIES.map(team => ({
    value: team,
    label: team,
    name: "individualOrTeam",
  }))

  const referralSourceOptions = REFERRAL_SOURCES.map(source => ({
    value: source,
    label: source,
    name: "referralSource",
  }))

  const isEmailValid = () => {
    try {
      validateEmail(formState.contactEmail.value)
      return true
    } catch (error) {
      return false
    }
  }

  const isUrlValid = () => {
    const { value } = formState.linkedin
    const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    return value === "" || value.match(re)
  }

  const handleCheckBoxChange = event => {
    const { name, checked } = event.target
    setFormState({
      ...formState,
      [name]: { ...formState[name], value: checked },
    })
  }

  const handleInputChange = event => {
    const { value, name } = event.target
    const snapshot = { ...formState }
    snapshot[name].value = value
    snapshot[name].isValid =
      name === "contactEmail"
        ? isEmailValid()
        : name === "linkedin"
        ? isUrlValid()
        : requiredFields.includes(name)
        ? value !== ""
        : true
    setFormState(snapshot)
  }

  const handleSelectChange = selectedOption => {
    const { name, value } = selectedOption
    const snapshot = { ...formState }
    snapshot[name].value = value
    snapshot[name].isValid = value !== "" || !requiredFields.includes(name)
    setFormState(snapshot)
  }

  const handleTouched = (event, field) => {
    const name = field || event.target.name
    const snapshot = { ...formState }
    snapshot[name].isTouched = true
    setFormState(snapshot)
  }

  const submitInquiry = async () => {
    setFormState({ ...formState, isPending: true })
    const stateFields = Object.keys(formState)
    const formStateFields = stateFields.filter(field => formState[field].value)
    const formData = {}
    for (const field of formStateFields) {
      formData[field] = formState[field].value
    }

    try {
      const response = await fetch("/.netlify/functions/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
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
    } catch (error) {
      setFormState({ ...formState, isPending: false })
      console.error(error)
      addToast("Error submitting, please try again.", {
        appearance: "error",
        autoDismiss: true,
      })
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Already be validated before this button is enabled
    isFormValid() && submitInquiry()
  }

  const isFormValid = () => {
    for (const field of requiredFields) {
      if (!formState[field]?.isValid) {
        return false
      }
    }
    if (!formState.linkedin.isValid) {
      return false
    }
    return true
  }

  const isButtonDisabled = !isFormValid() || formState.isPending
  const buttonText = formState.isPending ? "Submitting..." : "Submit"

  const RequiredError = () => <ErrorMessage>Field is required</ErrorMessage>

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Label>
        <span>
          Contact - First Name <Required>*</Required>
        </span>
        <Input
          type="text"
          name="firstName"
          value={formState.firstName?.value}
          onChange={handleInputChange}
          maxLength="150"
          onBlur={handleTouched}
          required
        />
        {formState.firstName.isTouched && !formState.firstName.isValid && (
          <RequiredError />
        )}
      </Label>
      <Label>
        <span>
          Contact - Last Name <Required>*</Required>
        </span>
        <Input
          type="text"
          name="lastName"
          value={formState.lastName.value}
          onChange={handleInputChange}
          maxLength="150"
          onBlur={handleTouched}
          required
        />
        {formState.lastName.isTouched && !formState.lastName.isValid && (
          <RequiredError />
        )}
      </Label>
      <Label>
        <span>
          Contact Email <Required>*</Required>
        </span>
        <Input
          type="email"
          name="contactEmail"
          value={formState.contactEmail.value}
          onChange={handleInputChange}
          maxLength="150"
          onBlur={handleTouched}
          required
        />
        {formState.contactEmail.isTouched &&
          !formState.contactEmail.isValid && (
            <ErrorMessage>Please provide a valid email address</ErrorMessage>
          )}
      </Label>
      <Label>
        <span>
          Company / Association <Required>*</Required>
        </span>
        <div>
          <small>
            The name of any company you're most associated with or work for. Use
            "Student" or "Self-Employed" if those are most suitable.
          </small>
        </div>
        <Input
          type="text"
          name="company"
          value={formState.company.value}
          onChange={handleInputChange}
          maxLength="150"
          onBlur={handleTouched}
          required
        />
        {formState.company.isTouched && !formState.company.isValid && (
          <RequiredError />
        )}
      </Label>
      <Label>
        <span>What city is your contact based? (optional)</span>
        <Input
          type="text"
          name="city"
          value={formState.city.value}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>What country is your contact based? (optional)</span>
        <Select options={countryOptions} onChange={handleSelectChange} />
      </Label>
      <Label>
        <span>
          Are you submitting as an individual or a team? <Required>*</Required>
        </span>
        <Select
          options={teamOptions}
          onChange={handleSelectChange}
          onBlur={e => handleTouched(e, "individualOrTeam")}
          required
        />
        {formState.individualOrTeam.isTouched &&
          !formState.individualOrTeam.isValid && <RequiredError />}
      </Label>
      <Label>
        <span>
          Individual/Team profile <Required>*</Required>
        </span>
        <div>
          <small>
            Please write or link to bio(s). If team, who are the members of your
            team? Please include Twitter, GitHub, LinkedIn, websites, etc.
          </small>
        </div>
        <TextArea
          name="teamProfile"
          value={formState.teamProfile.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          required
        />
        {formState.teamProfile.isTouched && !formState.teamProfile.isValid && (
          <RequiredError />
        )}
      </Label>
      <Label>
        <span>
          Project Category <Required>*</Required>
        </span>
        <Select
          options={projectCategoryOptions}
          onChange={handleSelectChange}
          onBlur={e => handleTouched(e, "projectCategory")}
          required
        />
        {formState.projectCategory.isTouched &&
          !formState.projectCategory.isValid && <RequiredError />}
      </Label>
      <Label>
        <span>
          Project Name <Required>*</Required>
        </span>
        <Input
          type="text"
          name="projectName"
          value={formState.projectName.value}
          onChange={handleInputChange}
          maxLength="150"
          onBlur={handleTouched}
          required
        />
        {formState.projectName.isTouched && !formState.projectName.isValid && (
          <RequiredError />
        )}
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
          value={formState.projectDescription.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          required
        />
        {formState.projectDescription.isTouched &&
          !formState.projectDescription.isValid && <RequiredError />}
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
          value={formState.problemBeingSolved.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          required
        />
        {formState.problemBeingSolved.isTouched &&
          !formState.problemBeingSolved.isValid && <RequiredError />}
      </Label>
      <Label>
        <span>
          Impact <Required>*</Required>
        </span>
        <div>
          <small>
            How will your project / solution address the problem? How will your
            work impact the rollup ecosystem? Who will benefit from your work?
          </small>
        </div>
        <TextArea
          name="impact"
          value={formState.impact.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          required
        />
        {formState.impact.isTouched && !formState.impact.isValid && (
          <RequiredError />
        )}
      </Label>
      <Label>
        <span>
          Needs and Challenges <Required>*</Required>
        </span>
        <div>
          <small>
            What are the most significant obstacles facing your project or your
            team right now? What are some of your most pressing needs?
          </small>
        </div>
        <TextArea
          name="challenges"
          value={formState.challenges.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          required
        />
        {formState.challenges.isTouched && !formState.challenges.isValid && (
          <RequiredError />
        )}
      </Label>
      <Label>
        <span>Proposal Timeline and Deliverables</span>
        <TextArea
          name="proposedTimeline"
          value={formState.proposedTimeline.value}
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        <span>Requested Grant Amount</span>
        <div>
          <small>Ex: USD 4,000</small>
        </div>
        <Input
          type="text"
          name="requestedAmount"
          value={formState.requestedAmount.value}
          onChange={handleInputChange}
          maxLength="20"
        />
      </Label>
      <Label>
        <span>
          How did you hear about this round of grants? <Required>*</Required>
        </span>
        <Select
          options={referralSourceOptions}
          onChange={handleSelectChange}
          onBlur={e => handleTouched(e, "referralSource")}
          required
        />
        {formState.referralSource.isTouched &&
          !formState.referralSource.isValid && <RequiredError />}
      </Label>
      {formState.referralSource.value ===
        REFERRAL_SOURCES[REFERRAL_SOURCES.length - 1] && (
        <Label>
          <span>If other:</span>
          <Input
            type="text"
            name="referralSourceIfOther"
            value={formState.referralSourceIfOther.value}
            onChange={handleInputChange}
            maxLength="150"
          />
        </Label>
      )}
      <Label>
        <span>Twitter Username</span>
        <div>
          <small>Ex: @ef_esp</small>
        </div>
        <Input
          type="text"
          name="twitter"
          value={formState.twitter.value}
          onChange={handleInputChange}
          maxLength="15"
        />
      </Label>
      <Label>
        <span>GitHub Username</span>
        <div>
          <small>Ex: @github_username</small>
        </div>
        <Input
          type="text"
          name="github"
          value={formState.github.value}
          onChange={handleInputChange}
          maxLength="40"
        />
      </Label>
      <Label>
        <span>LinkedIn Profile URL</span>
        <div>
          <small>Ex: https://www.linkedin.com/in/profilename</small>
        </div>
        <Input
          type="text"
          name="linkedin"
          value={formState.linkedin.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          maxLength="150"
        />
        {formState.linkedin.isTouched && !formState.linkedin.isValid && (
          <ErrorMessage>Ensure LinkedIn profile is valid URL</ErrorMessage>
        )}
      </Label>
      <Label>
        <span>
          What questions do you have about anything related to rollups?
        </span>
        <TextArea
          name="questions"
          value={formState.questions.value}
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        <span>Telegram Username</span>
        <Input
          type="text"
          name="contactAlternative"
          value={formState.contactAlternative.value}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>Anything else you'd like to share? (optional)</span>
        <TextArea
          name="other"
          value={formState.other.value}
          onChange={handleInputChange}
        />
      </Label>
      <Checkbox>
        <CheckboxInput
          type="checkbox"
          name="newsletter"
          value={formState.newsletter.value}
          onChange={handleCheckBoxChange}
        />
        Subscribe to the ESP Newsletter? You'll hear from us every few weeks,
        and we'll only ever contact you with ESP news.
      </Checkbox>
      <div>
        <StyledButton disabled={isButtonDisabled} onClick={handleSubmit}>
          {buttonText}
        </StyledButton>
      </div>
    </StyledForm>
  )
}

export default RollupGrantsForm
