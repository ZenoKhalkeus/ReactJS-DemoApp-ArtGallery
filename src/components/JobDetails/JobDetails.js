import './JobDetails.css';

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { serviceFactory } from "../../api/data"
import { useNavigate } from "react-router-dom"


import { useAuthContext } from "../../contexts/AuthContext"
import { useService } from "../../hooks/useService"
import { useJobContext } from '../../contexts/JobContext';


export const JobDetails = () => {

    const navigate = useNavigate()
    const {userId, isAuthenticated} = useAuthContext()
    const {deleteJob} = useJobContext()
    const {jobId} = useParams()
    const [job, setJob] = useState({})
    const [applications,setApplications] = useState(0)
   

    const jobService = useService(serviceFactory)

    let user = Boolean(isAuthenticated)

    useEffect(()=>{
        jobService.getOneJob(jobId)
            .then(result =>{
                setJob(result)
            })
    }, [jobId])

    // useEffect(()=>{
    //     artworkService.getNumberOfLikes(artworkId)
    //     .then(result => {
    //         setLikes(result)
    //     })
    // },[likes])

    // useEffect(()=>{
    //     artworkService.getOwnLike(artworkId, userId)
    //     .then(result => {
    //         if(result > 0){
    //             setOwnLike(true)

    //         }
            
    //     })
    // },[likes])

    // const onLike = () =>{
    //     artworkService.like(artworkId)
    //     artworkService.getNumberOfLikes(artworkId)
    //     .then(result => {
    //         setLikes(result)
    //     })
    // }



    const isOwner = job._ownerId === userId

    const onDeleteClick = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Are you sure you want to delete ${job.position} from ${job.name}`);

        if (result) {
            await jobService.deleteJob(jobId);

            deleteJob(jobId);

        }
    };

    function onApply (){
        window.location = `mailto:${email}`
        jobService.apply(jobId).then(
            setApplications(applications+1)
        )

        jobService.getNumberOfApplications(jobId).then(result => {
            setApplications(result)
        })
    }


    function navigateLink () {
        navigate(`/editjob/${jobId}`)
    }

    const email = job.email

    return (
        <div className="job-details-container">
            <div className="company-logo">
                <img src={job.logo} alt="placeholderimg"/>
                <p className="companyName">{job.name}</p>
            </div>
            <div className="job-details-info">
                {isOwner?  
                    (<div className="job-buttons">
                        <button className="job-btn-delete" onClick={onDeleteClick}>Delete</button>
                        <button className="job-btn-edit" onClick={navigateLink}>Edit</button>
                    </div>): user && !isOwner?
                    (<div className="job-buttons">
                        <button className="job-btn-apply" onClick={onApply}>Apply</button>
                    </div>) : null
                }
                <div className="applications-count">Applications: {applications}</div>
                

                <div className="job-info">
                    <h3 class="position-salary">
                        {job.position} - {job.salary}
                    </h3>
                    <h4 className="desc">
                        <p>Job Description</p>
                        {job.description}
                    </h4>
                    <h4 className="requirements">
                        <p>Job Requirements</p>
                        {job.requirements}
                    </h4>
                </div>
            </div>
        </div>
    )

} 