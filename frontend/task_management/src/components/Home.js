import React from 'react';
import Notes from './Notes';
// import { Navbar } from 'react-bootstrap';
import Navbar from './Navbar';
import Alert from './Alert';
const Home = () => {

    return (
        <>
        <Navbar />
        <Alert />
        <div className="container my-3">
            <Notes />
        </div>
        </>
    );
}

export default Home;