//-------------------IMPORTS-------------
import './App.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useLocalStorage } from './utils/useLocalStorage';
import NewNote from './components/NewNote';
import NoteList from './components/NoteList';
import Note from './components/Note';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { useMemo } from 'react';
import {v4 as uuidV4} from 'uuid'
import NotesLayout from './components/NotesLayout';
import EditNote from './components/EditNote';

// --------EXPORTS--------------
export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string
 } & RawNoteData
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};
// --------------COMPONENT FUNCTION
function App() {

  //-----STATES, FUNCTIONS AND ALL OTHER USED IN COMPONENT--------
  // -------------------------------------------------------------
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note =>{
      return {...note, tags: tags.filter(tag=> note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data}: NoteData) {
    setNotes(prevNote => {
      return [...prevNote, { ...data, id:uuidV4(), tagIds:tags.map(tag => tag.id)}]
    })
  }  

  function addTag(tag: Tag) {
    setTags(prev=> [...prev, tag])
  }
  function onUpdateNote(id:string,{ tags, ...data}: NoteData ) {
   setNotes((prevNote) => {
     return prevNote.map(note => {
       if (note.id === id) {
         return {
           ...note, ...data, tagIds: tags.map((tag) => tag.id)
         }} else {
         return note;
       }
     })
   });
  }
  function onDeleteNote(id: string) {
    setNotes(prevNote => {
      return prevNote.filter(note => note.id!== id)
    })
  }

  function onUpdateTag(id: string, label:string) {
    setTags(prev => {
      return prev.map(tag => {
        if (tag.id === id) {
          return {...tag, label}
        } else {
          return tag;
        }
      })
    })
  }
  function onDeleteTag(id: string) {
    setTags(prev => {
      return prev.filter(tag => tag.id !== id)
    })
  }
  // -----------ROUTES-------------
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <NoteList availableTags={tags} notes={notesWithTags} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} />,
    },
    {
      path: "/new",
      element: (
        <NewNote
          onSubmit={onCreateNote}
          onAddTag={addTag}
          availableTags={tags}
        />
      ),
    },
    {
      path: "/:id",
      element: <NotesLayout notes={notesWithTags} />,
      children: [
        {
          index: true,
          element: <Note onDelete={onDeleteNote} />,
        },
        {
          path: "edit",
          element: (
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          ),
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);


  // ---------------TSX CODE---------------
  return (
    <Container className='my-4'>
      <RouterProvider router={routes} />
    </Container>
  );
}

export default App
