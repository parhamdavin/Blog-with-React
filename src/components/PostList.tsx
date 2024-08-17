import { useState, useMemo } from 'react'
import { Button, Col, Row, Stack, Form, Card, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'

import { Tag, Post } from '../App'

type PostCardProps = {
  tags: Tag[]
  title: string
  id: string
}

type PostListProps = {
  availableTags: Tag[]
  posts: PostCardProps[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

type EditTagsModalProps = {
  show: boolean
  availableTags: Tag[]
  handleClose: () => void
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

function PostList({
  availableTags,
  posts,
  onUpdateTag,
  onDeleteTag,
}: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      return (
        (title === '' ||
          item.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            item.tags.some((postTag) => postTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, posts])

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h2>پست‌ها</h2>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/add'>
              <Button variant='light'>افزودن پست</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant='outline-light'
            >
              ویرایش تگ‌ها
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>عنوان</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='inpout-bg'
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tag'>
              <Form.Label>تگ</Form.Label>
              <ReactSelect
                value={selectedTags.map((item) => {
                  return { label: item.label, value: item.id }
                })}
                options={availableTags.map((item) => {
                  return { label: item.label, value: item.id }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((item) => {
                      return { label: item.label, id: item.value }
                    })
                  )
                }}
                isMulti
                placeholder='انتخاب'
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredPosts.map((item) => (
          <Col key={item.id} className='post-card'>
            <PostCard id={item.id} title={item.title} tags={item.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  )
}

function PostCard({ id, title, tags }: PostCardProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className='h-100 text-reset text-decoration-none card-bg'
    >
      <Card.Body>
        <Stack
          gap={2}
          className='align-items-center justify-content-center h-100'
        >
          <span className='fs-5 text-light'>{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction='horizontal'
              className='justify-content-center flex-wrap'
            >
              {tags.map((tag) => (
                <span className='text-truncate card-tag' key={tag.id}>
                  {tag.label}
                </span>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

function EditTagsModal({
  availableTags,
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose} contentClassName='card-bg'>
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title>ویرایش تگ‌ها</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type='text'
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                    className='modal-tag'
                  />
                </Col>
                <Col xs='auto'>
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant='outline-light'
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default PostList
