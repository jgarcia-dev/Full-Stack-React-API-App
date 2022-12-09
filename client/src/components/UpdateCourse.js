import React, { useState, useEffect, useContext } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import apiRequest from '../utilities/apiRequest';

const UpdateCourse = () => {
    const [courseDetails, setCourseDetails] = useState(null);
    const [hasFetchError, setHasFetchError] = useState(null);
    const [validationErrors, setValidationErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const { authenticatedUser, userMatchesCookie } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/courses/${id}`);
                if (res.status !== 200) {
                    throw new Error(`Fetch failed, status: ${res.status}`);
                }
                const courseData = await res.json();
                setCourseDetails(courseData);
                setHasFetchError(null);
            } catch (err) {
                setHasFetchError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourseDetails();
    }, [id]);

    const handleChange = (e) => {
        setCourseDetails({
            ...courseDetails,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authenticatedUser && userMatchesCookie()) {
            try {
                const credentials = {
                    username: authenticatedUser.emailAddress,
                    password: authenticatedUser.password
                }

                const res = await apiRequest(`/courses/${id}`, "PUT", courseDetails, true, credentials);
                
                if (res.status === 204) {
                    console.log("Course Updated")
                } else {
                    const failedResponse = await res.json();
                    setValidationErrors(failedResponse.errors);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            navigate("/signOut");
        }
    }

    const handleCancel = () => {
        navigate(`/courses/${id}`);
    }

    const renderAnyValidationErrors = () => {
        if (validationErrors.length > 0) {
            return (
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    {validationErrors.map((error, index) => <li key={index}>{error}</li>)}
                </div>
            )
        } else return null;
    }

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            { isLoading
                ? <p>...Loading</p>
                :  hasFetchError
                    ? <Navigate replace to="*" />
                    : <>
                    {renderAnyValidationErrors()}  
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input 
                                    id="courseTitle" 
                                    name="title" 
                                    type="text" 
                                    value={courseDetails.title || ""}
                                    onChange={handleChange}
                                />
                                <p>{`By ${courseDetails.user.firstName} ${courseDetails.user.lastName}`}</p>
                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea 
                                    id="courseDescription" 
                                    name="description" 
                                    value={courseDetails.description || ""}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input 
                                    id="estimatedTime" 
                                    name="estimatedTime" 
                                    type="text"
                                    value={courseDetails.estimatedTime || ""}
                                    onChange={handleChange}
                                />
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea 
                                    id="materialsNeeded" 
                                    name="materialsNeeded"
                                    value={courseDetails.materialsNeeded || ""}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <button className="button">Update Course</button>
                        <button className="button button-secondary" type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </>
            }
        </div>
    )
}

export default UpdateCourse;