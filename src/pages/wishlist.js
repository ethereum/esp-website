import React from "react"
import styled from "styled-components"

import SEO from "../components/seo"
import { useState } from "react"
import AccordionSection from "../components/accordion"
import {
  PageBody,
  PageHeader,
  H1,
  H2,
  HR,
} from "../components/SharedStyledComponents"
import { colorGrayDark } from "../utils/styles"

const Item = styled.blockquote`
  border-left: 3px solid ${colorGrayDark};
  padding-left: 24px;
`

const UL = styled.ul`
  margin-top: 8px;
`

const WishlistPage = ({ data }) => {
  // This approach is if you only want max one section open at a time. If you want multiple
  // sections to potentially be open simultaneously, they can all be given their own `useState`.
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <SEO title="Wish List" />
      <div>
        <PageHeader>
          <H1>Project Wish List</H1>
        </PageHeader>
        <PageBody>
          <H2>Wish List</H2>
          <p>
            Wondering what kinds of things ESP supports? Below you can find some
            of the major categories we’re paying attention to right now. We hope
            these examples help to demonstrate the wide range of efforts we
            support, but they don’t represent the full extent of our interests.
            We’re always open to new ideas - if you think your project will make
            Ethereum better for everyone, we want to hear about it!
          </p>
          <HR />
          <AccordionSection
            key={0}
            i={0}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Capabilities"
          >
            <p>
              <Item>
                <strong>
                  Decentralised data storage, indexing, privacy, and associated
                  tooling
                </strong>
              </Item>
              <Item>
                <strong>Homomorphic encryption</strong>
              </Item>
              <Item>
                <strong>Secure multiparty computation</strong>
              </Item>
              <Item>
                <strong>ZEXE for decentralized private computing</strong>
              </Item>
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={1}
            i={1}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Privacy"
          >
            <p>
              <Item>
                <strong>zk-s*ark/roll-up research</strong>
              </Item>
              <Item>
                <strong>Homomorphic encryption</strong>
              </Item>
              <Item>
                <strong>Secure multiparty computation</strong>
              </Item>
              <Item>
                <strong>ZEXE for decentralized private computing</strong>
              </Item>
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={2}
            i={2}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Security"
          >
            <p>
              <Item>
                <strong>Smart contract security</strong>
                <div>
                  Techniques for detecting and reducing vulnerabilities and
                  risks associated with code and smart contract systems.
                  Including but not limited to:
                </div>
                <UL>
                  <li>
                    Techniques and tools for formal verification, bounded model
                    checking, fuzzing, static analysis, ect.
                  </li>
                  <li> Access control like capability-based security</li>
                  <li> Language improvements.</li>
                </UL>
              </Item>
              <Item>
                <strong>
                  Automatically generating a symbolic machine for an interpreted
                  EE.
                </strong>
              </Item>
              <Item>
                <strong>Game theory security research</strong>
                <UL>
                  <li>Theory of open games</li>
                  <li>Solutions to miner front running</li>
                </UL>
              </Item>
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={3}
            i={3}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Usability"
          >
            <p>
              <Item>
                <strong>Friction free onboarding</strong>
              </Item>
              <Item>
                <strong>
                  Key management, social and other key recovery mechanisms
                </strong>
              </Item>
              <Item>
                <strong>
                  <a href="https://eips.ethereum.org/EIPS/eip-1559">EIP 1559</a>
                </strong>
                <div>
                  Analysis of and analytics for real world Ethereum transactions
                  (application usage, gas / opcode usage, missed avenues for
                  optimization, etc) 🔥→ EIP 1559/EIP 2048
                </div>
              </Item>
              <Item>
                <strong>
                  Analysis of and analytics for real world Ethereum transactions
                </strong>
              </Item>
              <Item>
                <strong>Usability studies</strong>
                <div>Usability and sociological studies</div>
              </Item>
              <Item>
                <strong>Light clients for resource constrained devices</strong>
                <div>
                  Light client protocol research and clients that can run in
                  resource constrained devices and/or can be embedded as
                  libraries into other software.
                </div>
              </Item>
              <Item>
                <strong>
                  Integration/interoperability with other chains (including
                  permissioned Ethereum chains)
                </strong>
              </Item>
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={4}
            i={4}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Developer Experience"
          >
            <p></p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={5}
            i={5}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Education"
          >
            <p></p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={6}
            i={6}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Scaling"
          >
            <p></p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={7}
            i={7}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Crazy"
          >
            <p></p>
          </AccordionSection>
          <HR />
        </PageBody>
      </div>
    </>
  )
}

export default WishlistPage
