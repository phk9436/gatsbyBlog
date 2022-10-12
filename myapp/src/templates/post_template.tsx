import React from "react"
import { graphql } from "gatsby"
import Template from "components/Common/Template"
import { PostPageItemType } from "types/PostItem.types"
import PostHead from "components/Post/PostHead"
import PostContent from "components/Post/PostContent"

interface PostTemplateProps {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
}

function postTemplate({
  data: {
    allMarkdownRemark: { edges },
  },
}: PostTemplateProps) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  } = edges[0]
  return (
    <Template>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <PostContent html={html} />
    </Template>
  )
}

export default postTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
