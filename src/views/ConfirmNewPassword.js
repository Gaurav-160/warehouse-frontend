import React, { useState } from 'react'
import { useParams } from "react-router-dom";

function ConfirmNewPassword() {

  const {token} = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault()
    
    var response = await fetch(
      `https://gaurav507.pythonanywhere.com/api/password_reset/confirm/?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      }
    );

    response = await response.json();

    if(response.status === 'OK' || response.status === 200){
        setMessage("Well done !!! You can now proceed to login")
    }else{
        setMessage("Something went wrong. Try Again.")
    }

  }

  return (
    <div>
      ConfirmNewPassword
      <form onSubmit={resetPassword}>
        <label>Enter new password: </label>
        <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Reset Password</button>
      </form>
      <h2>{message}</h2>
    </div>
  );
}

export default ConfirmNewPassword
