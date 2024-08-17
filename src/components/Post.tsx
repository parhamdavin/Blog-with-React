import { Row, Col, Stack, Badge, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { usePost } from './PostLayout'

type PostProps = {
  onDelete: (id: string) => void
}

function Post({ onDelete }: PostProps) {
  const post = usePost()

  const navigate = useNavigate()

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h2>{post.title}</h2>
          {post.tags.length > 0 && (
            <Stack gap={1} direction='horizontal' className='flex-wrap'>
              {post.tags.map((item) => (
                <span className='text-truncate card-tag' key={item.id}>
                  {item.label}
                </span>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to={`/${post.id}/edit`}>
              <Button variant='light'>ویرایش</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(post.id)
                navigate('/')
              }}
              variant='outline-light'
            >
              حذف
            </Button>
            <Link to='/'>
              <Button variant='outline-light'>بازگشت</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown className='post'>{post.markdown}</ReactMarkdown>
    </>
  )
}

export default Post
