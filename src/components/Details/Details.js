import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAuthor } from "../../api/authorService"
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
                console.log(result)
                setArtwork(result)
            })
    }, [artworkId])

    const isOwner = artwork._ownerId === userId
    let softwareUsed = artwork.software

    const [author, setAuthor] = useState("Name")
    useEffect(()=>{
         getAuthor(artworkId) 
        .then(result => {
            setAuthor(result.author.email)
        })
    },[])


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
                break;
            case "Clip Studio Paint":
                return "https://upload.wikimedia.org/wikipedia/en/6/66/Clip_Studio_Paint_app_logo.png"
                break;
            default: return "https://www.nicepng.com/png/detail/8-86408_free-download-question-mark-brush-stroke.png"
             
        }
    }

    return (
        <div className="details-container">
            <div className="img-background">
                <img src={artwork.imageUrl} alt="placeholderimg"/>
            </div>
            <aside className="details-info">
                <h2 className="author">Author: {author}</h2>
                {isOwner?  
                    (<div className="buttons">
                        <button className="btn-delete">Delete</button>
                        <button className="btn-edit">Edit</button>
                    </div>): user?
                    (<div className="buttons">
                        <button className="btn-like">Like</button>
                    </div>) : null
                }
                <div className="likes-count">Likes: 100</div>
                

                <div>
                    <h3 className="title">
                        Title: {artwork.title}
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