import * as React from "react"
import GlobalStyle from "components/Common/GlobalStyle"
import styled from "@emotion/styled"
import Intro from "components/Main/Intro"
import Footer from "components/Common/Footer"
import CategoryList from "components/Main/CategoryList"

export const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
}
const IndexPage = () => {
  return (
    <Container>
      <GlobalStyle />
      <Intro />
      <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST}/>
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