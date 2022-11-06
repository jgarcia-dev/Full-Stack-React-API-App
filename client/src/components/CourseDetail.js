import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseDetail = () => {
    const [courseDetails, setCourseDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(data => setCourseDetails(data))
            .catch(err => console.log('Error fetching course details', err))
            .finally(() => setIsLoading(false));
    }, []);

    const getParagraphs = str => {
        const paragraphs = str
            .split("\n\n")
            .map((paragraph,index) => <p key={index}>{paragraph}</p>);

        return paragraphs
    }

    const getMaterialItems = str => {
        const materialItems = str
            .slice(2, -1)
            .split("\n* ")
            .map((material, index) => <li key={index}>{material}</li>);

        return materialItems;
    }

    return (
        <>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                    <Link className="button" to="/">DeleteCourse</Link>
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
                                        ? getParagraphs(courseDetails.description)
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
                                            <ul className="course--detail--list">
                                                { getMaterialItems(courseDetails.materialsNeeded) }
                                            </ul>
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