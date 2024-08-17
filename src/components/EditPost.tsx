import PostForm from './PostForm'

import { PostData, Tag } from '../App'

import { usePost } from './PostLayout'

type EditPostProps = {
  onSubmit: (id: string, data: PostData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

function EditPost({ onSubmit, onAddTag, availableTags }: EditPostProps) {
  const post = usePost()

  return (
    <>
      <h2 className='mb-4'>ویرایش پست</h2>
      <PostForm
        title={post.title}
        markdown={post.markdown}
        tags={post.tags}
        onSubmit={(data) => onSubmit(post.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default EditPost
