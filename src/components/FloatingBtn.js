import React, { useState } from "react";
import styled from "styled-components";

const FloatingButton = styled.button`
  position: fixed;
  top: 20px;
  left: 10px;
  font-size: 24px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000; /* Ensure it stays above other elements */

  @media (min-width: 769px) {
    display: none; /* Hide on larger screens */
  }
`;

const FloatingToggleButton = ({ onToggle }) => {
  return <FloatingButton onClick={onToggle}>☰</FloatingButton>;
};

export default FloatingToggleButton;
