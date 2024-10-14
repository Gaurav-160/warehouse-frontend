import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import GodownContext from "../context/GodownContext"; // Import your GodownContext
import SideBar from "../components/Sidebar";
import styled from "styled-components";
import MainContent from "../components/MainContent";
import ItemDetail from "../components/ItemDetails";
import FloatingToggleButton from "../components/FloatingBtn";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";

function Homepage() {
  const { fetchGodowns, godowns, loading, error, selectedItem } =
    useContext(GodownContext); // Access context

  const { user, loginUser, logoutUser, loginUserWithGoogle } =
    useContext(AuthContext); // Access authentication context

  console.log("user from home page: ", user);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      loginUserWithGoogle(codeResponse);
    },
    flow: "implicit",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log("sb: ", sidebarOpen);
  };

  useEffect(() => {
    fetchGodowns(); // Fetch godowns from context
  }, [fetchGodowns]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      {!sidebarOpen && <FloatingToggleButton onToggle={toggleSidebar} />}
      <SideBarWrapper>
        <SideBar
          isOpen={sidebarOpen}
          onClose={toggleSidebar}
          godowns={godowns}
        />
      </SideBarWrapper>
      <MainContentWrapper>
        {selectedItem ? (
          <ItemDetail item={selectedItem} />
        ) : (
          <EmptyState>
            {!user ? (
              <AuthOptions>
                <AuthButton>
                  <Link to={"/login"}>Login</Link>
                </AuthButton>
                <GoogleButton
                  className="googleSignInBtn"
                  onClick={() => login()}
                />
                <AuthButton>
                  <Link to={"/register"}>Sign Up</Link>
                </AuthButton>
              </AuthOptions>
            ) : (
              <WelcomeMessage>
                Welcome, {user.username || user.name || "User"} !  Select an item to view
                details  or  Click on Manage Godowns to manage your warehouse i.e. to add, modify or delete a warehouse.
                <button onClick={() => logoutUser("/")}>LogOut</button>
              </WelcomeMessage>
            )}
          </EmptyState>
        )}
      </MainContentWrapper>
    </Container>
  );
}

export default Homepage;

export const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  background-color: #f5f7fa;
  color: #2c3e50;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
  }
`;

export const SideBarWrapper = styled.div`
  flex: 0 0 24%;
  max-width: 24%;
  min-width: 336px;
  height: 100vh; /* Make sure it takes the full height */
  overflow-y: auto; /* Enable scrolling within the sidebar */
  background-color: #f6f6f6;

  @media (max-width: 768px) {
    flex: 0 0 100%; /* Sidebar takes full width */
    max-width: 100%;
    min-width: 100%;
    height: auto; /* On smaller screens, auto height */
  }

  /* Optional: Style the scrollbar (for modern browsers) */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Scrollbar thumb color */
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f0f0f0; /* Scrollbar track color */
  }
`;

const MainContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  margin-left: 0px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  // position: sticky;
  // top: 0;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
    height: auto;
  }
`;

// Empty state when no item is selected
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`;

const Message = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

// Auth Options for Sign Up, Login, and Google Login
const AuthOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AuthButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const WelcomeMessage = styled.h3`
  color: #2c3e50;
  font-size: 1.25rem;
  margin-top: 20px;
`;
