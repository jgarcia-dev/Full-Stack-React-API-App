import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { UserContext } from '../context/UserContext';
import apiRequest from '../utilities/apiRequest';


/**
 * Component retrieves course details from REST API.
 * Renders course detail and Return to List action buttons.
 * Renders Update and Delete action buttons if user is authenticated.
 */
const CourseDetail = () => {
    const [courseDetails, setCourseDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id : courseId } = useParams();
    const { authenticatedUser, userMatchesCookie } = useContext(UserContext);
    const navigate = useNavigate();

    /**
     * Fetches course details and sets data in state.
     * Sets loading state status.
     * Handles errors with redirect to appropriate error page.
     */
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/courses/${courseId}`);
                if (res.status === 200) {
                    const coursesData = await res.json();
                    setCourseDetails(coursesData);
                } else {
                    navigate("/notfound");
                }
            } catch (err) {
                console.log(err);
                navigate("/error");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCourses();
    }, [courseId, navigate]);


    /**
     * Sends request to delete course to REST API.
     * Redirects to home page on success.
     * Handles errors with redirect to appropriate error page.
     */
    const handleDelete = async () => {
        try {
            const credentials = {
                username: authenticatedUser.emailAddress,
                password: authenticatedUser.password
            }
            const res = await apiRequest(`/courses/${courseId}`, "DELETE", null, true, credentials);
            if (res.status === 204) {
                navigate("/");
            } else if (res.status === 500) {
                navigate("/error");
            } else if (res.status === 401) {
                navigate("/forbidden");
            }
            else {
                navigate("/notfound");
            }
        } catch (err) {
            console.log(err);
            navigate("/error");
        }
    }

    /**
     * Checks if user is authenticated.
     * @returns {JSX.Element|null} JSX for displaying action buttons if user is authentication, else returns null.
     */
    const renderActionButtons = () => {
        if (authenticatedUser) {
            if (userMatchesCookie()) {
                if (authenticatedUser.id === courseDetails.userId) {
                    return (
                        <>
                            <Link className="button" to={`/courses/${courseId}/update`}>Update Course</Link>
                            <button className="button" onClick={handleDelete}>DeleteCourse</button>
                        </>
                    )
                }
            }
        }
        
        return null;
    }

    return (
        <>
            <div className="actions--bar">
                <div className="wrap">
                    { renderActionButtons() }
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            <div className="wrap">
                <h2>Courses Detail</h2>
                <form action="">
                    <div className="main--flex">
                        { isLoading
                            ? <p>Loading...</p>
                            : <>
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{ courseDetails.title }</h4>
                                    <p>By { courseDetails.user.firstName + " " + courseDetails.user.lastName }</p>
                                    { courseDetails.description 
                                        ?  <ReactMarkdown children={courseDetails.description}/>   
                                        : <p>No Description</p>
                                    }
                                </div>
                                <div>
                                    { courseDetails.estimatedTime
                                        ? <>
                                            <h3 className="course--detail--title">Estimated Time</h3>
                                            <p>{ courseDetails.estimatedTime }</p>
                                        </> 
                                        : null
                                    }
                                    { courseDetails.materialsNeeded
                                        ? <>
                                            <h3 className="course--detail--title">Materials Needed</h3>
                                            <ReactMarkdown children={courseDetails.materialsNeeded} className="course--detail--list" />
                                        </>
                                        : null
                                    }
                                </div>
                            </>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default CourseDetail;