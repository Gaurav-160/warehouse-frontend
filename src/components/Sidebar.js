import { useEffect, useState } from "react";
import { FaHome, FaWarehouse } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import "../static/css/sidebar.css";
import { LiaWarehouseSolid } from "react-icons/lia";
import { BiSitemap } from "react-icons/bi";
import { useContext } from "react";
import GodownContext from "../context/GodownContext";
import AuthContext from "../context/AuthContext";

const SideBar = ({ godowns, isOpen, onClose }) => {
  const [openSubMenus, setOpenSubMenus] = useState([]);
  const [closingSubMenus, setClosingSubMenus] = useState([]);
  const { selectItem } = useContext(GodownContext);
  const { user, logoutUser } = useContext(AuthContext);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubMenuToggle = (menuIndex) => {
    if (openSubMenus.includes(menuIndex)) {
      setClosingSubMenus([...closingSubMenus, menuIndex]);
      setTimeout(() => {
        setOpenSubMenus(openSubMenus.filter((index) => index !== menuIndex));
        setClosingSubMenus(
          closingSubMenus.filter((index) => index !== menuIndex)
        );
      }, 300);
    } else {
      setOpenSubMenus([...openSubMenus, menuIndex]);
    }
  };

  const renderSubLocations = (subLocations, parentIndex) => {
    return (
      <ul>
        {subLocations.map((subLocation, index) => (
          <li key={subLocation.id}>
            <div
              className="link"
              onClick={() => handleSubMenuToggle(`${parentIndex}-${index}`)}
            >
              <LiaWarehouseSolid className="icon" />
              <span className="text">{subLocation.name}</span>{" "}
              {subLocation.items?.length > 0 && (
                <IoIosArrowForward className="arrow" />
              )}
            </div>
            <ul
              className={`sub-menu ${
                openSubMenus.includes(`${parentIndex}-${index}`)
                  ? "open"
                  : closingSubMenus.includes(`${parentIndex}-${index}`)
                  ? "closing"
                  : ""
              }`}
            >
              {subLocation.items &&
                subLocation.items.map((item) => (
                  <li key={item.item_id}>
                    <div
                      className="link"
                      onClick={() => {
                        selectItem(item);
                        if (window.innerWidth <= 768) {
                          onClose(); // Close the sidebar on small screens
                        }
                      }}
                    >
                      <BiSitemap className="icon" />
                      <span className="text">{item.name}</span>
                    </div>
                  </li>
                ))}
              {subLocation.sub_godowns?.length > 0 &&
                renderSubLocations(
                  subLocation.sub_godowns,
                  `${parentIndex}-${index}`
                )}
            </ul>
          </li>
        ))}
      </ul>
    );
  };

  // Filter godowns based on search query
  const filteredGodowns = godowns.filter((godown) =>
    godown.name.toLowerCase().includes(searchQuery)
  );

  useEffect(() => {
    console.log("godowns from sidebar: ");
    console.log(godowns);
  }, [godowns]);

  return (
    <SidebarWrapper isOpen={isOpen} className="container">
      <div className="sidebar">
        <div className="head">
          <div className="user-img">
            <img src="./images/user.jpg" alt="user" />
          </div>
          <div className="user-details">
            <p className="title">Web Developer</p>
            <p className="name">
              {user?.name || user?.username || "Gaurav Bhardwaj"}
            </p>
          </div>
          {/* Close Button in the top right corner */}
          {isOpen && <CloseButton onClick={onClose}>&times;</CloseButton>}
        </div>

        {/* Search Bar for Godowns */}
        <SearchBarWrapper>
          <SearchInput
            type="text"
            placeholder="Search Warehouses..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchBarWrapper>

        <div className="nav">
          <div className="menu">
            <p className="title">Warehouses</p>
            <ul>
              {filteredGodowns.length > 0 ? (
                filteredGodowns.map((godown, index) => (
                  <li
                    key={godown.id}
                    className={openSubMenus.includes(index) ? "active" : ""}
                  >
                    <div
                      className="link"
                      onClick={() => handleSubMenuToggle(index)}
                    >
                      <FaWarehouse className="icon" />
                      <span className="text">{godown.name}</span>
                      {godown.sub_godowns?.length > 0 && (
                        <IoIosArrowForward className="arrow" />
                      )}
                    </div>
                    <ul
                      className={`sub-menu ${
                        openSubMenus.includes(index)
                          ? "open"
                          : closingSubMenus.includes(index)
                          ? "closing"
                          : ""
                      }`}
                    >
                      {godown.items &&
                        godown.items.map((item) => (
                          <li key={item.item_id}>
                            <div
                              className="link"
                              onClick={() => {
                                selectItem(item);
                                if (window.innerWidth <= 768) {
                                  onClose(); // Close the sidebar on small screens
                                }
                              }}
                            >
                              <BiSitemap className="icon" />
                              <span className="text">{item.name}</span>
                            </div>
                          </li>
                        ))}
                      {godown.sub_godowns?.length > 0 &&
                        renderSubLocations(godown.sub_godowns, index)}
                    </ul>
                  </li>
                ))
              ) : (
                <li>No warehouses found</li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer">
          {user ? (
            <LogoutButton onClick={() => logoutUser("/")}>LogOut</LogoutButton>
          ) : null}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default SideBar;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? "0" : "-350px")}; /* Slide in/out effect */
  width: 250px;
  height: 100%;
  background-color: #4b5162;
  transition: all 0.3s ease;
  z-index: 999; /* Below the button but above other content */

  @media (min-width: 769px) {
    left: 0; /* Always visible on larger screens */
    width: 250px;
  }
`;

// Close button styles
const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;
  margin-left: auto;
  padding: 5px 10px;
  &:hover {
    color: red;
  }
`;

// Search Bar styles
const SearchBarWrapper = styled.div`
  padding: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
`;


export const LogoutButton = styled.button`
  padding: 10px;
  min-width: 100%;
  color: #f6f6f6; /* White text */
  border: solid #007bff 1px;
  border-radius: 30px; /* Rounded corners */
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: border 0.3s ease, transform 0.2s ease;
  margin-top: 20px; /* Add margin to separate from the content */

  &:hover {
    border: solid #a93226 1px; /* Darker red on hover */
    color: #fff;
    transform: scale(1.01); /* Slight grow effect on hover */
  }

  &:active {
    background-color: #a93226; /* Even darker red when active */
    transform: scale(1); /* Reset scale when button is pressed */
  }

  &:focus {
    outline: none; /* Remove default focus outline */
  }
`;