import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App'; // Ensure you import your App component
import Test from './pages/test'; // Ensure you import your Test component
import store from './store'; // Ensure you import your Redux store
import Home from "./pages/home"; 

// Define NotFound component
const NotFound = () => <div>Page Not Found</div>;

const AppRouter = () => (
  <BrowserRouter>
    <div style={styles.container}>
      <nav className="relative bg-blue-500 text-white ">
        <ul className="flex space-x-4">
          <li className="relative text-red-500 mr-5">
            <Link to="/">Home</Link>
          </li>
          <li className="relative text-red-500 mr-5">
            <Link to="/test">Test</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    
  </BrowserRouter>
);

// Styles for the container
const styles = {
  container: {
    display: "flex",
    marginBottom: "100px", // Removed !important as it's not valid in JS
    justifyContent: "space-evenly",
    position: "relative",
    flexDirection: "column", // Changed 'direction' to 'flexDirection'
    top: 0,
    overflow: "hidden",
    backgroundColor: "black",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    transition: "background-color 0.3s ease-in-out",
    paddingBottom: "5rem",
  },
};

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);