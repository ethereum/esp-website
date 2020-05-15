import React, { useState } from "react"
import styled from "styled-components"
import { colorOrangeLightest } from "../utils/styles"
import { Input, Button } from "../components/SharedStyledComponents"
import { useToasts } from "react-toast-notifications"
import { FormattedMessage } from "gatsby-plugin-intl"

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

  const { addToast } = useToasts()

  const handleInputChange = event => {
    setEmail(event.target.value)
  }

  const submitInquiry = () => {
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
        setEmail("")
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

  const isEmailValid = !!email

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

        <SubmitButton disabled={!isEmailValid} type="submit">
          <FormattedMessage id="sign-up" />
        </SubmitButton>
      </Form>
    </Container>
  )
}

export default NewsletterSignup
