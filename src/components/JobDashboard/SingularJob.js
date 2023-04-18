import { Link } from "react-router-dom";

export const SingularJob = ({
    _id,
    logo,
    position,
    salary,
}) => {
    

    return (
        
        <div className="job-container">
                <Link to={`/jobcatalog/${_id}`}>
                    <div className="logo"><img src={logo} alt="placeholderimg"/>
                    </div>
                <div className="jobcontent">
                    <p className="position">{position}</p>
                    <p className="salary">{salary}</p>
                </div>
                </Link>
        </div>
    )
}