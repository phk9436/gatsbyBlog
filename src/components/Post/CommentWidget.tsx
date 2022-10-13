import { Tracing } from "gatsby"
import React, { createRef, useEffect } from "react"
import styled from '@emotion/styled'

const src = "https://utteranc.es/client.js"
const repo = "phk9436/gatsbyProject.github.io"

interface UtteranceAttributesType {
  src: string
  repo: string
  "issue-term": string
  label: string
  theme: string
  crossorigin: string
  async: string
}

function CommentWidget() {
  const element = createRef<HTMLDivElement>()

  useEffect(() => {
    if (element.current === null) return

    const utterances = document.createElement("script")
    const attributes: UtteranceAttributesType = {
      src,
      repo,
      "issue-term": "pathname",
      label: "Comment",
      theme: `github-light`,
      crossorigin: "anonymous",
      async: "true",
    }

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    element.current.appendChild(utterances)
  }, [])
  return <UtterancesWrapper ref={element} />
}

export default CommentWidget

const UtterancesWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`