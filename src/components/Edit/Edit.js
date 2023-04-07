import { useArtworkContext } from "../../contexts/ArtworkContext"
import { useForm } from "../../hooks/useForm"
import { useParams } from "react-router-dom"

import { serviceFactory } from "../../api/data"
import { useService } from "../../hooks/useService"

import {useState, useEffect} from "react"

export const Edit = () => {


    const {artworkId} = useParams()
    const [artwork, setArtwork] = useState({})
    const {onEditSubmit} = useArtworkContext()
    const artworkService = useService(serviceFactory)




    const {values, changeHandler, onSubmit, changeValues} = useForm({
        _id: '',
        title: '',
        summary: '',
        imageUrl: '',
        software: ''
    },onEditSubmit)

    useEffect(()=>{
        artworkService.getOne(artworkId)
            .then(result =>{
                setArtwork(result)
                changeValues(result)
            })
    }, [artworkId])

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
            <div className="img-edit">
                <img src={artwork.imageUrl} alt="placeholderimg"/>
            </div>  
        <div className="form create" method="post" onSubmit={onSubmit}>
          <h2>Edit an artwork</h2>
          <form className="create-form">
            <p className="form-info">Title</p>
            <input
              type="text"
              name="title"
              id="title"
              placeholder={artwork.title}
              value={values.title} 
              onChange={changeHandler}
            />
            <p className="form-info">Summary</p>
            <input
              type="text"
              name="summary"
              id="summary"
              placeholder={artwork.summary}
              value={values.summary} 
              onChange={changeHandler}
            />
            <p className="form-info">Image Url</p>
            <input
              type="text"
              name="imageUrl"
              id="img-background"
              placeholder={artwork.imageUrl}
              value={values.imageUrl} 
              onChange={changeHandler}
            />
            <p className="form-info">Software used</p>
            <input
              type="text"
              name="software"
              id="software"
              placeholder={artwork.software}
              value={values.software} 
              onChange={changeHandler}
            />
            <p className="error-field">{error}</p>
            <button type="submit" onClick={onClick}>Edit</button>
          </form>
        </div>
      </section>
    )
}