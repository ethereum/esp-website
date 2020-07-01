import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"

import Link from "./Link"
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

const StyledLink = styled(Link)`
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

const IconLink = styled(StyledLink)`
  margin-left: 0;
  margin-right: 0;
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

const Divider = styled.div`
  height: 3px;
  background-image: linear-gradient(to right, #ffcf47, #c6566c);
`

const LinkAndBar = styled.div`
  display: flex;
`

const links = [
  {
    to: "https://www.ethereum.org/",
    text: "Ethereum.org",
  },
  {
    to: "https://ethereum.foundation/",
    text: "Ethereum.foundation",
  },
  {
    to: "https://blog.ethereum.org/category/ecosystem-support-program/",
    text: "Blog",
  },
  {
    to: "https://ethereum.org/privacy-policy/",
    text: "Privacy Policy",
  },
  {
    to: "https://ethereum.org/terms-of-use/",
    text: "Terms of Use",
  },
  {
    to: "/en/cookie-policy/",
    text: "Cookie Policy",
  },
]

const Footer = () => (
  <>
    <Divider />
    <FooterElement>
      <LinkContainer>
        {links.map((link, idx) => {
          return (
            <LinkAndBar key={idx}>
              <StyledLink to={link.to}>{link.text}</StyledLink>
              {/* Add bar except after last link */}
              {idx !== links.length - 1 && <Bar>|</Bar>}
            </LinkAndBar>
          )
        })}
      </LinkContainer>
      <IconContainer>
        <IconLink to="https://twitter.com/EF_ESP">
          <Icon icon={faTwitter} />
        </IconLink>
        <IconLink to="https://github.com/ethereum">
          <Icon icon={faGithub} />
        </IconLink>
      </IconContainer>
      <Legal>
        © {new Date().getFullYear()} Ethereum Foundation. <BR />
        All rights reserved.
      </Legal>
    </FooterElement>
  </>
)

export default Footer
