import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import apiRequest from '../utilities/apiRequest';

/**
 * Component renders form for adding a new course.
 * Verifies user authentication before submission.
 * Prompts user of validation errors with submission.
 */
const CreateCourse = () => {
    const [formData, setFormData] = useState({});
    const [responseErrors, setResponseErrors] = useState([]);
    const courseTitleRef = useRef();
    const navigate = useNavigate();
    const { authenticatedUser, userMatchesCookie } = useContext(UserContext);

    useEffect(() => {
        courseTitleRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Verifies user authentication.
     * Sends POST request for new course.
     * Handles errors with redirect to appropriate error page.
     */
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (authenticatedUser && userMatchesCookie()) {
            try {
                const credentials = {
                    username: authenticatedUser.emailAddress,
                    password: authenticatedUser.password
                }
                const courseData = {
                    ...formData,
                    userId: authenticatedUser.id
                }
                const res = await apiRequest("/courses", "POST", courseData, true, credentials);

                if (res.status === 201) {
                    console.log(res.status)
                    navigate("/");
                } else if (res.status === 400) {
                    const failedResponse = await res.json();
                    setResponseErrors(failedResponse.errors);
                } else if (res.status === 401) {
                    navigate("/forbidden");
                } else if (res.status === 500) {
                    navigate("/error");
                } else {
                    navigate("/notfound");
                }
            } catch (err) {
                console.log(err);
                navigate("/error");
            }
        } else {
            navigate("/signOut");
        }
    }

    const handleCancel = (e) => {
        navigate("/");
    }

    /**
     * Gets validation errors.
     * @returns {JSX.Element} JSX for validation errors.
     */
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
                            value={formData.title || ""}
                            onChange={handleChange}
                            ref={courseTitleRef}
                        />
                        <p>{`By ${authenticatedUser.firstName} ${authenticatedUser.lastName}`}</p>
                        <label htmlFor="courseDetailDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input 
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={formData.estimatedTime || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea 
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={formData.materialsNeeded || ""}
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