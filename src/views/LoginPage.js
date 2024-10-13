/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from "react";
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../static/css/LoginPage.css"
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";


function LoginPage() {

  const { loginUser, loginUserWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  if(localStorage.getItem("authTokens") || localStorage.getItem("googleAccessToken")){
    alert("Already logged in")
    navigate("/dashboard")
  }
  
  const handleLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    email.length > 0 && loginUser(email, password)

    // console.log(email)
    // console.log(password)

  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {loginUserWithGoogle(codeResponse)},
    flow: "implicit"
  });


  return (
    <div className="loginContainer">
      <MDBRow>
        <MDBCol col="6" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="6" md="6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            {/* <GoogleButton onClick={() => login()} /> */}
            <button onClick={() => login()}>
              Sign in with Google
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <form onSubmit={handleLogin}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              name="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              name="password"
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <Link to="/reset-password">Forgot password?</Link>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5" size="lg" type="submit">
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account? <Link to="/register"> Register </Link>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default LoginPage;
