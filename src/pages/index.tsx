import * as React from "react"
import GlobalStyle from "components/Common/GlobalStyle"
import styled from "@emotion/styled"
import Intro from "components/Main/Intro"
import Footer from "components/Common/Footer"
import CategoryList, { CategoryListProps } from "components/Main/CategoryList"
import PostList from "components/Main/PostList"
import { graphql } from "gatsby"
import { PostListItemType } from "types/PostItem.types"
import { IGatsbyImageData } from "gatsby-plugin-image"
import queryString, { ParsedQuery } from "query-string"
import Template from "components/Common/Template"

export interface IndexPageProps {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
  }
}

const IndexPage = ({
  location: { search },
  data: {
    file,
    allMarkdownRemark,
    site: { siteMetadata },
  },
}: IndexPageProps) => {
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory =
    !parsed.category || typeof parsed.category !== "string"
      ? "All"
      : parsed.category

  const categoryList = React.useMemo(
    () =>
      allMarkdownRemark.edges.reduce(
        (
          list: CategoryListProps["categoryList"], //acc
          {
            node: {
              frontmatter: { categories }, //cur
            },
          }: PostListItemType
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1
            else list[category]++
          })

          list["All"]++

          return list
        },
        { All: 0 } // initailValue
      ),
    []
  )

  return (
    <Template
      title={siteMetadata.title}
      description={siteMetadata.description}
      url={siteMetadata.siteUrl}
      image={file.publicURL}
    >
      <Intro profileImage={file.childImageSharp.gatsbyImageData} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList
        selectedCategory={selectedCategory}
        posts={allMarkdownRemark.edges}
      />
    </Template>
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

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD")
            summary
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
  }
`
