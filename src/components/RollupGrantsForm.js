import React, { useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"

import { COUNTRIES } from "../utils/form-inputs"
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
  "Wallets",
  "Infrastructure",
  "Community & Education",
  "Devex, Tooling & Testing",
  "Interoperability",
  "Adoption",
  "Standards and Research",
  "New Rollups",
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
  "wave",
  "category",
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

const RollupGrantsForm = ({ wave }) => {
  const [formState, setFormState] = useState({
    isPending: false,
    wave,
    category: "Layer 2",
    exploreOrProject: "project",
    // form fields
    firstName: "",
    lastName: "",
    contactEmail: "",
    company: "",
    city: "",
    country: "",
    individualOrTeam: "",
    teamProfile: "",
    projectCategory: "",
    projectName: "",
    projectDescription: "",
    problemBeingSolved: "",
    impact: "",
    challenges: "",
    proposedTimeline: "",
    requestedAmount: "",
    referralSource: "",
    referralSourceIfOther: "",
    twitter: "",
    github: "",
    linkedin: "",
    questions: "",
    contactAlternative: "",
    other: "",
    newsletter: "",
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

  const submitInquiry = async () => {
    setFormState({ ...formState, isPending: true })
    try {
      const response = await fetch("/.netlify/functions/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
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
          Contact - First Name <Required>*</Required>
        </span>
        <Input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>
          Contact - Last Name <Required>*</Required>
        </span>
        <Input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>
          Contact Email <Required>*</Required>
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
          value={formState.company}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>What city is your contact based? (optional)</span>
        <Input
          type="text"
          name="city"
          value={formState.city}
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
        <Select options={teamOptions} onChange={handleSelectChange} />
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
          value={formState.teamProfile}
          onChange={handleInputChange}
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
            work impact the rollup ecosystem? Who will benefit from your work?
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
        <span>Proposal Timeline and Deliverables</span>
        <TextArea
          name="proposedTimeline"
          value={formState.proposedTimeline}
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        <span>Requested Grant Amount</span>
        <div>
          <small>Ex: USD 20,000.00</small>
        </div>
        <Input
          type="text"
          name="requestedAmount"
          value={formState.requestedAmount}
          onChange={handleInputChange}
          maxLength="20"
        />
      </Label>
      <Label>
        <span>
          How did you hear about this wave of grants? <Required>*</Required>
        </span>
        <Select options={referralSourceOptions} onChange={handleSelectChange} />
      </Label>
      {formState.referralSource ===
        REFERRAL_SOURCES[REFERRAL_SOURCES.length - 1] && (
        <Label>
          <span>If other:</span>
          <Input
            type="text"
            name="referralSourceIfOther"
            value={formState.referralSourceIfOther}
            onChange={handleInputChange}
            maxLength="150"
          />
        </Label>
      )}
      <Label>
        <span>Twitter Handle</span>
        <Input
          type="text"
          name="twitter"
          value={formState.twitter}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>GitHub Username</span>
        <Input
          type="text"
          name="github"
          value={formState.github}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>LinkedIn Profile</span>
        <Input
          type="text"
          name="linkedin"
          value={formState.linkedin}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>
          What questions do you have about anything related to rollups?
        </span>
        <TextArea
          name="questions"
          value={formState.questions}
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        <span>Telegram Username{/* or Alternative Contact Info */}</span>
        <Input
          type="text"
          name="contactAlternative"
          value={formState.contactAlternative}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>Anything else you'd like to share? (optional)</span>
        <TextArea
          name="other"
          value={formState.other}
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

export default RollupGrantsForm
