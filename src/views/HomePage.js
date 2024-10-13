import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import GodownContext from "../context/GodownContext"; // Import your GodownContext
import SideBar from "../components/Sidebar";
import styled from "styled-components";
import MainContent from "../components/MainContent";
import ItemDetail from "../components/ItemDetails";
import FloatingToggleButton from "../components/FloatingBtn"

function Homepage() {
  const { fetchGodowns, godowns, loading, error, selectedItem } =
    useContext(GodownContext); // Access context

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
          <div style={{margin:"auto"}}>Select an item to see the details.</div>
        )}
      </MainContentWrapper>
    </Container>
  );
}

export default Homepage;

const Container = styled.div`
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

const SideBarWrapper = styled.div`
  flex: 0 0 24%;
  max-width: 24%;
  min-width: 336px;

  @media (max-width: 768px) {
    flex: 0 0 100%; /* Sidebar takes full width */
    max-width: 100%;
    min-width: 100%;
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
  position: sticky;
  top: 0;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
    height: auto;
  }
`;

