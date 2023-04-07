import {useState} from 'react'

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues)

    
    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
        
    }

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(values);

        setValues(initialValues);
    };

    const changeValues = (newValues) => {
        // For Edit Form to change the values to the previous ones
        setValues(newValues);
    };
    

    return {
        values,
        changeHandler,
        onSubmit,
        changeValues
    }
}