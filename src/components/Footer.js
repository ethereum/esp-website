import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  colorGrayDarker,
  colorRed,
  screenSizeS,
  screenSizeL,
  screenSizeM,
} from "../utils/styles"

const FooterElement = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px;
  color: ${colorGrayDarker};

  @media (max-width: ${screenSizeS}) {
    padding: 15px;
  }
`

const LinkContainer = styled.div`
  display: flex;
  @media (max-width: ${screenSizeM}) {
    flex-direction: column;
    align-items: center;
    margin-top: 8px;
  }
`
const IconContainer = styled.div``

const InternalLink = styled(Link)`
  color: ${colorGrayDarker};
  margin-left: 16px;
  margin-right: 16px;
  &:hover {
    color: ${colorRed};
  }

  @media (max-width: ${screenSizeL}) {
    margin-left: 12px;
    margin-right: 12px;
  }
`

const ExternalLink = styled.a`
  color: ${colorGrayDarker};
  margin-left: 16px;
  margin-right: 16px;

  &:hover {
    color: ${colorRed};
  }

  @media (max-width: ${screenSizeL}) {
    margin-left: 12px;
    margin-right: 12px;
  }
`

const Icon = styled(FontAwesomeIcon)`
  color: ${colorGrayDarker};
  font-size: 32px;
  margin: 16px 8px;

  &:hover {
    color: ${colorRed};
  }
`

const Legal = styled.div`
  font-size: 0.8rem;
  @media (max-width: ${screenSizeS}) {
    text-align: center;
  }
`

const Bar = styled.div`
  @media (max-width: ${screenSizeM}) {
    display: none;
  }
`

const BR = styled.br`
  display: none;
  @media (max-width: ${screenSizeS}) {
    display: block;
  }
`

export const Divider = styled.div`
  height: 3px;
  background-image: linear-gradient(to right, #ffcf47, #c6566c);
`

const Footer = () => (
  <>
    <Divider />
    <FooterElement>
      <LinkContainer>
        <ExternalLink
          className="copy"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ethereum.org/"
        >
          Ethereum.org
        </ExternalLink>
        <Bar>|</Bar>
        <ExternalLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://ethereum.foundation/"
        >
          Ethereum.foundation
        </ExternalLink>
        <Bar>|</Bar>
        <ExternalLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://blog.ethereum.org/category/ecosystem-support-program/"
        >
          Blog
        </ExternalLink>
        <Bar>|</Bar>
        <ExternalLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://ethereum.org/privacy-policy/"
        >
          Privacy Policy
        </ExternalLink>
        <Bar>|</Bar>
        <ExternalLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://ethereum.org/terms-of-use/"
        >
          Terms of Use
        </ExternalLink>
        <Bar>|</Bar>
        <InternalLink to="/en/cookie-policy/">Cookie Policy</InternalLink>
      </LinkContainer>
      <IconContainer>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/EF_ESP"
        >
          <Icon icon={faTwitter} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ethereum"
        >
          <Icon icon={faGithub} />
        </a>
      </IconContainer>
      <Legal>
        © {new Date().getFullYear()} Ethereum Foundation. <BR />
        All rights reserved.
      </Legal>
    </FooterElement>
  </>
)

export default Footer
