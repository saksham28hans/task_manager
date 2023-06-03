import React, { useContext, useEffect, useRef,useState } from 'react';
import notesContext from '../context/notes/notesContext';
import AddNote from './AddNote';
import NotesItem from './NotesItem';
import alertContext from '../context/Alert/alertContext';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    const context = useContext(notesContext);
    const { notes, getNotes,editNote } = context;
    const alcontext = useContext(alertContext);
    const { showAlert } = alcontext;
    const [note, setnote] = useState({id:"",title:"",description: "",completed:""});
    const navigate = useNavigate();
    useEffect(() => {
        // if(localStorage.getItem('token'))
        // {
        // getNotes();
        // }
        // else
        // {
        //    navigate("/login");
        // }
        getNotes();
    }, []);
    const ref = useRef();
    const refClose = useRef();
    const handleClick = (e)=>{
        e.preventDefault();
        editNote(note._id,note.title,note.description,note.completed);
        refClose.current.click();
       showAlert("Note Updated Successfully",'success')
    }

    const onChange = (e)=>
    {
        setnote({...note, [e.target.name]:e.target.value})
    }
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote(currentNote);
    }
    return (
        <>
            <AddNote showAlert={showAlert}/>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                        <form>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value ={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value ={note.description} onChange={onChange}/>
                </div>
            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <h2>Your Tasks</h2>
                <div className="container">
                {notes.length===0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <NotesItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    );
}

export default Notes;
