import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState, useContext, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { CgPhone } from "react-icons/cg";
import { MdDescription } from "react-icons/md";
import "./index.scss";

// INTERFACES
import UserInterface from '../../../interfaces/user'

// CONTEXT
import User from "../../../contexts/userContext";

export default function ProfileForm(props : any) {
  const { user } = useContext(User);
  const [infos, setInfos] = useState<React.SetStateAction<any>>(null);
  const [error, setError] = useState<string | null>("");
  const authToken : string | undefined = Cookies.get("auth_token");

  useEffect(() => {
    if (user) {
      axios
        .get<UserInterface>(`${process.env.REACT_APP_API_URL}/user/info`, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        })
        .catch(() => {
          setError("Une erreur est survenue...");
        })
        .then(async (data) => {
          setInfos(data);
        });
    }
  }, [user, authToken]);

  // EDIT
  const editMyprofil = (e : any) => {
    e.preventDefault();
    axios
      .post<UserInterface>(`${process.env.REACT_APP_API_URL}/user/edit`, infos, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then(async (data) => {
        setInfos(data);
        toast.success(
          `${infos.firstname}, vos modifications ont bien été prises en compte !`
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        toast.error(`Une erreur est survenue, veuillez réessayer...`);
        setError("Une erreur est survenue, veuillez réessayer...");
      });
  };

  // LOCAL STORAGE
  if (typeof Storage !== "undefined") {
    if (infos === undefined || infos === null) {
      let infoGet = localStorage.getItem("infosEditProfile");
      if (infoGet !== undefined && infoGet !== null) {
        setInfos(JSON.parse(infoGet));
      }
    } else {
      localStorage.setItem("infosEditProfile", JSON.stringify(infos));
    }
  } else {
    console.log("Erreur....");
  }

  console.log(infos)

  const handleClick = (e: any) => {
    e.stopPropagation();
  };
    
  return (
    <div className='overlay'onClick={props.onClose}>
      <div id="editProfile" onClick={handleClick}>
        <button className="modal-close" onClick={props.onClose}>
          X
        </button>
        <form action="" id="Form-Profil">
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div>
            <label htmlFor="firstname">
              <BsFillPersonFill />{" "}
              <span className="span-edit-profile">Nom d'utilisateur</span>
              <input
                className="edit-input"
                type="text"
                name="firstname"
                // value={infos.data.firstname}
                onChange={(e) =>
                  setInfos({ ...infos, firstname: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label htmlFor="phoneNumber">
              <CgPhone />{" "}
              <span className="span-edit-profile">Numéro de téléphone</span>
              <input
                className="edit-input"
                type="text"
                name="phoneNumber"
                // value={infos.data.phoneNumber}
                onChange={(e) =>
                  setInfos({ ...infos, phoneNumber: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              <MdDescription />{" "}
              <span className="span-edit-profile">Description</span>
              <textarea
                className="description-bloc"
                name="description"
                cols={30}
                rows={10}
                // value={infos.data.description}
                onChange={(e) =>
                  setInfos({ ...infos, description: e.target.value })
                }
              ></textarea>
            </label>
          </div>
          <div className="input-submit-edit">
            <input type="submit" value="Modifier" onClick={editMyprofil} />
          </div>
        </form>
      </div>
    </div>
  )
}
