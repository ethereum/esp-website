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

const IN_PERSON_OPTIONS = ["in-person", "online"]
const EVENT_TYPES = [
  "conference",
  "small-community-event",
  "meetup",
  "hackathon",
  "other",
]

const REFERRAL_SOURCES = [
  "ethereum-blog",
  "ethereum-community-events",
  "other-team-in-ecosystem",
  "other",
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
    value: formatMessage({ id: `page-devcon.${option}` }),
    label: formatMessage({ id: `page-devcon.${option}` }),
    name: "inPerson",
  }))

  const eventTypeOptions = EVENT_TYPES.map(option => ({
    value: formatMessage({ id: `page-devcon.${option}` }),
    label: formatMessage({ id: `page-devcon.${option}` }),
    name: "eventType",
  }))

  const referralSourceOptions = REFERRAL_SOURCES.map(source => ({
    value: formatMessage({ id: `page-devcon.${source}` }),
    label: formatMessage({ id: `page-devcon.${source}` }),
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
        addToast(formatMessage({ id: `page-devcon.error-submitting` }), {
          appearance: "error",
          autoDismiss: true,
        })
      } else {
        addToast(formatMessage({ id: `page-devcon.success` }), {
          appearance: "success",
          autoDismiss: true,
        })
        navigate("/thanks/")
      }
    } catch (error) {
      setFormState({ ...formState, isPending: false })
      console.error(error)
      addToast(formatMessage({ id: `page-devcon.error-submitting` }), {
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
  const buttonText = formState.isPending
    ? formatMessage({ id: `page-devcon.submitting` })
    : formatMessage({ id: `page-devcon.submit` })

  const RequiredError = () => <ErrorMessage>Field is required</ErrorMessage>

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>
        <span>
          <FormattedMessage id="page-devcon.contact-first-name" />{" "}
          <Required>*</Required>
        </span>
        <Input
          type="text"
          name="firstName"
          value={formState.firstName?.value}
          onChange={handleInputChange}
          maxLength="255"
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
          <FormattedMessage id="page-devcon.contact-last-name" />{" "}
          <Required>*</Required>
        </span>
        <Input
          type="text"
          name="lastName"
          value={formState.lastName.value}
          onChange={handleInputChange}
          maxLength="255"
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
          <FormattedMessage id="page-devcon.contact-email" />{" "}
          <Required>*</Required>
        </span>
        <Input
          type="email"
          name="contactEmail"
          value={formState.contactEmail.value}
          onChange={handleInputChange}
          maxLength="255"
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
          <FormattedMessage id="page-devcon.organization" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-devcon.organization-subtext" />
          </small>
        </div>
        <Input
          type="text"
          name="company"
          value={formState.company?.value}
          onChange={handleInputChange}
          maxLength="255"
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
        <span>
          <FormattedMessage id="page-devcon.list-previous-events" />
        </span>
        <TextArea
          name="previousWork"
          value={formState.previousWork.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
        />
      </StyledLabel>
      <StyledLabel>
        <span>
          <FormattedMessage id="page-devcon.tell-us-about-your-team" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-devcon.tell-us-about-your-team-subtext" />
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
          <FormattedMessage id="page-devcon.event-name" />{" "}
          <Required>*</Required>
        </span>
        <Input
          type="text"
          name="projectName"
          value={formState.projectName.value}
          onChange={handleInputChange}
          maxLength="255"
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
          <FormattedMessage id="page-devcon.event-date" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-devcon.event-date-subtext" />
          </small>
        </div>
        <Input
          type="text"
          name="eventDate"
          value={formState.eventDate.value}
          onChange={handleInputChange}
          maxLength="255"
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
          <FormattedMessage id="page-devcon.link-to-public-event" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-devcon.link-to-public-event-example" />
          </small>
        </div>
        <Input
          type="text"
          name="eventLink"
          value={formState.eventLink.value}
          onChange={handleInputChange}
          onBlur={handleTouched}
          maxLength="255"
        />
        <ErrorDiv>
          {formState.eventLink.isTouched && !formState.eventLink.isValid && (
            <ErrorMessage>
              <FormattedMessage id="page-devcon.link-to-public-event-error" />
            </ErrorMessage>
          )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          <FormattedMessage id="page-devcon.event-topic" />{" "}
          <Required>*</Required>
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
          <FormattedMessage id="page-devcon.event-description" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-devcon.event-description-subtext" />
          </small>
        </div>
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
          <FormattedMessage id="page-devcon.event-type" />
        </span>
        <StyledSelect
          options={eventTypeOptions}
          onChange={handleSelectChange}
          onBlur={e => handleTouched(e, "eventType")}
        />
        <ErrorDiv>
          {formState.eventType.isTouched && !formState.eventType.isValid && (
            <RequiredError />
          )}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          <FormattedMessage id="page-devcon.event-in-person-or-online" />{" "}
          <Required>*</Required>
        </span>
        <StyledSelect
          options={inPersonOptions}
          onChange={handleSelectChange}
          onBlur={e => handleTouched(e, "inPerson")}
          required
        />
        <ErrorDiv>
          {formState.inPerson.isTouched && !formState.inPerson.isValid && (
            <RequiredError />
          )}
        </ErrorDiv>
      </StyledLabel>
      {formState.inPerson.value === "In-person" && (
        <StyledLabel>
          <span>
            <FormattedMessage id="page-devcon.event-location" />{" "}
            <Required>*</Required>
          </span>
          <div>
            <small>
              <FormattedMessage id="page-devcon.event-location-subtext" />
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
        <span>
          <FormattedMessage id="page-devcon.social-media" />
        </span>
        <div>
          <small>
            <FormattedMessage id="page-devcon.social-media-subtext" />
          </small>
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
          <FormattedMessage id="page-devcon.expected-number-attendees" />{" "}
          <Required>*</Required>
        </span>
        <Input
          type="number"
          name="estimatedAttendees"
          value={formState.estimatedAttendees.value}
          onChange={handleInputChange}
          maxLength="255"
          min="0"
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
          <FormattedMessage id="page-devcon.target-audience" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-devcon.target-audience-subtext" />
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
        <span>
          <FormattedMessage id="page-devcon.list-confirmed-speakers" />
        </span>
        <TextArea
          name="confirmedSpeakers"
          value={formState.confirmedSpeakers.value}
          onChange={handleInputChange}
        />
      </StyledLabel>
      <StyledLabel>
        <span>
          <FormattedMessage id="page-devcon.list-confirmed-sponsors" />
        </span>
        <TextArea
          name="otherSponsors"
          value={formState.otherSponsors.value}
          onChange={handleInputChange}
        />
      </StyledLabel>
      <StyledLabel>
        <span>
          <FormattedMessage id="page-devcon.budget-breakdown" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-devcon.budget-breakdown-subtext" />
          </small>
        </div>
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
          <FormattedMessage id="page-devcon.requested-grant-amount" />{" "}
          <Required>*</Required>
        </span>
        <div>
          <small>
            <FormattedMessage id="page-devcon.requested-grant-amount-subtext" />
          </small>
        </div>
        <Input
          type="text"
          name="requestedAmount"
          value={formState.requestedAmount?.value}
          onChange={handleInputChange}
          maxLength="255"
          onBlur={handleTouched}
          required
        />
        <ErrorDiv>
          {formState.requestedAmount.isTouched &&
            !formState.requestedAmount.isValid && <RequiredError />}
        </ErrorDiv>
      </StyledLabel>
      <StyledLabel>
        <span>
          <FormattedMessage id="page-devcon.anything-else-to-share" />
        </span>
        <TextArea
          name="other"
          value={formState.other.value}
          onChange={handleInputChange}
        />
      </StyledLabel>
      <StyledLabel>
        <span>
          <FormattedMessage id="page-devcon.how-did-you-hear-about-grants" />{" "}
          <Required>*</Required>
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
          <span>
            <FormattedMessage id="page-devcon.if-other" />
          </span>
          <Input
            type="text"
            name="referralSourceIfOther"
            value={formState.referralSourceIfOther.value}
            onChange={handleInputChange}
            maxLength="255"
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
        <FormattedMessage id="page-devcon.subscribe-checkbox" />
      </Checkbox>
      <div>
        <StyledButton disabled={isButtonDisabled} onClick={handleSubmit}>
          {buttonText}
        </StyledButton>
        {!isFormValid() && (
          <div>
            <small>
              <FormattedMessage id="page-devcon.fill-out-required-message" />
            </small>
          </div>
        )}
      </div>
    </StyledForm>
  )
}

export default DevconGrantsForm
