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
import PrivateRoute from "./components/PrivateRoute";

import UserContextProvider from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Header />
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
          {/* Private routes */}
          <Route path="/courses" element={<PrivateRoute />} >
            <Route path="create" element={<CreateCourse />} />
            <Route path=":id/update" element={<UpdateCourse />} />
          </Route>
        </Routes>
      </main>
    </UserContextProvider>
  );
}

export default App;
