import React, { useState } from "react"
import { navigate } from "gatsby"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"
import { FormattedMessage, useIntl, Link } from "gatsby-plugin-intl"

import PageMetadata from "../components/PageMetadata"
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
  RadioPrompt,
  RadioContainer,
  RadioLabel,
  RadioInputContainer,
  Required,
} from "../components/SharedStyledComponents"

const countryOptions = COUNTRIES.map(country => {
  return { value: country, label: country, name: "country" }
})

const referralSourceOptions = REFERRAL_SOURCES.map(source => {
  return { value: source, label: source, name: "referralSource" }
})

const INQUIRY_TYPES = ["Question", "Feedback", "Other"]

const inquiryTypeOptions = INQUIRY_TYPES.map(type => {
  return { value: type, label: type, name: "inquiryType" }
})

const exploreRequiredFields = [
  "exploreOrProject",
  "name",
  "contactEmail",
  "inquiryType",
  "inquiry",
]
const projectRequiredFields = [
  "exploreOrProject",
  "projectDescription",
  "teamProfile",
  "impact",
  "challenges",
  "name",
  "contactEmail",
]

const InquirePage = () => {
  const [formState, setFormState] = useState({
    isPending: false,
    // form fields
    exploreOrProject: "",
    name: "",
    contactEmail: "",
    projectName: "",
    newsletter: "",
    // project
    teamProfile: "",
    previousWork: "",
    city: "",
    country: "",
    referralSource: "",
    referralName: "",
    projectDescription: "",
    impact: "",
    challenges: "",
    // explore
    inquiryType: "",
    inquiry: "",
  })

  const { addToast } = useToasts()
  const intl = useIntl()

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
    let isValid = false

    const fieldGroups = [exploreRequiredFields, projectRequiredFields]

    fieldGroups.forEach(fieldGroup => {
      let isGroupValid = true

      fieldGroup.forEach(field => {
        if (!formState[field]) {
          isGroupValid = false
        }
      })
      if (isGroupValid) {
        isValid = true
      }
    })

    return isValid
  }

  const isValid = isFormValid()
  const isButtonDisabled = !isValid || formState.isPending
  const buttonTextId = formState.isPending
    ? "page-project.button-pending"
    : "page-project.button"

  return (
    <>
      <PageMetadata title={intl.formatMessage({ id: "page-inquire.title" })} />
      <PageBody>
        <FormHeader>
          <h1>
            <FormattedMessage id="page-inquire.h1" />
          </h1>
          <p>
            <FormattedMessage id="page-inquire.description" />
          </p>
          <p>
            <FormattedMessage id="page-inquire.faq" />{" "}
            <Link to="/faq/">FAQ</Link>.
          </p>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <RadioContainer>
            <RadioPrompt>
              <FormattedMessage id="page-inquire.prompt" />{" "}
              <Required>*</Required>
            </RadioPrompt>
            <RadioInputContainer>
              <RadioLabel>
                <Input
                  type="radio"
                  name="exploreOrProject"
                  value="project"
                  onChange={handleInputChange}
                />
                <div>Specific project</div>
              </RadioLabel>
            </RadioInputContainer>
            <RadioInputContainer>
              <RadioLabel>
                <Input
                  type="radio"
                  name="exploreOrProject"
                  value="explore"
                  onChange={handleInputChange}
                />
                <div>Exploring possibilities</div>
              </RadioLabel>
            </RadioInputContainer>
          </RadioContainer>

          {formState.exploreOrProject === "project" && (
            <div>
              <Label>
                <span>
                  <FormattedMessage id="page-project.proj-name" />
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
                  <FormattedMessage id="page-project.proj-desc" />{" "}
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
                  <FormattedMessage id="page-project.profile" />{" "}
                  <Required>*</Required>
                </span>
                <div>
                  <small>
                    <FormattedMessage id="page-project.team" />
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
                  <FormattedMessage id="page-project.impact" />{" "}
                  <Required>*</Required>
                </span>
                <div>
                  <small>
                    <FormattedMessage id="page-project.proj-impact" />
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
                  <FormattedMessage id="page-project.challenges" />{" "}
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
                  <FormattedMessage id="page-project.prev-work" />
                </span>
                <div>
                  <small>
                    <FormattedMessage id="page-project.prev-work-links" />
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
                  <FormattedMessage id="page-project.contact-person" />{" "}
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
                  <FormattedMessage id="page-project.contact-p-country" />
                </span>
                <Select
                  options={countryOptions}
                  onChange={handleSelectChange}
                />
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
                  <FormattedMessage id="page-project.support" />
                </span>
                <Select
                  options={referralSourceOptions}
                  onChange={handleSelectChange}
                />
              </Label>

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
                <FormattedMessage id="subscribe" />
              </Checkbox>
              <div>
                <Button disabled={isButtonDisabled} type="submit">
                  <FormattedMessage id={buttonTextId} />
                </Button>
              </div>
            </div>
          )}
          {formState.exploreOrProject === "explore" && (
            <div>
              <Label>
                <span>
                  <FormattedMessage id="page-inquire.name" />{" "}
                  <Required>*</Required>
                </span>
                <div>
                  <small>
                    <FormattedMessage id="page-inquire.name-guide" />
                  </small>
                </div>

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
                  <FormattedMessage id="page-inquire.proj-company-name" />
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
                  <FormattedMessage id="page-inquire.inquiry-type" />{" "}
                  <Required>*</Required>
                </span>
                <Select
                  options={inquiryTypeOptions}
                  onChange={handleSelectChange}
                />
              </Label>

              <Label>
                <span>
                  <FormattedMessage id="page-inquire.inquiry" />{" "}
                  <Required>*</Required>
                </span>
                <TextArea
                  name="inquiry"
                  value={formState.inquiry}
                  onChange={handleInputChange}
                  maxLength={255}
                />
              </Label>

              <Checkbox>
                <CheckboxInput
                  type="checkbox"
                  name="newsletter"
                  value={formState.newsletter}
                  onChange={handleCheckBoxChange}
                />
                <FormattedMessage id="subscribe" />
              </Checkbox>
              <div>
                <Button disabled={isButtonDisabled} type="submit">
                  <FormattedMessage id={buttonTextId} />
                </Button>
              </div>
            </div>
          )}
        </Form>
      </PageBody>
    </>
  )
}

export default InquirePage
