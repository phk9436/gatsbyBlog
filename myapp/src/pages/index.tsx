import * as React from "react"
import { Link } from "gatsby"
import { Global } from "@emotion/react"
import GlobalStyle from "components/Common/GlobalStyle"
import styled from "@emotion/styled"
import ProfileImage from "components/Main/ProfileImg"
import Intro from "components/Main/Intro"
import Footer from "components/Common/Footer"

const IndexPage = () => {
  return (
    <Container>
      <GlobalStyle />
      <Intro />
      <Footer />
    </Container>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

export default IndexPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`