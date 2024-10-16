import React, { useState, useContext } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import AuthContext from "../context/AuthContext";
import "../static/css/RegisterPage.css"; // Import your custom CSS

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(email)
    console.log(username)
    console.log(password)
    console.log(password2)
    registerUser(email, username, password, password2);
  };

  return (
    <MDBContainer fluid className="register-container">
      <MDBCard className="text-black register-card">
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="6"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center register-form"
            >
              <h2 className="text-center h1 fw-bold mb-5">Sign up</h2>
              <form onSubmit={handleRegister}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Username"
                    id="form1"
                    type="text"
                    className="w-100"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Email"
                    id="form2"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Repeat your password"
                    id="form4"
                    type="password"
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>

                <MDBBtn
                  className="register-btn w-100 mb-4"
                  size="lg"
                  type="submit"
                >
                  Register
                </MDBBtn>
              </form>
            </MDBCol>

            <MDBCol
              md="6"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center register-image"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
                alt="Register image"
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default RegisterPage;
