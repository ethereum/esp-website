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
} from "../components/SharedStyledComponents"
import { colorGrayDark } from "../utils/styles"

const Item = styled.div`
  border-left: 3px solid ${colorGrayDark};
  padding-left: 24px;
  margin-left: 1.45rem;
  margin-right: 1.45rem;
  margin-bottom: 1.45rem;
`
const WishlistPage = () => {
  // TODO simplify w/ Array... couldn't get it working
  const [expanded, setExpanded] = useState({
    0: false,
    1: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  })

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
            Ethereum better for everyone,{" "}
            <Link to="/project/">we want to hear about it</Link>!
          </p>
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
                Decentralised data storage, indexing, data privacy, and
                associated tooling. Concentrating on tangible near term
                use-cases like: Storage for user content; Decentralized
                websites; Storage and retrieval of Ethereum history.
              </div>
            </Item>
            <Item>
              <strong>Communications infrastructure</strong>
              <div>
                Robust scalable approaches for privacy preserving communication
                at network and messaging layers, in support of use cases
                including decentralised applications, personal & enterprise
                message exchange and private transactions.
              </div>
            </Item>
            <Item>
              <strong>
                Infrastructure and standards for decentralized applications
              </strong>
              <div>
                Frameworks, standards and missing infrastructure including non
                consensus aspects which improve developer productivity and/or
                which help fulfill the vision of decentralized applications.
              </div>
            </Item>
            <Item>
              <strong>Identity</strong>
              <div>
                Digital identity building blocks, standards and tooling in
                support of applications like proof of educational credentials,
                opt in KYC, organizational membership, voting, quadratic voting,
                reputation ect.
              </div>
            </Item>
            <Item>
              <strong>Integration and interoperability</strong>
              <div>
                Integration and interoperability with other systems and
                standards including: decentralized web and P2P protocols,
                existing internet protocols, public & private chains, other
                important protocols, software stacks, and hardware platforms.
              </div>
            </Item>
            <Item>
              <strong>Light clients</strong>
              <div>
                Eth1.x and Eth2 light client research and development and other
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
                Robust scalable approaches for privacy preserving communication
                at network and messaging layers, in support of use cases
                including decentralised applications, personal & enterprise
                message exchange and private transactions.
              </div>
            </Item>
            <Item>
              <strong>Confidential execution</strong>
              <div>
                Approaches towards confidential execution and transfers
                including s*ark/stonk/stank, Zexe, homomorphic encryption,
                secure multiparty computation ect.
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
                Removing usability, and other barriers to adoption and use.
              </div>
            </Item>
            <Item>
              <strong>Key management</strong>
              <div>
                Key management improvements including, portability between
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
                Frameworks, standards and missing infrastructure including non
                consensus aspects which improve developer productivity and/or
                which help fulfill the vision of decentralized applications.
              </div>
            </Item>
            <Item>
              <strong>Tooling that improves developer experience</strong>
              <div>
                Tools and libraries, that improve developer experience,
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
                Improved documentation, tutorials and other educational material
                especially common resources like educational toolkits which can
                be shared between events and courses.
              </div>
            </Item>
            <Item>
              <strong>Translation of educational materials</strong>
              <div>
                Translation of documentation, educational material, research,
                and specs into other languages.
              </div>
            </Item>
            <Item>
              <strong>Groups and events</strong>
              <div>
                Community groups and events, especially those which which grow
                the Ethereum community in currently underrepresented regions or
                which create links with valued aligned communities and expert
                groups.
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
                Shared infrastructure and standards for L2 scaling solutions,
                research into cross shard L2, as well as general L2 scaling
                research and development of L2 scaling solutions.
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
              <strong>
                Research into stateless ethereum with application to both Eth
                1.x and Eth 2
              </strong>
              <div>
                Research into stateless ethereum with application to both Eth
                1.x and Eth 2 including witnesses format, ZK witness
                compression, accumulators, state availability, and delivery.
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
                including s*ark/stonk/stank, Zexe, homomorphic encryption,
                secure multiparty computation ect.
              </div>
            </Item>
            <Item>
              <strong>
                Research into stateless ethereum with application to both Eth
                1.x and Eth 2
              </strong>
              <div>
                Research into stateless ethereum with application to both Eth
                1.x and Eth 2 including witnesses format, ZK witness
                compression, accumulators, state availability, and delivery.
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
