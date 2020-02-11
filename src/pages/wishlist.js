import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import SEO from "../components/seo"
import { useState } from "react"
import AccordionSection from "../components/accordion"
import {
  PageBody,
  PageHeader,
  H1,
  H2,
  HR,
  FakeLink,
} from "../components/SharedStyledComponents"
import { colorGrayDark } from "../utils/styles"

const Item = styled.div`
  border-left: 3px solid ${colorGrayDark};
  padding-left: 24px;
  margin-left: 1.45rem;
  margin-right: 1.45rem;
  margin-bottom: 1.45rem;
`

const StyledFakeLink = styled(FakeLink)`
  margin-bottom: 1.45rem;
`

const UL = styled.ul`
  margin-top: 0.5rem;
`

const WishlistPage = () => {
  // TODO simplify w/ Array... couldn't get it working
  const [expanded, setExpanded] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  })

  let areAnyOpen = false

  Object.keys(expanded).forEach(i => {
    if (expanded[i]) {
      areAnyOpen = true
    }
  })

  const toggleAll = () => {
    const newState = {}
    const newStateItem = areAnyOpen ? false : true
    Object.keys(expanded).forEach(i => {
      newState[i] = newStateItem
    })
    setExpanded(newState)
  }

  const toggleAllText = areAnyOpen ? "Collapse all" : "Expand all"

  return (
    <>
      <SEO title="Wishlist" />
      <div>
        <PageHeader>
          <H1>Project Wishlist</H1>
        </PageHeader>
        <PageBody>
          <H2>Wishlist</H2>
          <p>
            Here, you’ll find some of the areas where we’re actively seeking
            applications. While these are some of the most pressing needs we see
            in the ecosystem, the list is by no means exhaustive. We don't
            expect to think of everything - we’re always looking for new ideas.
            If you’re working on something that will make Ethereum better,{" "}
            <Link to="/project/">we're here to help</Link>!
          </p>
          <StyledFakeLink onClick={toggleAll}>{toggleAllText}</StyledFakeLink>
          <HR />
          <AccordionSection
            key={0}
            i={0}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Capabilities"
          >
            <Item>
              <strong>Decentralized data storage</strong>
              <div>
                Decentralized data storage, indexing, data privacy, and
                associated tooling. Use cases including:
                <UL>
                  <li>Storage for user content</li>
                  <li>Decentralized websites</li>
                  <li>Storage and retrieval of Ethereum history</li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>Communications infrastructure</strong>
              <div>
                Privacy preserving communication at network and messaging
                layers. Use cases including:
                <UL>
                  <li>Decentralized applications</li>
                  <li>Personal & enterprise message exchange</li>
                  <li>Private transactions</li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>
                Infrastructure and standards for decentralized applications
              </strong>
              <div>
                Frameworks, standards and missing infrastructure which improve
                developer productivity, and/or help fulfill the vision of
                decentralized applications.
              </div>
            </Item>
            <Item>
              <strong>Identity</strong>
              <div>
                Digital identity building blocks, standards and tooling. Use
                cases including:
                <UL>
                  <li>Proof of educational credentials</li>
                  <li>Opt in KYC</li>
                  <li>Organizational membership</li>
                  <li>Voting/quadratic voting</li>
                  <li>Reputation</li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>Integration and interoperability</strong>
              <div>
                Integration and interoperability with other systems and
                standards including:
                <UL>
                  <li>Decentralized web and P2P protocols</li>
                  <li>Existing internet protocols</li>
                  <li>Public & private chains</li>
                  <li>
                    Other important protocols, software stacks, and hardware
                    platforms.
                  </li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>Light clients</strong>
              <div>
                Eth 1.x and Eth 2 light client research and development; other
                approaches to ensuring secure data availability for resource
                constrained devices and libraries.
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={1}
            i={1}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Privacy"
          >
            <Item>
              <strong>Communications infrastructure</strong>
              <div>
                Privacy preserving communication at network and messaging
                layers. Use cases including:
                <UL>
                  <li>Decentralized applications</li>
                  <li>Personal & enterprise message exchange</li>
                  <li>Private transactions</li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>Confidential execution</strong>
              <div>
                Approaches towards confidential execution and transfers
                including:
                <UL>
                  <li>s*ark/stonk/stank</li>
                  <li>Zexe</li>
                  <li>Homomorphic encryption</li>
                  <li>Secure multiparty computation</li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>Cryptography</strong>
              <div>
                Cryptographic research, constructions, improved implementations,
                and libraries.
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={2}
            i={2}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Security"
          >
            <Item>
              <strong>Smart contract security</strong>
              <div>
                Techniques, tools and best practices for preventing, detecting
                and mitigating vulnerabilities.
              </div>
            </Item>
            <Item>
              <strong>Game theory security research</strong>
              <div>
                Research into game theoretic and crypto economic aspects for
                example, theory of open games or miner extractable value.
              </div>
            </Item>
            <Item>
              <strong>More in-depth network monitoring tools</strong>
              <div>Network and smart contract monitoring tools.</div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={3}
            i={3}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Usability"
          >
            <Item>
              <strong>Friction reduction</strong>
              <div>
                Removing usability barriers and other impediments to adoption
                and use.
              </div>
            </Item>
            <Item>
              <strong>Key management</strong>
              <div>
                Key management improvements including portability between
                wallets, social and other key recovery mechanisms.
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={4}
            i={4}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Developer Experience"
          >
            <Item>
              <strong>
                Infrastructure and standards for decentralized applications
              </strong>
              <div>
                Frameworks, standards and missing infrastructure which improve
                developer productivity, and/or help fulfill the vision of
                decentralized applications.
              </div>
            </Item>
            <Item>
              <strong>Tooling to improve developer experience</strong>
              <div>
                Tools and libraries that improve developer experience,
                productivity, code quality and safety.
              </div>
            </Item>
            <Item>
              <strong>Smart contract security</strong>
              <div>
                Techniques, tools and best practices for preventing, detecting
                and mitigating vulnerabilities.
              </div>
            </Item>
            <Item>
              <strong>More in-depth network monitoring tools</strong>
              <div>Network and smart contract monitoring tools.</div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={5}
            i={5}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Education and Community"
          >
            <Item>
              <strong>Educational materials</strong>
              <div>
                Improved documentation; tutorials; common resources like
                educational toolkits that can be shared between events and
                courses.
              </div>
            </Item>
            <Item>
              <strong>Translation</strong>
              <div>
                Translating documentation, educational material, research, and
                specs into other languages.
              </div>
            </Item>
            <Item>
              <strong>Groups and events</strong>
              <div>
                Growing the Ethereum community, especially in currently
                underrepresented regions; creating links with valued aligned
                communities and expert groups.
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={6}
            i={6}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Scaling"
          >
            <Item>
              <strong>Cryptography</strong>
              <div>
                Cryptographic research, constructions, improved implementations,
                and libraries.
              </div>
            </Item>
            <Item>
              <strong>L2 Scaling</strong>
              <div>
                Shared infrastructure and standards for L2 scaling solutions;
                research into cross shard L2; general L2 scaling research;
                development of L2 scaling solutions.
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={7}
            i={7}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Eth 1.x"
          >
            <Item>
              <strong>Stateless Ethereum</strong>
              <div>
                Research into stateless Ethereum with application to both Eth
                1.x and Eth 2, including:
                <UL>
                  <li>Witnesses format</li>
                  <li>ZK witness compression</li>
                  <li>Accumulators</li>
                  <li>State availability</li>
                  <li>Delivery</li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>Eth 1.x optimizations and other improvements</strong>
              <div>Optimizations and improvements to Eth 1.x</div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={8}
            i={8}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Eth 2"
          >
            <Item>
              <strong>Confidential execution</strong>
              <div>
                Approaches towards confidential execution and transfers
                including:
                <UL>
                  <li>s*ark/stonk/stank</li>
                  <li>Zexe</li>
                  <li>Homomorphic encryption</li>
                  <li>Secure multiparty computation</li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>Stateless Ethereum</strong>
              <div>
                Research into stateless Ethereum with application to both Eth
                1.x and Eth 2, including:
                <UL>
                  <li>Witnesses format</li>
                  <li>ZK witness compression</li>
                  <li>Accumulators</li>
                  <li>State availability</li>
                  <li>Delivery</li>
                </UL>
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={9}
            i={9}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Surprise Us"
          >
            <Item>
              <strong>Surprise Us!</strong>
              <div>
                Breakthough ideas, projects, improvements, research challenges
                we don't even know we need!
              </div>
            </Item>
          </AccordionSection>
          <HR />
        </PageBody>
      </div>
    </>
  )
}

export default WishlistPage
