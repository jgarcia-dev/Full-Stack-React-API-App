import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import CourseDetail from "./components/CourseDetail";
import Header from "./components/Header";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Courses />} />
        </Routes>
        {/* <Courses /> */}
        {/* <CourseDetail /> */}
        {/* <UserSignIn /> */}
        {/* <UserSignUp /> */}
        {/* <CreateCourse /> */}
        {/* <UpdateCourse /> */}
      </main>
    </>
  );
}

export default App;
