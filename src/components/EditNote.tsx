import React from "react";
import NewForm from "./NoteForm";
import { NoteData, Tag } from "../App";
import { useNote } from "./NotesLayout";
type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};
const EditNote: React.FC<EditNoteProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
}) => {
    const note = useNote()
  return (
    <>
      <div className="mb-4">Edit Note</div>
          <NewForm
              title={note.title}
              tags={note.tags}
              markdown={note.markdown}
        onSubmit={data => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default EditNote;
