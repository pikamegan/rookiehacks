import React, {useState} from 'react';
import './App.css';
import About from './components/About';
import Blog from './components/Blog';
import Navigation from './components/Navigation';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import Home from './components/Home';
import UserAbout from './components/UserAbout';
import UserAccount from './components/UserAccount';
import UserBlog from './components/UserBlog';
import UserForum from './components/UserForum';
import UserHome from './components/UserHome';
import UserNavigation from './components/UserNavigation';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AlertComponent from './components/AlertComponent';  


function App() {
  const [title , updateTitle] = useState(null);
  const [errorMessage , updateErrorMessage] = useState(null);
    return (      
       <Router>
       <div className = "App">
         <header title={title}/>
          <Navigation/>
            <Switch>
             <Route path="/Home" component={Home}/>
             <Route path="/About" component={About}/>
             <Route path="/Blog" component={Blog}/>
             <Route path="/Signup" render={() => <SignupForm showError={updateErrorMessage} updateTitle={updateTitle}/>}/>
             <Route path="/Login" render={() => <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>}/>
             <Route path="/Home">
               <Home/>
	     </Route>
            <Route path="/" component={Home} exact/>
            </Switch>
             <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
       </div> 
      </Router>
    );
  }


export default App;
