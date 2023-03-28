import axios from "axios";
// import Modal from "../../modals/editProfile/index";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState, useContext, useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";

// CONTEXT
import User from "../../../contexts/userContext";

export default function Profile() {
  // CONTEXT
  const { user, setUser } = useContext(User);

  // MENU - DECONNEXION
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useRef(null);
  
  const handleLogOut = () => {
    setUser(null);
    const authToken = Cookies.get("auth_token");
    if (authToken) {
      Cookies.remove("auth_token");
      localStorage.removeItem("userToken");
    }
    toast.info(`Déconnexion...`); // A REVOIR, CA MARCHE PAS
    window.location.href = "/";
  };

  return (
    <>
      {/* <div className="background-profile"></div> */}
      <div className="profile user" ref={ref}>
        <div
          className="profileIcon"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <HiDotsVertical />
          {openMenu && (
            <>
              <ul className="menuProfile">
                <li>
                  <button type="button">
                    Mon profil
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleLogOut}>
                    Déconnexion
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  )
}
