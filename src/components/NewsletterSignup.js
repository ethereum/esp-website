import React, { useState } from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import { useToasts } from "react-toast-notifications"
import { Input, Button } from "./SharedStyledComponents"
import { colorOrangeLightest } from "../utils/styles"
import { validateEmail } from "../utils/validate-email"
import { ValidateError } from "../utils/validate-error"

const Container = styled.div`
  background-color: ${colorOrangeLightest};
  padding: 24px;
`

const Form = styled.form`
  display: flex;
  justify-content: center;

  & > * {
    margin: 0 8px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const EmailInput = styled(Input)`
  padding-left: 24px;
  padding-right: 24px;
  margin-left: 0;
  margin-right: 0;

  @media (min-width: 601px) {
    min-width: 300px;
    margin: 0 8px;
  }
`

const SubmitButton = styled(Button)`
  margin-top: 8px;
  padding: 0 16px;
  margin-left: 0;
  margin-right: 0;

  @media (max-width: 600px) {
    padding: 8px 16px;
  }

  @media (min-width: 601px) {
    margin: 0 8px;
  }
`

const NewsletterSignup = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { addToast } = useToasts()

  const handleInputChange = event => {
    setEmail(event.target.value)
  }

  const submitInquiry = () => {
    setLoading(true)
    fetch("/.netlify/functions/newsletter-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then(response => response.json())
      .then(() => {
        addToast("Success!", {
          appearance: "success",
          autoDismiss: true,
        })
        setLoading(false)
        setEmail("")
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
        addToast("Error submitting, please try again.", {
          appearance: "error",
          autoDismiss: true,
        })
      })
      .finally(() => setLoading(false))
  }

  const handleSubmit = event => {
    event.preventDefault()
    try {
      validateEmail(email)
      submitInquiry()
    } catch (error) {
      console.error(error)
      if (error instanceof ValidateError) {
        addToast(`${error.message}`, {
          appearance: "error",
          autoDismiss: true,
        })
      }
    }
  }

  const isEmailFieldEmpty = !!email

  return (
    <Container>
      <p>
        <FormattedMessage id="newsletter-description" />
      </p>
      <Form onSubmit={handleSubmit}>
        <EmailInput
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
        <SubmitButton disabled={!isEmailFieldEmpty || loading} type="submit">
          <FormattedMessage id="sign-up" />
        </SubmitButton>
      </Form>
    </Container>
  )
}

export default NewsletterSignup
