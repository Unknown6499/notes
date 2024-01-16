import React from 'react'
import { useNote } from './NotesLayout'
import { Col, Row,Badge, Stack,Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

type NoteProps = {
  onDelete: (id:string) =>void
 }
const Note:React.FC<NoteProps> = ({onDelete}) => {
    const note = useNote();
    const navigate = useNavigate()
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className=" flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={() => {
              onDelete(note.id)
            navigate('/')}}>Delete</Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}

export default Note