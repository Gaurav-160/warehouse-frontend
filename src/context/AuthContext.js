/* eslint-disable no-unused-expressions */
import {createContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState(() => 
        // eslint-disable-next-line no-unused-expressions
        localStorage.getItem("authTokens") 
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null
    )

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
        ? jwtDecode(localStorage.getItem("authTokens"))
        : null
    )

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchUserDataFromGoogle = async (token) => {
      try {
        const userData = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const userInfo = await userData.json();
        setUser(userInfo)
      } catch (error) {
        console.log(error);
      }
    };

    if(user === null && localStorage.getItem("googleAccessToken")){
      fetchUserDataFromGoogle(localStorage.getItem("googleAccessToken"))
    }

    const loginUser = async (email, password) => {
        // const response = await fetch("https://gaurav507.pythonanywhere.com/api/token/", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ email, password }),
        // });

        const response = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json()
        console.log(data)

        if(response.status === 200){
            console.log("loggedin");
            setAuthToken(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate("/dashboard")
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            alert("something went wrong " + response.status);
        }
    }

    const registerUser = async (email, username, password, password2) => {
        // const response = await fetch("https://gaurav507.pythonanywhere.com/api/register/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email, username, password, password2
        //     })
        // });

        const response = await fetch("http://localhost:8000/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            password,
            password2,
          }),
        });

        if(response.status === 201){
            navigate("/login");
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            alert("something went wrong " + response.status);
        }
    }

    const logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.clear()
        navigate("/login")
    }

    const loginUserWithGoogle = async (codeResponse) => {
      console.log(codeResponse);
      localStorage.setItem("googleAccessToken", JSON.stringify(codeResponse.access_token))

      const user = {
        backend: "google-oauth2",
        client_id: "iBzvk3Uq6XssKDLrEhGMqYlsVKMmeHucErk1GjqF",
        client_secret:
          "vxW4H3xKXwNL6z3bXTheBEsQjgP9upCgglItvvPr5R3CWl8TaJZG1gl9Ae5RgqPbLQ51N8csSVgcWE88TETAqhpRXFwcvEBpAr6dvi34yOOfAnbQc8ha7aa6yOiYMjgn",
        grant_type: "convert_token",
        token: codeResponse.access_token,
      };

      try {
        const response = await fetch(
          "https://gaurav507.pythonanywhere.com/api-auth/convert-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            withCredential: true,
            body: JSON.stringify(user),
          }
        );
        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
          // console.log("loggedin");
          // localStorage.setItem("authTokens", JSON.stringify(data.access_token));
          navigate("/dashboard");
        } else {
          console.log(response.status);
          console.log("there was a server issue");
          alert("something went wrong " + response.status);
        }
      } catch (error) {
        console.log(error);
      }

      try {
        const userData = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        );
        const userInfo = await userData.json();
        setUser(userInfo)
        navigate("/dashboard");
        // console.log(userInfo);
      } catch (error) {
        console.log(error);
      }
    }

    const resetPassword = async (email) => {
        var response = await fetch(
          "https://gaurav507.pythonanywhere.com/api/password_reset/", 
          {
            method: "POST",
            headers:{
              "Content-type": "application/json",
            },
            body: JSON.stringify({email})
          }
        );

        response = await response.json()
        console.log(response.status)

        return response
        // if (response.status === 201 || response.status === 200 || response.status === 'OK'){
        //   return true;
        // } else{
        //   console.log("lol: ", response);
        // }
        // return false
    }

    const contextData = {
      user,
      setUser,
      authToken,
      registerUser,
      loginUser,
      logoutUser,
      loginUserWithGoogle,
      resetPassword,
    };

    useEffect(() => {
        if(authToken) {
            setUser(jwtDecode(authToken.access))
        }
        setLoading(false)
    }, [loading, user])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
