import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import apiRequest from '../utilities/apiRequest';

const CreateCourse = () => {
    const [courseDetails, setCourseDetails] = useState({});
    const [responseErrors, setResponseErrors] = useState([]);
    const courseTitleRef = useRef();
    const navigate = useNavigate();
    const { authenticatedUser } = useContext(UserContext);

    useEffect(() => {
        courseTitleRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setCourseDetails({
            ...courseDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const credentials = {
                username: authenticatedUser.emailAddress,
                password: authenticatedUser.password
            }
            const courseData = {
                ...courseDetails,
                userId: authenticatedUser.id
            }
            const res = await apiRequest("/courses", "POST", courseData, true, credentials);

            if (res.status === 201) {
                navigate("/");
            } else if (res.status === 400) {
                const failedResponse = await res.json();
                setResponseErrors(failedResponse.errors);
            } else {
                console.log('New course request failed');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleCancel = (e) => {
        navigate("/");
    }

    const renderErrors = () => {
        return (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                {responseErrors.map((error, index) => <li key={index}>{error}</li>)}
            </div>
        )
    }

    return (
        <div className="wrap">
            <h2>Create Course</h2>
            {responseErrors.length > 0
                ? renderErrors()
                : null
            }
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input 
                            id="courseTitle"
                            name="title"
                            type="text"
                            value={courseDetails.title}
                            onChange={handleChange}
                            ref={courseTitleRef}
                        />
                        <p>{`By ${authenticatedUser.firstName} ${authenticatedUser.lastName}`}</p>
                        <label htmlFor="courseDetailDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="description"
                            value={courseDetails.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input 
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={courseDetails.estimatedTime}
                            onChange={handleChange}
                        />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea 
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={courseDetails.materialsNeeded}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
                <button className="button" type='submit'>Create Course</button>
                <button className="button button-secondary" type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateCourse;