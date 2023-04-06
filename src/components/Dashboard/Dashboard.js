import { useArtworkContext } from "../../contexts/ArtworkContext"
import { SingularItem } from "./SingularArtwork"

export const Dashboard = () => {
    const { artworks } = useArtworkContext()

    return (
        <div className="grouped-container">
            {artworks.length === 0 && (
                <section className="no-content">
                <h2>No content</h2>
                <h4>Upload one <a href="/">here</a></h4>
                </section>
            )}
            {artworks.map(x =>
                <SingularItem key={x._id} {...x} />
            )}
            
        </div>
            
    )
}