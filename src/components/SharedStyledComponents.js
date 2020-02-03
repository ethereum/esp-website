import { Link } from "gatsby"
import styled from "styled-components"
import * as styles from "../utils/styles"

export const PageBody = styled.div`
  margin: 0 auto 1rem;
  max-width: 780px;
  padding: 0 16px;
`

export const PageHeader = styled.div`
  height: 100px;
  background-image: linear-gradient(to right, #ffcf47, #c6566c);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

export const H1 = styled.h1`
  margin-bottom: 0;
  @media (max-width: 480px) {
    font-size: 1.8rem;
    padding: 0 16px;
    text-align: center;
  }
`

export const StyledLink = styled(Link)`
  color: ${styles.colorOrange};
  text-decoration: none;
  opacity: 1;
  outline: none;

  &:hover {
    text-decoration: none;
    color: ${styles.colorRed};
  }
`
