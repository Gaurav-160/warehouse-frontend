import React, { useContext } from "react";
import GodownContext from "../context/GodownContext";
import ItemDetail from "./ItemDetails";
import { styled } from "styled-components";

function MainContent() {
  const { selectedItem } = useContext(GodownContext);
  console.log("Selected item from main content: ", selectedItem);

  return (
    <Container>
      <ItemDetail item={selectedItem} />
    </Container>
  );
}

export default MainContent;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Center content vertically */
  width: 75%; /* Adjust width as needed */
  height: 100vh; /* Set height to full viewport height */
  position: fixed; /* Fix position */
  top: 0; /* Align to the top */
  right: 0; /* Align to the right */
  background-color: #ffffff; /* Optional: set a background color */
  z-index: 10; /* Ensure it is above other content */
  overflow-y: auto; /* Add vertical scrolling if content overflows */
  /* Optional styling */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
`;
