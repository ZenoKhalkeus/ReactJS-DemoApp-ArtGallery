import {useState} from "react"
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";

export const Register = ({}) => {

    const [error, setError] = useState()
    const { onRegisterSubmit } = useAuthContext();
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

    const blurEmailHandler = () =>{
      
        if(!values.email){
            setError("You can't have empty fields!")
        }else if(!regex.test(values.email)){
            setError("This is not a valid email format!")
        }else{
            setError("")
        }
    }
    const blurPasswordHandler = () =>{
      if(!values.email){
        setError("You can't have empty fields!")
      }else if(!regex.test(values.email)){
        setError("This is not a valid email format!")
      }else if(!values.password){
            setError("You can't have empty fields!")
        }else if(values.password.length < 5){
            setError("Password must contain at least 5 characters!")
        }else if(values.password !==values.confirmPassword){
            setError("Passwords must match")
        }else{
            setError("")
        }
    }

    const onClick = (e) =>{
      e.preventDefault()
      if(error==="undefined" || error ==="" && values.password === values.confirmPassword && values.password!==""){
        onSubmit(e)
      }else{
        blurPasswordHandler()
        return
      }
    }

    return (
    <section id="register">
        <div className="form">
          <h2>Register</h2>
          <form className="login-form" method="POST" onSubmit={onSubmit}>
            <input
              type="text"
              name="email"
              id="register-email"
              placeholder="email"
              value = {values.email}
              onChange={changeHandler}
              onBlur = {blurEmailHandler}
            />
            <input
              type="password"
              name="password"
              id="register-password"
              placeholder="password"
              value = {values.password}
              onChange={changeHandler}
              onBlur = {blurPasswordHandler}
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              placeholder="repeat password"
              value = {values.confirmPassword}
              onChange={changeHandler} 
              onBlur = {blurPasswordHandler}
            />
            <p className="error-field">{error}</p>
            <button type="submit" onClick={onClick}>register</button>
            <p className="message">Already registered? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </section>
      )
}