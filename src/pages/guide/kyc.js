import React from "react"
import styled from "styled-components"

import Breadcrumbs from "../../components/Breadcrumbs"
import GuideNav from "../../components/GuideNav"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import {
  Disclaimer,
  H1,
  H2,
  PageBodyWide,
  PageHeader,
  Section,
} from "../../components/SharedStyledComponents"

const PageBody = styled(PageBodyWide)`
  display: flex;
`
const MainContent = styled.div``

const KYCPage = () => {
  return (
    <>
      <PageMetadata title="ESP Grantee KYC Requirements" />
      <div>
        <PageHeader>
          <H1>Guide to ESP</H1>
        </PageHeader>
        <PageBody>
          <GuideNav />
          <MainContent>
            <Breadcrumbs to="/guide/" copy={"Back to About This Guide"} />
            <Section>
              <H2>ESP Grantee KYC Requirements</H2>
              <p>
                All grantees need to go through KYC (Know Your Customer) in
                order to receive <Link to="/guide/funding/">their funds</Link>.
              </p>
              <p>Grantees are required to provide the following:</p>
              <h3>Individual Recipients</h3>
              <ol>
                <li>Copy of Passport</li>
                <li>Proof of address*</li>
              </ol>
              <h3>Business Recipients</h3>
              <ol>
                <li>Company Name/ Address</li>
                <li>Country of Incorporation</li>
                <li>Company ID/ tax ID in jurisdiction</li>
                <li>
                  Any individuals or entities that own more than 10% of company,
                  and how much of the company they own
                </li>
                <li>
                  Copy of (i) passport, and (ii) proof of address* for each
                  director, officer and shareholder
                </li>
                <li>
                  English copy of the certificate of incorporation for your
                  organization
                </li>
                <li>English copy of the directors register</li>
              </ol>
              <p>
                Docs must be dated within the past year. Sensitive details can
                be redacted as long as the document issuer and the person's name
                and address are visible.
              </p>
              <Disclaimer>
                *Proof of address can include:
                <ul>
                  <li>Bank statements</li>
                  <li>Credit card statements</li>
                  <li>Utility bills</li>
                  <li>Government correspondence</li>
                  <li>Landline subscriptions</li>
                </ul>
              </Disclaimer>
            </Section>
          </MainContent>
        </PageBody>
      </div>
    </>
  )
}

export default KYCPage
