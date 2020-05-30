import React, {useState} from 'react';
import axios from 'axios';
import './css/Login.css';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post('http://localhost:3000/api/login', payload)
            .then(function (response) {
                if(response.data.code === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page...'
                    }))
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.data.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const redirectToHome = () => {
        props.updateTitle('Home');
        props.history.push('/Home');
    }
    const redirectToRegister = () => {
        props.updateTitle('Signup');
        props.history.push('/Signup'); 

    }

    return(
        <div className="login-card">
            <form>
		<div class="company-name"><span>Job Seekers</span></div>
                <div className="form-group">
                    <div class="box-text"><label htmlFor="exampleInputEmail1">Email address</label></div>
                    <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Email address" 
                       value={state.email}
                       onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <div class="box-text"><label htmlFor="exampleInputPassword1">Password</label></div>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Login</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div>
                <span className="registerText" onClick={() => redirectToRegister()}>Don't have an account? Sign up here</span> 
            </div>
        </div>
    )
}

export default withRouter(LoginForm);