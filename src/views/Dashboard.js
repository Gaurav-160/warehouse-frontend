import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { fetchUserDataFromGoogle } from '../static/js/googleAuth';
import AuthContext from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import SideBar from '../components/Sidebar';
import styled from "styled-components";

const generateData = async () => {
  console.log("sending request !!!")

  const res = await fetch("http://localhost:8000/warehouse/generate-fake-data/");
  const json = await res.json()

  console.log("json data response: ", json)
}


function Dashboard() {

  const [message, setMessage] = useState("");
  const {user, setUser, authToken, logoutUser} = useContext(AuthContext)
  
  // console.log("user from dashboard: ", user)

  // useEffect(() => {
    if (localStorage.getItem("authTokens") === null && localStorage.getItem("googleAccessToken") === null) {
      window.location.href = "/login";
      alert("You need to login first to move to the dashboard")
    } else if (localStorage.getItem("authTokens") !== null) {
      if(user === null){
        setUser(jwtDecode(localStorage.getItem("authTokens")));
      }
    } else if (localStorage.getItem("googleAccessToken") !== null){
      // const userDetails = fetchUserDataFromGoogle(localStorage.getItem("googleAccessToken"))
      // console.log("userDetails from google: ", userDetails)
      if(user === null){
        console.log("user is null")
      }else{
        // console.log(user)
      }
    }
  // }, [user, setUser]);
  return (
    <Container>
      <SideBar />
      <main>
        <h1>
          Hii{" "}
          {(authToken && user?.username) ||
            (localStorage.getItem("googleAccessToken") &&
              user?.given_name)}{" "}
          Welcome to the Dashboard of backtestZone.com
        </h1>
        <button onClick={() => logoutUser()}>LogOut</button>
        <button onClick={() => generateData()}>Generate Data</button>
      </main>
    </Container>
  );
}

export default Dashboard

const Container = styled.div`
  display: flex;
  background-color: black;
  border: red solid 3px;
  color: green;
  width: 100vw;
  min-height: 100vh;
`