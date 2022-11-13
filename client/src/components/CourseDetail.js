import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { UserContext } from '../context/UserContext';
import NotFound from './NotFound';

const CourseDetail = () => {
    const [courseDetails, setCourseDetails] = useState([]);
    const [errorFetching, setErrorFetching] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const { authenticatedUser } = useContext(UserContext);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/courses/${id}`);
                if (res.status !== 200) {
                    throw Error (`Data not received, error: ${res.status}`);
                }
                const coursesData = await res.json();
                setCourseDetails(coursesData);
                setErrorFetching(null);
            } catch (err) {
                setErrorFetching(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCourses();
    }, []);

    return (
        <>
            <div className="actions--bar">
                <div className="wrap">
                    { authenticatedUser && authenticatedUser.id.toString() === id
                        ? 
                        <>
                            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                            <Link className="button" to="/">DeleteCourse</Link>
                        </>
                        : null
                    }
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            { errorFetching
                ? 
                <NotFound />
                :
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
            }
        </>
    )
}

export default CourseDetail;