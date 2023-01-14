import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Component retrieves course list from REST API.
 * Renders course list with links.
 */
const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    /**
     * Fetches course list and sets data in state.
     * Sets loading state status.
     * Handles errors with redirect to appropriate error page.
     */
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/courses');
                if (res.status === 200) {
                    const coursesData = await res.json();
                    setCourses(coursesData);
                } else if (res.status === 500) {
                    navigate("/error");
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
    }, [navigate]);

    /**
     * Maps course data to individual Link
     * @returns {JSX.Element} JSX containing course links.
     */
    const renderCourseLinks = () => {
        const coursesLinks = courses.map( course => (
            <Link 
                to={`/courses/${course.id}`}
                key={course.id}
                className="course--module course--link">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
            </Link>
        ));
        return coursesLinks;
    }

    return (
        <div className="wrap main--grid">
            { isLoading 
                ? <p>Loading...</p>
                : renderCourseLinks()
            }
            <Link
                to="/courses/create"
                className="course--module course--add--module">
                     <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </span>
            </Link>
        </div>
    )
}

export default Courses;