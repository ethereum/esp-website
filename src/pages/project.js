import React, { useState } from "react"
import { navigate } from "gatsby"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

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
      <SEO title={intl.formatMessage({ id: "page-project.title" })} />
      <PageBody>
        <FormHeader>
          <h1>
            <FormattedMessage id="page-project.h1" />
          </h1>
          <p>
            <FormattedMessage id="page-project.description" />
          </p>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <Label>
            <span>
              <FormattedMessage id="page-project.proj-name" />
            </span>
            <Input
              type="text"
              name="projectName"
              value={formState.projectName}
              onChange={handleInputChange}
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
            <FormattedMessage id="page-project.prev-work" />
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
            />
          </Label>
          <Label>
            <span>
              <FormattedMessage id="page-project.contact-email" />{" "}
              <Required>*</Required>
            </span>
            <Input
              type="email"
              name="contactEmail"
              value={formState.contactEmail}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <FormattedMessage id="page-project.contact-p-country" />
            <Select options={countryOptions} onChange={handleSelectChange} />
          </Label>

          <Label>
            <FormattedMessage id="page-project.contact-p-city" />
            <Input
              type="text"
              name="city"
              maxLength="40"
              value={formState.city}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <FormattedMessage id="page-project.support" />
            <Select
              options={referralSourceOptions}
              onChange={handleSelectChange}
            />
          </Label>

          <Label>
            <FormattedMessage id="page-project.support-p" />
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
            <FormattedMessage id="page-project.subscribe" />
          </Checkbox>

          <div>
            <Button disabled={!isValid} type="submit">
              <FormattedMessage id="page-project.button" />
            </Button>
          </div>
        </Form>
      </PageBody>
    </>
  )
}

export default ProjectPage
