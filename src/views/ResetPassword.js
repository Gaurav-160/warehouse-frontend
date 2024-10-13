import React, {useState, useContext} from 'react'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import AuthContext from "../context/AuthContext";


function ResetPassword() {
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);

  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const { resetPassword } = useContext(AuthContext);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const response = await resetPassword(email);
    // console.log("response: ", response)
    if (response.status === 'OK') {
      setContent(
        "An email containing reset password link has been sent to your registered email id. Kindly open the link sent to reset your password."
      );
    }
    else {
        setContent(`Something went wrong. ${response.email}`)
    }
  };

  return (
    <>
      <MDBBtn onClick={toggleOpen}>Forget Password?</MDBBtn>
      <MDBModal open={basicModal} setopen={setBasicModal} tabIndex="-1">
        <MDBModalDialog size="lg" centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <h1>Reset Password</h1>
                <form onSubmit={handleResetPassword}>
                  <label>Enter the registered email id : </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                   />
                  <MDBBtn type='submit'>Submit</MDBBtn>
                </form>
              </div>
              <h2>{content}</h2>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export {ResetPassword}