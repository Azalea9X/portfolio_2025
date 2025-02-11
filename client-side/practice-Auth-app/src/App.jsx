import React, { useState, useEffect } from 'react';
import TaskList from "./components/TaskList";
import axios from "axios"; 
// Import Bootstrap CSS and JS
import { 
  Container, Button, InputGroup, FormControl
} from 'react-bootstrap'; 
import "./output-final.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [user, setUser] = useState({ email: '', tel: '' }); 

  const updateUser = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value
    });
    
  };


  console.log(user);
  useEffect(() => {
    alert(window.innerWidth);
  }, []);
  const registerUser = async (e) => {
    e.preventDefault();
    // Registration logic here
    try {
      const response = {
        email: user.email,
        telephone: user.tel,
      };
      
      const options = {
        headers: { 'Content-Type': 'application/json' },
      };

      console.log('Sending data:', response); // Log the data being sent await axios.post('http://localhost:8000/register', response, options);
      //Send the response

      console.log('Server response:', response.data); // Log the server response
      await axios.post('http://localhost:8000/register', response, options);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
      } else {
        // Something else happened in setting up the request
        console.error('Error message:', error.message);
      }
      alert('Failed to register user, please try again.');
    }
  };
  


  const isSmallScreen = window.innerWidth < 1000;


  return (
    <div>
      <Container className="col col-lg-12 col-md-12 col-sm-12 relative sm:top-[5rem] left-[-13rem] md:top-[-2rem] left-[-10%] lg:top-[-3rem] left-[1.5%]">
        <div className="app text-center relative sm:min-w-[600px] md:min-w-[600px] left-[14rem] top-[-8rem] lg:min-w-[900px] left-[18rem] xl:left-[23rem] 2xl:left-[26rem]" style={{
          marginTop: window.innerWidth < 768 ? '100px' : '200px',
          padding: '20px',
          background: 'white',
          color: 'black', 
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',     
          fontFamily: "'Poppins', sans-serif',",
          fontSize: window.innerWidth < 768 ? '20px' : '30px',
          position: 'relative', 
          transform: window.innerWidth < 768 ? 'translateX(-30%)' : 'translateX(-30%)',
        }}>
          Test application for appwrite       
        </div>

        <h2 className="relative md:left-[5rem]">Sign up for our app.</h2>
     
          <form onSubmit={registerUser} action="http://localhost:8000/register"  method="POST">
            <input 
              type="email" 
              id="email"
              name="email"
              className="form-control relative sm:min-w-[300px] max-w-[600px] md:left-[5rem]" 
              placeholder="Email" 
              aria-label="Email" 
              aria-describedby="basic-addon"
              onChange={updateUser}
              value={user.email}
            /><br />
            <input 
              type="tel" 
              id="tel"
              name="tel"
              className="form-control relative sm:min-w-[300px] max-w-[600px] md:left-[5rem]" 
              placeholder="Telephone number" 
              aria-label="Telephone number" 
              aria-describedby="basic-addon"
              onChange={updateUser}
              value={user.tel}
            />
            <label>
              <input type="checkbox" required/>
              I agree to the terms and conditions
            </label><br />
            <Button type="submit"

              variant="primary" 
              className="btn mt-4 btn-primary relative md:left-[5rem]" 
              style={{
                padding: '10px 20px',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Sign up
            </Button>
          </form>
       
        <hr />
        <div className="link-container">
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <img src="https://play.google.com/intl/en_us/badges/static/images/badge.png" alt="logo" />
          </a>
          <a href="https://apple.com/store" target="_blank" rel="noopener noreferrer">
          

<img 
  style={{
    height: isSmallScreen ? "40px" : "100px",
    width: isSmallScreen ? "40px" : "60px",
  }} 

  className="max-w-[50px] max-h-[50px]"
  src="https://cdn.pixabay.com/photo/2022/09/18/18/40/apple-logo-7463795_1280.png" 
  alt="logo" 
/>
          </a>
        </div>
      </Container>
    </div>    
  );
}

export default App;