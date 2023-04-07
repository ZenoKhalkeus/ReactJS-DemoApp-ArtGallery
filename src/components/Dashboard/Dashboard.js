import { useArtworkContext } from "../../contexts/ArtworkContext"
import { SingularItem } from "./SingularArtwork"

import { Link } from 'react-router-dom'

export const Dashboard = () => {
    const { artworks } = useArtworkContext()

    return (
        <div className="grouped-container">
            {artworks.length === 0 && (
                <section className="no-content">
                <h2>No content</h2>
                <h4>Upload one <Link to="/create">here</Link></h4>
                </section>
            )}
            {artworks.map(x =>
                <SingularItem key={x._id} {...x} />
            )}
            
        </div>
            
    )
}