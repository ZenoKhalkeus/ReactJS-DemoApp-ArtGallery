import './JobDashboard.css';

import { useJobContext } from "../../contexts/JobContext"

import { Link } from 'react-router-dom'
import { SingularJob } from './SingularJob';


export const JobDashboard = () => {
    const { jobs } = useJobContext()

    return (
        <div className="grouped-job-container">
            {jobs.length === 0 && (
                <section className="no-content">
                <h2>No content</h2>
                <h4>Upload one <Link to="/create">here</Link></h4>
                </section>
            )}
            {jobs.map(x =>
                <SingularJob key={x._id} {...x} />
            )}
            
        </div>
            
    )
}