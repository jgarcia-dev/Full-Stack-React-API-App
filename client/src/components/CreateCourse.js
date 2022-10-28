import React from 'react';

const CreateCourse = () => {
    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a value for "Title"</li>
                </ul>
            </div>
            <form action="">
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" />
                        <p>Joe Smith</p>
                        <label htmlFor="courseDetailDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription">
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
                <button className="button" type='submit'>Create Course</button>
                <button className="button button-secondary">Cancel</button>
            </form>
        </div>
    )
}

export default CreateCourse;