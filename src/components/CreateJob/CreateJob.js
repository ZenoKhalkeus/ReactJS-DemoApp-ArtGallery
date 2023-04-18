import './CreateJob.css';
import { useJobContext } from "../../contexts/JobContext"
import { useForm } from "../../hooks/useForm"

import {useState, useEffect} from "react"

export const CreateJob = () => {

    const {onCreateSubmit} = useJobContext()
    const {values, changeHandler, onSubmit} = useForm({
        name: '',
        email: '',
        position: '',
        salary: '',
        logo: '',
        description: '',
        requirements: ''
    },onCreateSubmit)

   const [error, setError] =  useState()

   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

    const onClick = (e) =>{
        e.preventDefault()
        
        if(!values.name || !values.email || !values.position || !values.salary || !values.logo || !values.description || !values.requirements){
            setError("You can't have empty fields!")
            return
        }else if(!regex.test(values.email)){
            setError("This is not a valid email format!")
            return
        }else{
            onSubmit(e)
        }
        
    
        
    }

    return (
        <section id="register">
        <div className="form job-form" method="post" onSubmit={onSubmit}>
          <h2 id="create-job">Create Job Offer</h2>
          <form className="login-form">
            <div className="jobForm-input">
            <div>
                <p className="job-create-info">Company Name</p>
                <input
              type="text"
              name="name"
              id="name"
              placeholder="Name of your company"
              value={values.name} 
              onChange={changeHandler}
            />
            </div>
            <div>
                <p className="job-create-info">Company Logo</p>
             <input
              type="text"
              name="logo"
              id="logo"
              placeholder="Logo of your company - e.g. .png link"
              value={values.logo} 
              onChange={changeHandler}
            />
            </div>
            <div>
                <p className="job-create-info">Job Title</p>
                <input
              type="text"
              name="position"
              id="position"
              placeholder="Job position"
              value={values.position} 
              onChange={changeHandler}
            />
            </div>
            <div>
                <p className="job-create-info">Salary</p>
                <input
              type="text"
              name="salary"
              id="salary"
              placeholder="20000$"
              value={values.salary} 
              onChange={changeHandler}
            />
            </div>

            <div>
                <p className="job-create-info">Company Email</p>
                <input
              type="text"
              name="email"
              id="email"
              placeholder="Email of your company"
              value={values.email} 
              onChange={changeHandler}
            />
            </div>
            
            
            
            </div>
            <label for="description">Job Description</label>

            <textarea id="job-description" name="description" rows="7" cols="5" value={values.description} 
              onChange={changeHandler}>
            
            </textarea>
            <label for="requirements">Job requirements:</label>

            <textarea id="job-description" name="requirements" rows="7" cols="5" value={values.requirements} 
              onChange={changeHandler}>
            
            </textarea>
            <p class="error-field">{error}</p>
            <button type="submit" onClick={onClick}>submit</button>
          </form>
        </div>
      </section>
    )
}