import React from 'react'
import NewForm from './NoteForm';
import { NoteData,Tag } from '../App';
type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags:Tag[]
}
const NewNote:React.FC<NewNoteProps> = ({onSubmit, onAddTag, availableTags}) => {

  return (
    <>
      <div className="mb-4">NewNote</div>
      <NewForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default NewNote