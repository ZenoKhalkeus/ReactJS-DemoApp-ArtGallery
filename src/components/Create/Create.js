import { useArtworkContext } from "../../contexts/ArtworkContext"
import { useForm } from "../../hooks/useForm"

import {useState, useEffect} from "react"

export const Create = () => {

    const {onCreateSubmit} = useArtworkContext()
    const {values, changeHandler, onSubmit} = useForm({
        title: '',
        summary: '',
        imageUrl: '',
        software: ''
    },onCreateSubmit)

   const [error, setError] =  useState()


    const onClick = (e) =>{
        e.preventDefault()
        
        if(!values.title || !values.summary || !values.imageUrl || !values.software){
            setError("You can't have empty fields!")
            return
        }else{
            onSubmit(e)
        }
        
    
        
    }

    return (
        <section id="create">
        <div class="form create" method="post" onSubmit={onSubmit}>
          <h2>Add an artwork</h2>
          <form class="create-form">
            <p class="form-info">Title</p>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Lady with a pearl earring"
              value={values.title} 
              onChange={changeHandler}
            />
            <p class="form-info">Summary</p>
            <input
              type="text"
              name="summary"
              id="summary"
              placeholder="Summary of the piece"
              value={values.summary} 
              onChange={changeHandler}
            />
            <p class="form-info">Image Url</p>
            <input
              type="text"
              name="imageUrl"
              id="img-background"
              placeholder="www.lorem.lorem.png"
              value={values.imageUrl} 
              onChange={changeHandler}
            />
            <p class="form-info">Software used</p>
            <input
              type="text"
              name="software"
              id="software"
              placeholder="Photoshop"
              value={values.software} 
              onChange={changeHandler}
            />
            <p className="error-field">{error}</p>
            <button type="submit" onClick={onClick}>Upload</button>
          </form>
        </div>
      </section>
    )
}