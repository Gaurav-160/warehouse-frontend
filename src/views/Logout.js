import { useEffect } from "react";
import axios from "axios";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    axios.defaults.headers.common["Authorization"] = "";
    window.location.href = "/login";
  }, []);

  return <div></div>;
};

export default Logout;
