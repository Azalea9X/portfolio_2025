import React from 'react';

import TaskList from "./components/TaskList";
import cors from "cors"; 

// Import Bootstrap CSS and JS
import { 
  Container, Button, InputGroup, FormControl
} from 'react-bootstrap'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import "./output-final.css"; 

const App = () => {
  {alert(window.innerWidth)}
  return (
    <div>
    <Container className="">
    <div className="app text-center relative sm:min-w-[600px] md:min-w-[600px] left-[14rem] top-[-8rem] lg:min-w-[900px] left-[18rem] xl:left-[23rem] 2xl:left-[26rem]" style={{
      marginTop: window.innerWidth < 768? '100px' : '200px',
      padding: '20px',
      background: 'white',
      color: 'black', 
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', 
      fontFamily: "'Poppins', sans-serif',",
      fontSize: window.innerWidth < 768? '20px' : '30px',
      position: 'relative', 
      
      transform: window.innerWidth < 768? 'translateX(-30%)' : 'translateX(-30%)',
    }}>
        <h1 className="app__title " >ToDo App</h1>
   
        <TaskList style={{
         }} />

      </div>
    </Container>
    </div>
  );
};

export default App;
