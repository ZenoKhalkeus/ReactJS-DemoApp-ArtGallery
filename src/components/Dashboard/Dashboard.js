import './Dashboard.css';

import { useArtworkContext } from "../../contexts/ArtworkContext"

import { Link } from 'react-router-dom'
import { SingularArtwork } from '../SingularArtwork/SingularArtwork';

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
                <SingularArtwork key={x._id} {...x} />
            )}
            
        </div>
            
    )
}