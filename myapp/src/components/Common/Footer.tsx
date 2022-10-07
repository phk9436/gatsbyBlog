import React from "react"
import styled from "@emotion/styled"

function Footer() {
  return (
    <FooterWrapper>
      Thank You for Visiting My Blog, Have a Good Day 😆
      <br />© 2022 Developer Phk, Powered By Gatsby.
    </FooterWrapper>
  )
}

export default Footer

const FooterWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
`
