import React, { useState } from "react";
import NoteContext from "../notes/noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";

    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {
        // API CALL
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YmFkOWVjNjNhMjVjNzdlNDljN2NmIn0sImlhdCI6MTcwMzY1Mjc4NX0.kT_1SIVWLFsnyAA9X3DbCbCiO4ypV69QvzAnR9UjklU",
                    // "auth-token": localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }

    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YmFkOWVjNjNhMjVjNzdlNDljN2NmIn0sImlhdCI6MTcwMzY1Mjc4NX0.kT_1SIVWLFsnyAA9X3DbCbCiO4ypV69QvzAnR9UjklU",
                // "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
   
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    //Delete a Note
    const deleteNote = async (id) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YmFkOWVjNjNhMjVjNzdlNDljN2NmIn0sImlhdCI6MTcwMzY1Mjc4NX0.kT_1SIVWLFsnyAA9X3DbCbCiO4ypV69QvzAnR9UjklU",
                // "auth-token": localStorage.getItem('token'),
            }
        });
        const json = await response.json();
        console.log(json);

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // TODO API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YmFkOWVjNjNhMjVjNzdlNDljN2NmIn0sImlhdCI6MTcwMzY1Mjc4NX0.kT_1SIVWLFsnyAA9X3DbCbCiO4ypV69QvzAnR9UjklU",
                // "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;