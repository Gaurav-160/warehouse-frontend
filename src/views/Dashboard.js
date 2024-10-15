import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import GodownContext from "../context/GodownContext"; // Import your GodownContext
import SideBar from "../components/Sidebar";
import styled from "styled-components";
import ItemDetail from "../components/ItemDetails";
import FloatingToggleButton from "../components/FloatingBtn";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import Modal from "../components/Modal"; // Import the Modal component
import ItemCard from "../components/Items";
import { MainContentWrapper, Container, SideBarWrapper } from "./HomePage";


function Dashboard() {
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
    <>
      {/* Blur the background if user is not logged in */}
      <Container isBlurred={!user}>
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
            // <ItemCard item={selectedItem} />
          ) : (
            <EmptyState>
              {!user ? (
                <WelcomeMessage>
                  Welcome! Select an item to view details or click on Manage
                  Godowns to manage your warehouse.
                </WelcomeMessage>
              ) : (
                <>
                  <WelcomeMessage>
                    Welcome, {user.username || user.name || "User"}!
                  </WelcomeMessage>
                  <Message>
                    Select an item to view details or click on Manage Godowns to
                    manage your warehouse.
                  </Message>
                </>
              )}
            </EmptyState>
          )}
        </MainContentWrapper>
      </Container>

      {/* Show the login modal if the user is not logged in */}
      {!user && (
        <Modal isOpen={!user}>
          <Message>Please login to manage your warehouse.</Message>
          <AuthOptions>
            <AuthButton>
              <Link to={"/login"}>Login</Link>
            </AuthButton>
            <GoogleButton className="googleSignInBtn" onClick={() => login()} />
            <AuthButton>
              <Link to={"/register"}>Sign Up</Link>
            </AuthButton>
          </AuthOptions>
        </Modal>
      )}
    </>
  );
}

export default Dashboard;


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
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const AuthButton = styled.button`
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c3e50;
  }
`;

const WelcomeMessage = styled.h3`
  color: #2c3e50;
  font-size: 1.25rem;
  margin-top: 20px;
`;
