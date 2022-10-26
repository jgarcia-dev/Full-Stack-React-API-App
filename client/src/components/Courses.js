import React, { useState, useEffect } from 'react';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/courses')
            .then( res => res.json() )
            .then( data => setCourses(data))
            .catch( err => console.log('Oh noes', err))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="wrap main--grid">
            { isLoading 
                ?
                <p>Loading...</p>
                :
                courses.map( course => (
                    <a href={`http://localhost:5000/api/courses/${course.id}`} 
                        key={course.id}
                        className="course--module course--link">
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </a>
                ))
            }
        </div>
    )
}

export default Courses;