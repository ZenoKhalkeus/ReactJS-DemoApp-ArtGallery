import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { serviceFactory } from '../api/data';


export const JobContext = createContext();

export const JobProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const jobService = serviceFactory();


    useEffect(() => {
        jobService.getAllJobs()
            .then(result => {
                setJobs(result)
            })
    }, []);

    

    const getJob = (jobId) => {
        return jobs.find(job => job._id === jobId);
    };

    const onCreateSubmit = async (data) => {
        try{
            const newJob = await jobService.createJob(data)

            setJobs(state => [...state, newJob])

            navigate('/jobdashboard')
        }catch(error){
            if(error.code==401){
                alert("Unauthorized access")
            }else{
                alert("Server is unavailable. Please try again later!")
            }
        }
    }

    const onEditSubmit = async(values) =>{
        try{
            const result = await jobService.editJob(values._id, values);

            setJobs(state => state.map(x => x._id === values._id ? result : x))

            navigate(`/jobcatalog/${values._id}`)
        }catch(error){
            if(error.code==403){
                alert("Unauthorized access")
            }else{
                alert("Server is unavailable. Please try again later!")
            }
        }
    }

    const deleteJob = (jobId) => {
        setJobs(state => state.filter(job => job._id !== jobId));
        navigate('/jobdashboard')
    };

    const contextValues = {
        jobs,
        getJob,
        onCreateSubmit,
        deleteJob,
        onEditSubmit

    };

    return (
        <JobContext.Provider value={contextValues}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobContext = () => {
    const context = useContext(JobContext);

    return context;
};