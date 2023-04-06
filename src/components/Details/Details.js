import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { serviceFactory } from "../../api/data"

import { useAuthContext } from "../../contexts/AuthContext"
import { useService } from "../../hooks/useService"


export const Details = () => {

    const {userId, isAuthenticated} = useAuthContext()
    const {artworkId} = useParams()
    const [artwork, setArtwork] = useState({})
    const artworkService = useService(serviceFactory)


    let user = Boolean(isAuthenticated)

    useEffect(()=>{
        artworkService.getOne(artworkId)
            .then(result =>{
                setArtwork(result)
            })
    }, [artworkId])

    const isOwner = artwork._ownerId === userId
    let softwareUsed = artwork.software

    function softwarePNG(softwareUsed) {
        switch(softwareUsed) {
            case "Procreate":
            return "https://assets.procreate.art/img/procreate-icon-search-display.png";
              break;
            case "Photoshop":
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/640px-Adobe_Photoshop_CC_icon.svg.png"
                break;
            case "Traditional":
                return "https://www.pngitem.com/pimgs/m/46-466311_paint-brush-png-image-chinese-paint-brush-png.png"
            default: return null
             
        }
    }

    return (
        <div className="details-container">
            <div className="img-background">
                <img src={artwork.imageUrl} alt="placeholderimg"/>
            </div>
            <aside className="details-info">
                <h2 className="author">Author: Name</h2>
                <div className="buttons">
                <button className="btn-like">Like</button>
                <button className="btn-delete">Delete</button>
                <button className="btn-edit">Edit</button>
                <div className="likes-count">Likes: 100</div>
                </div>

                <div>
                    <h3 className="title">
                        {artwork.title}
                    </h3>
                    <h4 className="desc">
                        {artwork.summary}
                    </h4>
                    <h4 className="software">
                        <p>Software used</p>
                        <img src={softwarePNG(softwareUsed)} alt=""/>{softwareUsed}
                    </h4>
                </div>
            </aside>
        </div>
    )

} 