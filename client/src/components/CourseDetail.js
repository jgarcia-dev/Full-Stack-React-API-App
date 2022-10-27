import React, { useState, useEffect } from 'react';

const CourseDetail = () => {
    const [courseDetails, setCourseDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/courses/1')
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
                    <a className="button" href="">Update Course</a>
                    <a className="button" href="">DeleteCourse</a>
                    <a className="button button-secondary" href="">Return to List</a>
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