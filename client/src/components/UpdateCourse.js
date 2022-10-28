import React from 'react';

const UpdateCourse = () => {
    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <form action="">
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value="Build a Basic Bookcase"/>
                        <p>Joe Smith</p>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription">Description here
                        </textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded">
                        </textarea>
                    </div>
                </div>
                <button className="button">Update Course</button>
                <button className="button button-secondary">Cancel</button>
            </form>
        </div>
    )
}

export default UpdateCourse;