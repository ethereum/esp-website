import React, { useState } from "react"
import { navigate } from "gatsby"
import { useToasts } from "react-toast-notifications"

import SEO from "../components/seo"
import {
  PageBody,
  Form,
  Label,
  Input,
  TextArea,
  Button,
  FormHeader,
  Required,
} from "../components/SharedStyledComponents"

// TODO confirm these combos
const bankRequiredFields = [
  "beneficiaryName",
  "beneficiaryAddress",
  "bankName",
  "bankAddress",
  "bankAccountNumber",
  "bankRoutingNumber",
  "granteeSecurityID",
]

const intlBankRequiredFields = [
  "beneficiaryName",
  "beneficiaryAddress",
  "bankName",
  "bankAddress",
  "bankAccountNumber",
  "bankSWIFT",
  "granteeSecurityID",
]

const ethRequiredFields = [
  "beneficiaryName",
  "beneficiaryAddress",
  "ethAddress",
  "granteeSecurityID",
]
const daiRequiredFields = [
  "beneficiaryName",
  "beneficiaryAddress",
  "daiAddress",
  "granteeSecurityID",
]

const ExplorePage = () => {
  const [formState, setFormState] = useState({
    beneficiaryName: "",
    beneficiaryAddress: "",
    bankName: "",
    bankAddress: "",
    bankAccountNumber: "", // IBAN is used to identify an individual account involved in the international transaction
    bankRoutingNumber: "",
    bankSWIFT: "", // SWIFT code is used to identify a specific bank during an international transaction
    notes: "",
    ethAddress: "",
    daiAddress: "",
    granteeSecurityID: "",
  })

  const { addToast } = useToasts()

  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    setFormState({ ...formState, [name]: value })
  }

  const submitInquiry = () => {
    fetch("/.netlify/functions/grantee", {
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

    const fieldGroups = [
      bankRequiredFields,
      intlBankRequiredFields,
      ethRequiredFields,
      daiRequiredFields,
    ]

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
      <SEO title="Grantee Form" />
      <PageBody>
        <FormHeader>
          <h1>Welcome!</h1>
          <p>
            Please submit your bank or wallet details using this secure form.
            The Ethereum Foundation can remit payment in DAI, ETH, or the fiat
            currency of your choosing.
          </p>
          <p>
            If you chose to be paid in any fiat currency, the payment will be
            sent from our account on the following Monday and should arrive in
            your account in roughly 10 business days. If you choose to be paid
            in ETH or DAI, someone from the Ethereum Foundation will contact you
            via email to confirm your address with a test amount before sending
            the entirety of the funds.
          </p>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <Label>
            <span>
              Beneficiary name <Required>*</Required>
            </span>
            <div>
              <small>
                Name of the individual or entity attached to the account
                receiving the funds.
              </small>
            </div>

            <Input
              type="text"
              name="beneficiaryName"
              value={formState.beneficiaryName}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>
              Beneficiary address <Required>*</Required>
            </span>
            <div>
              <small>
                Personal or business address of the individual or entity
                receiving the funds.
              </small>
            </div>
            <TextArea
              name="beneficiaryAddress"
              value={formState.beneficiaryAddress}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>
              Bank name <Required>*</Required>
            </span>
            <div>
              <small>Name of receiving bank.</small>
            </div>

            <Input
              type="text"
              name="bankName"
              value={formState.bankName}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>
              Bank address <Required>*</Required>
            </span>
            <div>
              <small>Branch address of receiving bank.</small>
            </div>
            <TextArea
              name="bankAddress"
              value={formState.bankAddress}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>
              International or Domestic Bank Account Number{" "}
              <Required>*</Required>
            </span>
            <div>
              <small>
                Provide either an International Bank Account Number (IBAN) or a
                standard domestic bank account number.
              </small>
            </div>

            <Input
              type="text"
              name="bankAccountNumber"
              value={formState.bankAccountNumber}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>
              Bank routing number <Required>*</Required>
            </span>
            <div>
              <small>
                For U.S. bank account holders, your routing number is a
                nine-digit code that's based on the U.S. bank location where
                your account was opened.
              </small>
            </div>

            <Input
              type="text"
              name="bankRoutingNumber"
              value={formState.bankRoutingNumber}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>Bank SWIFT code</span>
            <div>
              <small>
                A SWIFT Code or Bank Identifier Code (BIC) is used to specify a
                particular bank or branch. These codes are used when
                transferring money between banks, particularly for international
                wire transfers.
              </small>
            </div>

            <Input
              type="text"
              name="bankSWIFT"
              value={formState.bankSWIFT}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>
              ETH Address <Required>*</Required>
            </span>
            <div>
              <small>Ethereum address where you'd like to receive ETH.</small>
            </div>

            <Input
              type="text"
              name="ethAddress"
              value={formState.ethAddress}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>
              DAI Address <Required>*</Required>
            </span>
            <div>
              <small>Ethereum address where you'd like to receive DAI.</small>
            </div>

            <Input
              type="text"
              name="daiAddress"
              value={formState.daiAddress}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>Notes</span>
            <div>
              <small>Anything else we should know?</small>
            </div>
            <TextArea
              name="notes"
              value={formState.notes}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            <span>
              Grantee Security ID<Required>*</Required>
            </span>
            <div>
              <small>The key phrase provided to you by ESP.</small>
            </div>

            <Input
              type="text"
              name="granteeSecurityID"
              value={formState.granteeSecurityID}
              onChange={handleInputChange}
            />
          </Label>

          <div>
            <Button disabled={!isValid} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </PageBody>
    </>
  )
}

export default ExplorePage
