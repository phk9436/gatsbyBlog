import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  MutableRefObject,
} from "react"
import { PostListItemType } from "types/PostItem.types"

export interface useInfiniteScrollType {
  containerRef: MutableRefObject<HTMLDivElement | null>
  postList: PostListItemType[]
}

const NUMBER_OF_ITEMS_PER_PAGE = 10

function useInfiniteScroll(
  selectedCategory: string,
  posts: PostListItemType[]
): useInfiniteScrollType {
  const containerRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(1)

  const postListByCategory = useMemo(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: PostListItemType) =>
          selectedCategory !== "All"
            ? categories.includes(selectedCategory)
            : true
      ),
    [selectedCategory]
  )

  const observer = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return
    setCount(state => state + 1)
    observer.disconnect()
  })

  useEffect(() => setCount(1), [selectedCategory])

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0
    )
      return

    observer.observe(
      containerRef.current.children[containerRef.current.children.length - 1]
    )
  }, [count, selectedCategory])

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  }
}

export default useInfiniteScroll
