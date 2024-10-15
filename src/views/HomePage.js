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
import ItemCard from "../components/Items";

function Homepage() {
  const { fetchGodowns, godowns, loading, error, selectedItem } =
    useContext(GodownContext); // Access context

  const { user, loginUser, logoutUser, loginUserWithGoogle } =
    useContext(AuthContext); // Access authentication context

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      loginUserWithGoogle(codeResponse);
    },
    flow: "implicit",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          // <ItemCard item={selectedItem} />
        ) : (
          <EmptyState>
            {!user ? (
              <EmptyState>
                <Message>
                  Welcome! To manage your own warehouse, please log in or create
                  an account.
                </Message>
                <AuthOptions>
                  <AuthButton>
                    <Link to={"/login"}>Login</Link>
                  </AuthButton>
                  <GoogleButton
                    className="googleSignInBtn"
                    onClick={() => login()}
                  />
                  <AuthButton>
                    <Link to={"/register"}>Register</Link>
                  </AuthButton>
                </AuthOptions>
                <hr />
                <Message>
                  Select an item from the sidebar to see details.
                </Message>
              </EmptyState>
            ) : (
              <WelcomeMessage>
                Welcome, {user.username || "User"}! Select an item to view
                details.
              </WelcomeMessage>
            )}
          </EmptyState>
        )}
      </MainContentWrapper>
    </Container>
  );
}

export default Homepage;

// Styled components
export const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  background-color: #383c4a;
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
  background-color: #383c4a;

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

export const MainContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  margin-left: 0px;
  background-color: #bbbbbb;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
    height: auto;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Message = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const AuthOptions = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */

  @media (max-width: 768px) {
    gap: 10px;
    justify-content: center; /* Center buttons on smaller screens */
  }
`;

const AuthButton = styled.button`
  padding: 8px 25px;
  color: #fff !important;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccd5e9;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.875rem; /* Slightly smaller font on smaller screens */
  }
`;

const WelcomeMessage = styled.h3`
  color: #2c3e50;
  font-size: 1.25rem;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
