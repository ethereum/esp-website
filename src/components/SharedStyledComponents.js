import { Link } from "gatsby"
import styled from "styled-components"
import * as styles from "../utils/styles"

export const PageBody = styled.div`
  margin: 0 auto 1rem;
  max-width: 780px;
  padding: 40px 16px;
`

export const PageBodyWide = styled.div`
  margin: 0 auto 1rem;
  max-width: 960px;
  padding: 40px 16px;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  padding: 2rem 4rem;
  border-radius: 4px;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

export const Input = styled.input`
  margin-top: 8px;
  border: 1px solid #d1d1d1; /* TODO move to styles */
  height: 40px;
  padding: 8px;
  border-radius: 2px;
`
export const TextArea = styled.textarea`
  margin-top: 8px;
  padding: 8px;
  border-radius: 2px;
  height: 80px;
  border: 1px solid #d1d1d1; /* TODO move to styles */
`

export const Button = styled.button`
  text-transform: uppercase;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.5;
  text-align: center;
  border-radius: 20px;
  color: #ffffff; /* TODO move to styles */
  background: #e66981; /* TODO move to styles */
  border: 1px solid #e66981; /* TODO move to styles */
  font-size: 1.1rem;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  padding: 15px 30px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;

  &:hover {
    color: #ffffff;
    background: #d05d73;
  }

  &:disabled {
    background: ${styles.colorMedGray};
  }
`

export const FormHeader = styled.header`
  max-width: 548px;
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
`

export const Required = styled.span`
  color: ${styles.colorRed};
  font-weight: bold;
`
