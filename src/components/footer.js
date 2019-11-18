import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer = () => (
  <footer>
    <div className="copy footer-legal">
      © {new Date().getFullYear()} Ethereum Foundation. All rights reserved.
    </div>
    <div className="soc">
      <a
        className="copy"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.ethereum.org/"
      >
        Ethereum.org
      </a>
      <a
        className="copy"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.ethereum.org/privacy-policy/"
      >
        Privacy Policy
      </a>
      <a
        className="copy"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.ethereum.org/cookie-policy/"
      >
        Cookie Policy
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/ethereum"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ethereum"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  </footer>
)

export default Footer
