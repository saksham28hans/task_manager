import { useState } from "react";
import notesContext from "./notesContext";
import axios from "axios";

const NotesState = (props) => {
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
    const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial);


    //Add a Note
    const addNote = async (title,description)=>{
     //API Call to add a note
     const response = await axiosInstance.post(`notes/addnote`,{title,description}, {       
        headers: {
          'auth-token' : localStorage.getItem('token')
        },
      });
      // const note = await response.json(); // parses JSON response into native JavaScript objects
      //console.log(json);
     setnotes(notes.concat(response.data));
    }

    //Delete a Note
    const deleteNote = async (id)=>{
    //API Call to delete a note
    const response = await axiosInstance.delete(`notes/deletenote/${id}`, {
        headers: {
          'auth-token' : localStorage.getItem('token')
        },
      });
    const newNotes = notes.filter((note)=>{return note._id !== id});
    setnotes(newNotes);
    }

    //Update a Note
    const editNote = async (id,title,description,completed)=>{
        //API Call to edit note
        console.log("He;;");
        const response = await axiosInstance.put(`notes/updatenote/${id}`,{title,description,completed}, {       
            headers: {
              'auth-token' : localStorage.getItem('token')
            },
          });

        const newNotes = await JSON.parse(JSON.stringify(notes));
        console.log(newNotes);
        for(let index =0;index<newNotes.length;index++)
        {
            if(newNotes[index]._id === id)
            {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].completed = completed;
                break;
            }
        }
        setnotes(newNotes);

    }

       //GetNotes a Note
       const getNotes = async ()=>{
        //API Call to delete a note
        const response = await axiosInstance.get(`notes/fetchallnotes`, {          
            headers: {
              'auth-token' : localStorage.getItem('token')
            },
          });
        setnotes(response.data);
        }

    return (
        <notesContext.Provider value={{ notes, addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </notesContext.Provider>
    )


}

export default NotesState;