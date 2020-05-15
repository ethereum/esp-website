import React, { useState } from "react"
import { navigate } from "gatsby"
import { useToasts } from "react-toast-notifications"
import Select from "react-select"
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl"

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

const ExplorePage = ({ intl }) => {
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
      <SEO title={intl.formatMessage({ id: "page-explore.title" })} />
      <PageBody>
        <FormHeader>
          <h1>
            <FormattedMessage id="page-explore.explore.h1" />
          </h1>
          <p>
            <FormattedMessage id="page-explore.explore.description" />
          </p>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <Label>
            <span>
              Your name <Required>*</Required>
            </span>
            <div>
              <small>
                <FormattedMessage id="page-explore.explore.name-guide" />
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
            <span>
              <FormattedMessage id="page-explore.explore.proj-name" />
            </span>
            <div>
              <small>
                <FormattedMessage id="page-explore.explore.proj-info" />
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
                <FormattedMessage id="page-explore.explore.profile-info" />
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
                <FormattedMessage id="page-explore.explore.expertise-info" />
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
            <FormattedMessage id="page-explore.explore.prev-work" />
            <div>
              <small>
                <FormattedMessage id="page-explore.explore.link-2-work" />
              </small>
            </div>
            <TextArea
              name="previousWork"
              value={formState.previousWork}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            <FormattedMessage id="page-explore.explore.questions" />
            <TextArea
              name="questions"
              value={formState.questions}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <FormattedMessage id="page-explore.explore.country" />
            <Select options={countryOptions} onChange={handleSelectChange} />
          </Label>

          <Label>
            <FormattedMessage id="page-explore.explore.city" />
            <Input
              type="text"
              name="city"
              maxLength="40"
              value={formState.city}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <FormattedMessage id="page-explore.explore.support" />
            <Select
              options={referralSourceOptions}
              onChange={handleSelectChange}
            />
          </Label>

          <Label>
            <FormattedMessage id="page-explore.explore.support-info" />
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
            <FormattedMessage id="page-explore.explore.subscribe" />
          </Checkbox>

          <div>
            <Button disabled={!isValid} type="submit">
              <FormattedMessage id="page-explore.explore.button" />
            </Button>
          </div>
        </Form>
      </PageBody>
    </>
  )
}

export default injectIntl(ExplorePage)
