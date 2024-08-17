import PostForm from './PostForm'

import { PostData, Tag } from '../App'

type AddPostProps = {
  onSubmit: (data: PostData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

function AddPost({ onSubmit, onAddTag, availableTags }: AddPostProps) {
  return (
    <>
      <h2 className='mb-4'>افزودن پست</h2>
      <PostForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default AddPost
