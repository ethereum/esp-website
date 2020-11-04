import React, { useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

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

const PROJECT_STAGES = [
  { id: "page-project.proj-stage-idea", value: "Idea Phase" },
  { id: "page-project.proj-stage-early", value: "Early Phase" },
  { id: "page-project.proj-stage-live", value: "Live service" },
  { id: "page-project.proj-stage-other", value: "Other" },
]

const PROJECT_CATEGORIES = [
  { id: "page-project.proj-category-tech", value: "Technology" },
  { id: "page-project.proj-category-comm", value: "Community" },
  { id: "page-project.proj-category-edu", value: "Education" },
  { id: "page-project.proj-category-other", value: "Other" },
]

const TEAM_CATEGORIES = [
  { id: "page-project.proj-individual-team-individual", value: "Individual" },
  { id: "page-project.proj-individual-team-team", value: "Team" },
]

const countryOptions = COUNTRIES.map(country => {
  return { value: country, label: country, name: "country" }
})

const REFERRAL_SOURCES = [
  {
    id: "page-project.proj-hear-localgrants-dropdown-1",
    value: "Ethereum Blog",
  },
  {
    id: "page-project.proj-hear-localgrants-dropdown-2",
    value: "Ethereum Community Events",
  },
  {
    id: "page-project.proj-hear-localgrants-dropdown-5",
    value: "Newsletter",
  },
  {
    id: "page-project.proj-hear-localgrants-dropdown-3",
    value: "Other team/project in ecosystem",
  },
  { id: "page-project.proj-hear-localgrants-dropdown-4", value: "Other" },
]

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
    exploreOrProject: "project", // send to CRM
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
    referralSourceIfOther: "",
    referralName: "",
    newsletter: "",
  })

  const intl = useIntl()
  const { addToast } = useToasts()

  const projectStageOptions = PROJECT_STAGES.map(stageObject => {
    return {
      value: stageObject.value,
      label: intl.formatMessage({ id: stageObject.id }),
      name: "projectStage",
    }
  })

  const projectCategoryOptions = PROJECT_CATEGORIES.map(category => {
    return {
      value: category.value,
      label: intl.formatMessage({ id: category.id }),
      name: "projectCategory",
    }
  })

  const teamOptions = TEAM_CATEGORIES.map(team => {
    return {
      value: team.value,
      label: intl.formatMessage({ id: team.id }),
      name: "individualOrTeam",
    }
  })

  const referralSourceOptions = REFERRAL_SOURCES.map(source => {
    return {
      value: source.value,
      label: intl.formatMessage({ id: source.id }),
      name: "referralSource",
    }
  })

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
  const buttonText = formState.isPending
    ? intl.formatMessage({ id: "page-project.button-pending" })
    : intl.formatMessage({ id: "page-project.button" })

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Label>
        <span>
          <FormattedMessage id="page-project.proj-name" />{" "}
          <Required>*</Required>
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
          <FormattedMessage id="page-project.proj-category" />{" "}
          <Required>*</Required>
        </span>
        <Select
          options={projectCategoryOptions}
          onChange={handleSelectChange}
        />
      </Label>
      <Label>
        <span>
          <FormattedMessage id="page-project.proj-stage" />{" "}
          <Required>*</Required>
        </span>
        <Select options={projectStageOptions} onChange={handleSelectChange} />
      </Label>
      <Label>
        <span>
          <FormattedMessage id="page-project.proj-desc" />
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-project.proj-success" />
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
          <FormattedMessage id="page-project.proj-prob-solved" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-project.proj-prob-solved-desc" />
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
          <FormattedMessage id="page-project.impacts" /> <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-project.proj-impact-desc" />
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
          <FormattedMessage id="page-project.proj-challenges" />
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-project.challenges-info" />
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
          <FormattedMessage id="page-project.proj-individual-team" />{" "}
          <Required>*</Required>
        </span>
        <Select options={teamOptions} onChange={handleSelectChange} />
      </Label>
      <Label>
        <span>
          <FormattedMessage id="page-project.proj-team-profile" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-project.proj-team-profile-desc" />
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
          <FormattedMessage id="page-project.contact-person" />
          <Required>*</Required>
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
          <FormattedMessage id="contact-email" /> <Required>*</Required>
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
          <FormattedMessage id="page-project.contact-alternative" />
        </span>
        <Input
          type="text"
          name="contactAlternative"
          value={formState.contactAlternative}
          onChange={handleInputChange}
          maxLength="150"
        />
      </Label>
      <Label>
        <span>
          <FormattedMessage id="page-project.contact-p-country" />
        </span>
        <Select options={countryOptions} onChange={handleSelectChange} />
      </Label>
      <Label>
        <span>
          <FormattedMessage id="page-project.contact-p-city" />
        </span>
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
          <FormattedMessage id="page-project.proj-hear-localgrants" />{" "}
          <Required>*</Required>
        </span>
        <Select options={referralSourceOptions} onChange={handleSelectChange} />
      </Label>
      {formState.referralSource === "Other" && (
        <Label>
          <span>
            <FormattedMessage id="page-project.proj-hear-localgrants-specifics" />
          </span>
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
        <span>
          <FormattedMessage id="page-project.support-p" />
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
        <FormattedMessage id="page-project.subscribe" />
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
