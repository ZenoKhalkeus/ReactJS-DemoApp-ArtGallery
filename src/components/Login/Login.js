import './Login.css';

import { Link } from "react-router-dom";
import {useState} from "react"


import { useForm } from "../../hooks/useForm"
import { useAuthContext } from "../../contexts/AuthContext";

const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export const Login = ({
}) => {

    const {onLoginSubmit} = useAuthContext()
    
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const [error, setError] = useState()
    const blurEmailHandler = () =>{
        if(!values[LoginFormKeys.Email]){
            setError("You can't have empty fields!")
        }else if(!regex.test(values[LoginFormKeys.Email])){
            setError("This is not a valid email format!")
        }else{
            setError("")
        }
    }
    const blurPasswordHandler = () =>{
        if(!values[LoginFormKeys.Password]){
            setError("You can't have empty fields!")
        }else if(values[LoginFormKeys.Password].length < 5){
            setError("Password contains at least 5 characters!")
        }else{
            setError("")
        }
    }
    return (
             
        <section id="login">
                <div className="form" >
                  <h2>Login</h2>
                  <form className="login-form" method="POST" onSubmit={onSubmit}>
                    <input 
                    type="text" name="email" id="email" placeholder="email" 
                    value = {values[LoginFormKeys.Email]}
                    onChange={changeHandler}
                    onBlur = {blurEmailHandler}/>
                    
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
                      value = {values[LoginFormKeys.Password]}
                      onChange={changeHandler}
                      onBlur = {blurPasswordHandler}
                    />
                    <p className="error-field">{error}</p>
                    <button type="submit">login</button>
                    <p className="message">
                      Not registered? <Link to="/register">Create an account</Link>
                    </p>
                  </form>
                </div>
              </section>
    );
}

