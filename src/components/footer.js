import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer = () => (
  <footer>
    <div class="copy footer-legal">
      © 2019 Ethereum Foundation. All rights reserved.
    </div>
    <div class="soc">
      <a class="copy" target="_blank" href="https://www.ethereum.org/">
        Ethereum.org
      </a>
      <a
        class="copy"
        target="_blank"
        href="https://www.ethereum.org/privacy-policy/"
      >
        Privacy Policy
      </a>
      <a
        class="copy"
        target="_blank"
        href="https://www.ethereum.org/cookie-policy/"
      >
        Cookie Policy
      </a>
      <a target="_blank" href="https://twitter.com/ethereum">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a target="_blank" href="https://github.com/ethereum">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  </footer>
)

export default Footer
