import React, { useState } from "react"
import { navigate } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { FormattedMessage } from "gatsby-plugin-intl"
import styled from "styled-components"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"

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

const StyledSelect = styled(Select)`
  margin-top: 0.5rem;
`

const StyledLabel = styled(Label)`
  margin-bottom: 2.5rem;
`

const ErrorMessage = styled.small`
  color: ${colorRed};
`

const ErrorDiv = styled.div`
  margin-top: 0.5rem;
  height: 0rem;
  width: 100%;
`

const StyledButton = styled(Button)`
  margin-bottom: 1rem;
`

const IN_PERSON_OPTIONS = ["In-person", "Online"]
const EVENT_TYPES = [
  "Conference",
  "Small Community Event",
  "Meetup",
  "Hackathon",
  "Other",
]

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
  "teamProfile",
  "projectName",
  "eventLink",
  "eventTopic",
  "projectDescription",
  "eventDate",
  "inPerson",
  "estimatedAttendees",
  "impact",
  "proposedTimeline",
  "requestedAmount",
  "referralSource",
]

const DevconGrantsForm = () => {
  const { formatMessage } = useIntl()
  // TODO: Add translation support
  // formatMessage({ id: "page-name.key" })
  // Or if a component will work:
  // <FormattedMessage id="page-name.key" />

  const [formState, setFormState] = useState({
    isPending: false,
    round: { value: "Road to Devcon Event Grants" },
    category: { value: "Community & education" },
    exploreOrProject: { value: "project" },
    // form fields
    firstName: { value: "", isTouched: false, isValid: false },
    lastName: { value: "", isTouched: false, isValid: false },
    contactEmail: { value: "", isTouched: false, isValid: false },
    company: { value: "", isTouched: false, isValid: false },
    previousWork: { value: "", isTouched: false, isValid: false },
    teamProfile: { value: "", isTouched: false, isValid: false },
    projectName: { value: "", isTouched: false, isValid: false },
    eventLink: { value: "", isTouched: false, isValid: false },
    eventTopic: { value: "", isTouched: false, isValid: false },
    projectDescription: { value: "", isTouched: false, isValid: false },
    eventDate: { value: "", isTouched: false, isValid: false },
    inPerson: { value: "", isTouched: false, isValid: true },
    eventType: { value: "", isTouched: false, isValid: true },
    city: { value: "", isTouched: false, isValid: true },
    twitter: { value: "", isTouched: false, isValid: true },
    estimatedAttendees: { value: "", isTouched: false, isValid: true },
    impact: { value: "", isTouched: false, isValid: false },
    confirmedSpeakers: { value: "", isTouched: false, isValid: false },
    proposedTimeline: { value: "", isTouched: false, isValid: true },
    requestedAmount: { value: "", isTouched: false, isValid: true },
    otherSponsors: { value: "", isTouched: false, isValid: true },
    other: { value: "", isTouched: false, isValid: true },
    referralSource: { value: "", isTouched: false, isValid: false },
    referralSourceIfOther: { value: "", isTouched: false, isValid: true },
    newsletter: { value: "", isTouched: false, isValid: true },
  })

  const { addToast } = useToasts()

  const inPersonOptions = IN_PERSON_OPTIONS.map(option => ({
    value: option,
    label: option,
    name: "inPerson",
  }))

  const eventTypeOptions = EVENT_TYPES.map(option => ({
    value: option,
    label: option,
    name: "eventType",
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
    const { value } = formState.eventLink
    const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    return value === "" || value.match(re)
  }

  const isCityValid = () => {
    if (formState.inPerson.value === "Online") return true
    return formState.city.value.length > 0
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
        : name === "eventLink"
        ? isUrlValid()
        : name === "city"
        ? isCityValid()
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
    isFormValid() && false && submitInquiry() // TODO: remove false to allow completion
  }

  const isFormValid = () => {
    for (const field of requiredFields) {
      if (!formState[field]?.isValid) return false
    }
    return formState.eventLink.isValid && formState.city.isValid
  }

  const isButtonDisabled = !isFormValid() || formState.isPending
  const buttonText = formState.isPending ? "Submitting..." : "Submit"

  const RequiredError = () => <ErrorMessage>Field is required</ErrorMessage>

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>
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
        <ErrorDiv>
          {formState.firstName.isTouched && !formState.firstName.isValid && (
            <RequiredError />
          )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
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
        <ErrorDiv>
          {formState.lastName.isTouched && !formState.lastName.isValid && (
            <RequiredError />
          )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
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
        <ErrorDiv>
          {formState.contactEmail.isTouched &&
            !formState.contactEmail.isValid && (
              <ErrorMessage>Please provide a valid email address</ErrorMessage>
            )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          Organization <Required>*</Required>
        </span>
        <div>
          <small>If you're working alone, just write "none"</small>
        </div>
        <Input
          type="text"
          name="company"
          value={formState.company?.value}
          onChange={handleInputChange}
          maxLength="150"
          onBlur={handleTouched}
          required
        />
        <ErrorDiv>
          {formState.company.isTouched && !formState.company.isValid && (
            <RequiredError />
          )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>List any previous events you've organized</span>
        <TextArea
          name="previousWork"
          value={formState.previousWork.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
        />
      </StyledLabel>
      <StyledLabel>
        <span>
          Tell us about you or your team! <Required>*</Required>
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
        <ErrorDiv>
          {formState.teamProfile.isTouched &&
            !formState.teamProfile.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          Event Name <Required>*</Required>
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
        <ErrorDiv>
          {formState.projectName.isTouched &&
            !formState.projectName.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          Link to public event page <Required>*</Required>
        </span>
        <div>
          <small>Example: https://www.myevent.com</small>
        </div>
        <Input
          type="text"
          name="eventLink"
          value={formState.eventLink.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          maxLength="150"
        />
        <ErrorDiv>
          {formState.eventLink.isTouched && !formState.eventLink.isValid && (
            <ErrorMessage>Ensure link is a valid URL</ErrorMessage>
          )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          Event Topic <Required>*</Required>
        </span>
        <TextArea
          name="eventTopic"
          value={formState.eventTopic.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          required
        />
        <ErrorDiv>
          {formState.eventTopic.isTouched && !formState.eventTopic.isValid && (
            <RequiredError />
          )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          Event Description <Required>*</Required>
        </span>
        <TextArea
          name="projectDescription"
          value={formState.projectDescription.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          required
        />
        <ErrorDiv>
          {formState.projectDescription.isTouched &&
            !formState.projectDescription.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          Event Date <Required>*</Required>
        </span>
        <div>
          <small>Please enter the first date of your event</small>
        </div>
        <Input
          type="text"
          name="eventDate"
          value={formState.eventDate.value}
          onChange={handleInputChange}
          maxLength="150"
          onBlur={handleTouched}
          required
        />
        <ErrorDiv>
          {formState.eventDate.isTouched && !formState.eventDate.isValid && (
            <RequiredError />
          )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          Is your event in-person or online? <Required>*</Required>
        </span>
        <StyledSelect
          options={inPersonOptions}
          onChange={handleSelectChange}
          onBlur={e => handleTouched(e, "inPerson")}
          required
        />
        <ErrorDiv>
          {formState.referralSource.isTouched &&
            !formState.referralSource.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      {formState.inPerson.value === "In-person" && (
        <StyledLabel>
          <span>Event location</span>
          <div>
            <small>
              (<Required>*</Required> required if happening in person)
            </small>
          </div>
          <Input
            type="text"
            name="city"
            value={formState.city.value}
            onChange={handleInputChange}
            maxLength="128"
            onBlur={handleTouched}
          />
          <ErrorDiv>
            {formState.city.isTouched && !formState.city.isValid && (
              <RequiredError />
            )}
          </ErrorDiv>
        </StyledLabel>
      )}
      <StyledLabel>
        <span>What type of event is this?</span>
        <StyledSelect
          options={eventTypeOptions}
          onChange={handleSelectChange}
          onBlur={e => handleTouched(e, "eventType")}
        />
        <ErrorDiv>
          {formState.referralSource.isTouched &&
            !formState.referralSource.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>Social media or other links</span>
        <div>
          <small>Example: @twitter</small>
        </div>
        <Input
          type="text"
          name="twitter"
          value={formState.twitter.value}
          onChange={handleInputChange}
          maxLength="16"
        />
      </StyledLabel>
      <StyledLabel>
        <span>
          Expected number of attendees/registrants <Required>*</Required>
        </span>
        <Input
          type="text"
          name="estimatedAttendees"
          value={formState.estimatedAttendees.value}
          onChange={handleInputChange}
          maxLength="150"
          onBlur={handleTouched}
          required
        />
        <ErrorDiv>
          {formState.estimatedAttendees.isTouched &&
            !formState.estimatedAttendees.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          Target audience <Required>*</Required>
        </span>
        <div>
          <small>
            (For example: developers, entrepreneurs, general community)
          </small>
        </div>
        <TextArea
          name="impact"
          value={formState.impact.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          required
        />
        <ErrorDiv>
          {formState.impact.isTouched && !formState.impact.isValid && (
            <RequiredError />
          )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>List any confirmed speakers</span>
        <TextArea
          name="confirmedSpeakers"
          value={formState.confirmedSpeakers.value}
          onChange={handleInputChange}
        />
      </StyledLabel>
      <StyledLabel>
        <span>
          Budget Breakdown <Required>*</Required>
        </span>
        <TextArea
          name="proposedTimeline"
          value={formState.proposedTimeline.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          required
        />
        <ErrorDiv>
          {formState.proposedTimeline.isTouched &&
            !formState.proposedTimeline.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          Requested Grant Amount <Required>*</Required>
        </span>
        <div>
          <small>$500-1500 USD</small>
        </div>
        <Input
          type="text"
          name="requestedAmount"
          value={formState.requestedAmount?.value}
          onChange={handleInputChange}
          maxLength="150"
          onBlur={handleTouched}
          required
        />
        <ErrorDiv>
          {formState.requestedAmount.isTouched &&
            !formState.requestedAmount.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>List any confirmed sponsors</span>
        <TextArea
          name="otherSponsors"
          value={formState.otherSponsors.value}
          onChange={handleInputChange}
        />
      </StyledLabel>
      <StyledLabel>
        <span>Anything else you'd like to share? (optional)</span>
        <TextArea
          name="other"
          value={formState.other.value}
          onChange={handleInputChange}
        />
      </StyledLabel>
      <StyledLabel>
        <span>
          How did you hear about this round of grants? <Required>*</Required>
        </span>
        <StyledSelect
          options={referralSourceOptions}
          onChange={handleSelectChange}
          onBlur={e => handleTouched(e, "referralSource")}
          required
        />
        <ErrorDiv>
          {formState.referralSource.isTouched &&
            !formState.referralSource.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      {formState.referralSource.value ===
        REFERRAL_SOURCES[REFERRAL_SOURCES.length - 1] && (
        <StyledLabel>
          <span>If other:</span>
          <Input
            type="text"
            name="referralSourceIfOther"
            value={formState.referralSourceIfOther.value}
            onChange={handleInputChange}
            maxLength="150"
          />
        </StyledLabel>
      )}
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
        {!isFormValid() && (
          <div>
            <small>Fill out all required fields before submitting</small>
          </div>
        )}
      </div>
    </StyledForm>
  )
}

export default DevconGrantsForm
