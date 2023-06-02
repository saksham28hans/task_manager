import React, {useContext} from 'react';
import notesContext from '../context/notes/notesContext';
import alertContext from '../context/Alert/alertContext';
import './NotesItem.css'
const NotesItem = (props) => {
    const context = useContext(notesContext);
    const { deleteNote,editNote } = context;
    const { note,updateNote } = props;
    console.log(note);
    const alcontext = useContext(alertContext);
    const { showAlert } = alcontext;
    return (
            <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <span className="card-title title" style={{marginBottom:'0px'}}>{note.title}</span>
                    <i className="fa-solid fa-trash-can" style={{color : 'red', cursor:'pointer',marginLeft:'10%'}} onClick={()=>{deleteNote(note._id); showAlert("Note Deleted Successfully",'success')} }></i>
                    <i className="fa-solid fa-pen-to-square" style={{color : 'blue', cursor:'pointer',marginLeft:'5%'}}  onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text" style={{marginTop:'5%'}}>{note.description}</p>
                    <div className="check_text">
                    <input type='checkbox' checked={note.completed} onChange={()=>{editNote(note._id,note.title,note.description,!note.completed)}}/>
                    <span className='comp_text'>Mark as completed</span>
                    </div>
                    {note.completed && <span className="topbarIconBadge">Completed</span>}
                    {!note.completed && <span className="topbarIconBadge_red">Pending</span>}
                </div>
            </div>
            </div>
    );
}

export default NotesItem;
