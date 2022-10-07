import React from "react"
import { graphql } from "gatsby"
import Text from "components/Text"
import { Link } from "gatsby"

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
      <Text text={title} />
      <Text text={description} />
      <Text text={author} />
      <Link to="/">Home</Link>
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
