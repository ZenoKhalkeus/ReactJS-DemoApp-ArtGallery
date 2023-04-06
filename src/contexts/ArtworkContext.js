import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { serviceFactory } from '../api/data';

export const ArtworkContext = createContext();

export const ArtworkProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [artworks, setArtworks] = useState([]);
    const artService = serviceFactory();

    useEffect(() => {
        artService.getAll()
            .then(result => {
                setArtworks(result)
            })
    }, []);

    

    const getArtwork = (artworkId) => {
        return artworks.find(artwork => artwork._id === artworkId);
    };

    const contextValues = {
        artworks,
        getArtwork,
    };

    return (
        <ArtworkContext.Provider value={contextValues}>
            {children}
        </ArtworkContext.Provider>
    );
};

export const useArtworkContext = () => {
    const context = useContext(ArtworkContext);

    return context;
};