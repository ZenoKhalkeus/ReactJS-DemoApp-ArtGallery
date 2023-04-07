import { Link } from "react-router-dom";

export const SingularItem = ({
    _id,
    title,
    summary,
    imageUrl,
    software
}) => {
    

    return (
        <div className="img-container">
                <Link to={`/catalog/${_id}`}>
                    <img src={imageUrl} alt="placeholderimg"/>
                <div className="content">
                    <p className="title">{title}</p>
                </div>
                </Link>
            </div>
    )
}