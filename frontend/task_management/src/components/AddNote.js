import React, {useContext,useState} from 'react';
import notesContext from '../context/notes/notesContext';


const AddNote = (props) => {
    const context = useContext(notesContext);
    const { addNote } = context;

    const [note, setnote] = useState({title:"",description: ""});
    const handleClick = (e)=>{
       
        addNote(note.title,note.description);
        setnote({title:"",description: ""});
        props.showAlert("Note Added Successfully","success");
        e.preventDefault();
    }

    const onChange = (e)=>
    {
        setnote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2>Add a Task</h2>
            <form>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control tit" id="title" name="title" onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label ">Description</label>
                    <textarea id="description" className="form-control desc" rows="5" cols="30" name="description" onChange={onChange} value={note.description}></textarea>
                    {/* <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description}/> */}
                </div>
                <button type="submit" className="btn btn-success" onClick={handleClick}>Add a Task</button>
            </form>
    </div>
  );
}

export default AddNote;
