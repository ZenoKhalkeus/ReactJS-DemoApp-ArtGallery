import { useEffect, useState } from "react"

import { Link } from 'react-router-dom'

import { useAuthContext } from "../../contexts/AuthContext"
import { serviceFactory } from "../../api/data"
import { SingularItem } from "./SingularItem"
import { useService } from "../../hooks/useService"

export const Collection = () => {
    const {userId} = useAuthContext()

    const [ownArtworks, setOwnArtworks] = useState([])

    const artworkService = useService(serviceFactory)


    useEffect(() => {
        artworkService.getOwn(userId)
            .then(result => {
                setOwnArtworks(result)
            })
    }, []);
    
    return (
        <div className="grouped-container">
            {ownArtworks.length === 0 && (
                <section className="no-content">
                <h2>No content</h2>
                <h4>Upload one <Link to="/create">here</Link></h4>
                </section>
            )}
            {ownArtworks.map(x =>
                <SingularItem key={x._id} {...x} />
            )}
            
        </div>
            
    )
}