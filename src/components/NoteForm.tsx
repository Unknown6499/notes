//-------------------------Imports-----------------------------------
import React, { FormEvent, useRef, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable'
import {NoteData, Tag} from '../App'
import {v4 as uuidV4} from 'uuid'
//------------------types-----------------------
type NoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags:Tag[]
} & Partial<NoteData>

//-------------COMPONENT FUNCTION------------
const NewForm: React.FC<NoteProps> = ({ onSubmit,onAddTag,availableTags,title= '', tags=[], markdown='' }) => {
  
  //-----------State and refs-------------
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate();
  //----------submit handler -----------------
  function submitHandler(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags:selectedTags
    })
    navigate('..')
  }
  //-------------returned tsx----------------
  return (
    // ---------------form---------------
    <Form onSubmit={submitHandler}>
      <Stack gap={4}>
        <Row>
          <Col>
             {/* ------- title -------- */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title}/>
            </Form.Group>
          </Col>
          <Col>
             {/* ------- tags --------*/ }
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                isMulti
                onCreateOption={label =>{
                const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                setSelectedTags(prev => [...prev, newTag] )}}
                value={selectedTags.map((tag) => {
                  return {
                    label: tag.label,
                    id: tag.id,
                  };
                })}
                options={availableTags.map(tag => {
                  return {label:tag.label, id:tag.id}
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.id };
                    })
                  );
                }}
 
              />
            </Form.Group>
          </Col>
        </Row>
        <Col>
           {/* ------- body -------- */}
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control required as="textarea" ref={markdownRef} rows={15} defaultValue={markdown} />
          </Form.Group>
        </Col>

        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NewForm