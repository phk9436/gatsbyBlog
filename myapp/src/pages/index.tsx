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

export interface PostProps {
  location: {
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

const IndexPage = ({
  location: { search },
  data: { file, allMarkdownRemark },
}: PostProps) => {
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
    <Container>
      <GlobalStyle />
      <Intro profileImage={file.childImageSharp.gatsbyImageData} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList
        selectedCategory={selectedCategory}
        posts={allMarkdownRemark.edges}
      />
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

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
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
    }
  }
`
