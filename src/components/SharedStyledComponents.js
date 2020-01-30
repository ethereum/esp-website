import styled from "styled-components"

export const PageBody = styled.div`
  margin: 0 auto 1rem;
  max-width: 780px;
  padding: 0 16px;
`

export const PageHeader = styled.div`
  height: 150px;
  background-image: linear-gradient(to right, #ffcf47, #c6566c);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

export const H1 = styled.h1`
  margin-bottom: 0;
  @media (max-width: 480px) {
    padding: 0 16px;
    text-align: center;
  }
`
