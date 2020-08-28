import React, { useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

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
  RadioInputContainer,
  Required,
} from "../components/SharedStyledComponents"

const countryOptions = COUNTRIES.map(country => {
  return { value: country, label: country, name: "country" }
})

const referralSourceOptions = REFERRAL_SOURCES.map(source => {
  return { value: source, label: source, name: "referralSource" }
})

const IntroSpan = styled.span`
  margin-bottom: 8px;
`

const exploreRequiredFields = [
  "name",
  "contactEmail",
  "teamProfile",
  "areaOfExpertise",
  "whyEthereum",
  "recentProjectsOrDevelopments",
]
const projectRequiredFields = [
  "projectDescription",
  "teamProfile",
  "impact",
  "challenges",
  "name",
  "contactEmail",
]

const InquirePage = () => {
  const [formState, setFormState] = useState({
    exploreOrProject: "",
    name: "",
    contactEmail: "",
    projectName: "",
    teamProfile: "",
    previousWork: "",
    questions: "",
    city: "",
    country: "",
    referralSource: "",
    referralName: "",
    newsletter: "",
    // project
    projectDescription: "",
    impact: "",
    challenges: "",
    // explore
    areaOfExpertise: "",
    whyEthereum: "",
    recentProjectsOrDevelopments: "",
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
    fetch("/.netlify/functions/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then(response => {
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
          navigate("/thanks/")
        }
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
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <Label>
            <IntroSpan>
              Are you looking for support on a specific project, or are you
              still exploring possibilities to get involved?{" "}
              <Required>*</Required>
            </IntroSpan>
            {/* TODO fix - clicking on text should change radio input */}
            <RadioInputContainer>
              <Input
                type="radio"
                name="exploreOrProject"
                value="project"
                onChange={handleInputChange}
              />
              <div>Specific project</div>
            </RadioInputContainer>
            <RadioInputContainer>
              <Input
                type="radio"
                name="exploreOrProject"
                value="explore"
                onChange={handleInputChange}
              />
              <div>Exploring possibilities</div>
            </RadioInputContainer>
          </Label>

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
            </div>
          )}
          {formState.exploreOrProject === "explore" && (
            <div>
              <Label>
                <span>
                  <FormattedMessage id="page-explore.name" />{" "}
                  <Required>*</Required>
                </span>
                <div>
                  <small>
                    <FormattedMessage id="page-explore.name-guide" />
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
                  <FormattedMessage id="page-explore.proj-name" />
                </span>
                <div>
                  <small>
                    <FormattedMessage id="page-explore.proj-info" />
                  </small>
                </div>
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
                  <FormattedMessage id="page-explore.profile" />{" "}
                  <Required>*</Required>
                </span>
                <div>
                  <small>
                    <FormattedMessage id="page-explore.profile-info" />
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
                  <FormattedMessage id="page-explore.expertise" />{" "}
                  <Required>*</Required>
                </span>
                <div>
                  <small>
                    <FormattedMessage id="page-explore.expertise-info" />
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
                  <FormattedMessage id="page-explore.why" />{" "}
                  <Required>*</Required>
                </span>
                <TextArea
                  name="whyEthereum"
                  value={formState.whyEthereum}
                  onChange={handleInputChange}
                />
              </Label>
              <Label>
                <span>
                  <FormattedMessage id="page-explore.proj-dev" />{" "}
                  <Required>*</Required>
                </span>
                <TextArea
                  name="recentProjectsOrDevelopments"
                  value={formState.recentProjectsOrDevelopments}
                  onChange={handleInputChange}
                />
              </Label>
              <Label>
                <span>
                  <FormattedMessage id="page-explore.prev-work" />
                </span>
                <div>
                  <small>
                    <FormattedMessage id="page-explore.link-2-work" />
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
                  <FormattedMessage id="page-explore.questions" />
                </span>
                <TextArea
                  name="questions"
                  value={formState.questions}
                  onChange={handleInputChange}
                  maxLength="255"
                />
              </Label>

              <Label>
                <span>
                  <FormattedMessage id="page-explore.country" />
                </span>
                <Select
                  options={countryOptions}
                  onChange={handleSelectChange}
                />
              </Label>

              <Label>
                <span>
                  <FormattedMessage id="page-explore.city" />
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
                  <FormattedMessage id="page-explore.support" />
                </span>
                <Select
                  options={referralSourceOptions}
                  onChange={handleSelectChange}
                />
              </Label>

              <Label>
                <span>
                  <FormattedMessage id="page-explore.support-info" />
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
                <Button disabled={!isValid} type="submit">
                  <FormattedMessage id="page-project.button" />
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
