import { useEffect, useState } from "react"

import { useForm } from "../../hooks/useForm";

import { serviceFactory } from "../../api/data"
import { SingularItem } from "./SingularItem"
import { useService } from "../../hooks/useService"

export const Search = () => {

    const [searchResult, setSearch] = useState([])
    const [error, setError] = useState()

    const artworkService = useService(serviceFactory)
    


    const onSearchSubmit = async (values) => {
        const {search} = values

        if(!search){
            setError("Your input field cannot be empty")
            return
        }else{
            setError("")
        }

        try{
            artworkService.search(search)
                    .then(result => {
                        setSearch(result)
                    })
        }catch(error){
            console.log("error")
        }
            
        
    }

    const { values, changeHandler, onSubmit } = useForm({
        search: '',
    }, onSearchSubmit);


    
    
    return (
        <div className="grouped-container">
             {searchResult.length === 0 && (
                <section className="no-content">
                <h2>No Titles found</h2>
                </section>
            )}
            {searchResult.map(x =>
                <SingularItem key={x._id} {...x} />
            )} 

        <div className="class-form" >
            <form className="search-form" method="POST" onSubmit={onSubmit}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Look for any  title"
              value = {values.search}
              onChange={changeHandler}
            />
            {error && <p className="error-field">{error}</p>}
            <button type="submit" >Search</button>
          </form>
        </div>
            
            
        </div>
            
    )
}