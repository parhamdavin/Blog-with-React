import { useParams, Navigate, Outlet, useOutletContext } from 'react-router-dom'

import { Post } from '../App'

type PostLayoutProps = {
  posts: Post[]
}

function PostLayout({ posts }: PostLayoutProps) {
  const { id } = useParams()

  const post = posts.find((item) => item.id === id)

  if (post == null) return <Navigate to='/' replace />

  return <Outlet context={post} />
}

export function usePost() {
  return useOutletContext<Post>()
}

export default PostLayout
