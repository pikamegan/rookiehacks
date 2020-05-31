import React, {useState} from 'react';
import axios from 'axios';
import './css/Signup.css';
import { withRouter } from "react-router-dom";

function SignupForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
            }
            axios.post('http://localhost:3000/API/v1/users/signup', payload)
                .then(function (response) {
                    if(response.data.code === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Sign up successful. Redirecting to home page..'
                        }))
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToHome = () => {
        props.updateTitle('Home');
        props.history.push('/Home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login');
        props.history.push('/Login'); 

    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }

    return(	
        <div className="signup-card">
            <form>
		<div class="company-name"><span>Job Seekers</span></div>
                <div className="form-group">
                    <div class="box-text"><label htmlFor="exampleInputEmail1">Email address</label></div>
                    <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email address" 
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group">
                    <div class="box-text"><label htmlFor="exampleInputPassword1">Password</label></div>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Create password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <div class="box-text"><label htmlFor="exampleInputPassword1">Confirm Password</label></div>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn-primary"
                    onClick={handleSubmitClick}
                >Sign Up</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div>
                <span className="loginText" onClick={() => redirectToLogin()}>Already have an account? Login here</span> 
            </div>     
        </div>
    )
}

export default withRouter(SignupForm);
