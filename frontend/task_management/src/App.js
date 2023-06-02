import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import AlertState from './context/Alert/alertState';
import NotesState from './context/notes/notesState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
function App() {
  return (
 <>
 <div>
   <AlertState>
    <NotesState>
   <Router>
      {/* <Alert/> */}
      {/* <div className="container"> */}
    <Routes>
    <Route exact path ='/' element={<Home/>}/>
      <Route exact path ='/about' element = {<About/>}/>
      <Route exact path ='/login' element = {<Login/>}/>
      <Route exact path ='/signup' element = {<Signup/>}/>
    </Routes>
    {/* </div> */}
   </Router>
   </NotesState>
   </AlertState>
   </div>
 </>
  
  );
}

export default App;
