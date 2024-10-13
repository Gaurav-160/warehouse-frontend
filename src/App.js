import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { GodownProvider } from './context/GodownContext';
import Dashboard from "./views/Dashboard";
import HomePage from "./views/HomePage";
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import Navbar from './components/Navbar';
import {ResetPassword} from './views/ResetPassword';
import { GoogleOAuthProvider } from "@react-oauth/google";
import ConfirmNewPassword from './views/ConfirmNewPassword';

function App() {
  return (
    <Router>
      <Fragment>
        <GoogleOAuthProvider clientId="140549363583-00rh8vdh92h6lfd4motbkfns8nimqk0n.apps.googleusercontent.com">
          <GodownProvider>
            <AuthProvider>
              {/* <Navbar /> */}
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<LoginPage />} path="/login" />
                <Route element={<RegisterPage />} path="/register" />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/reset-password/confirm/:token"
                  element={<ConfirmNewPassword />}
                />
              </Routes>
              {/* <HomePage /> */}
            </AuthProvider>
          </GodownProvider>
        </GoogleOAuthProvider>
      </Fragment>
    </Router>
  );
}

export default App