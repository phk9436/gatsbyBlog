import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/react"
import styled from "@emotion/styled"

interface InfoPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
      }
    }
  }
}

function InfoPage({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}: InfoPageProps) {
  return (
    <div>
      <Link to="/">Home</Link>
      <Text1 disabled={false}>{title}</Text1>
      <Text1 disabled={true}>{description}</Text1>
    </div>
  )
}

export default InfoPage

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

const Text1 = styled("div")<{ disabled: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: gray;
  text-decoration: ${props => (props.disabled ? "line-through" : "none")};
`
