/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import {Note} from '../App'
import { Outlet, Navigate, useOutletContext, useParams } from 'react-router-dom'
type NoteLayoutProps ={
notes:Note[]
}
const NotesLayout:React.FC<NoteLayoutProps> = ({notes}) => {
    const { id} = useParams()
    const note = notes.find(n => n.id === id);
    if(note === null ) <Navigate to='/' replace/>
    return <Outlet context={note} />
}

export default NotesLayout
export function useNote(){
    return useOutletContext<Note>()
}