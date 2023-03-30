import { AiOutlineMinus } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { IoTrashBin } from "react-icons/io5";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useContext, useEffect } from "react";

// CONTEXT
import User from "../../../contexts/userContext";

export default function Suggested() {
  // CONTEXT
  const { user } = useContext(User);

  const authToken : string | undefined = Cookies.get("auth_token");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // API
  const [tags, setTags] = useState<Array<any>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/tagUser/get`, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        })
        .catch(() => {
          setError("Une erreur est survenue...");
        })
        .then(async (data : void | any) => {
          setTags(data.data.suggTags);
        });
    }
  }, [user, authToken]);

  // LOCAL STORAGE
  if (typeof Storage !== "undefined") {
    if (tags.length === 0) {
      let suggestedTags = localStorage.getItem("suggestedTags");
      if (suggestedTags !== undefined && suggestedTags !== null) {
        setTags(JSON.parse(suggestedTags));
      }
    } else {
      localStorage.setItem("suggestedTags", JSON.stringify(tags));
    }
  } else {
    console.log("Erreur....");
  }

  return (
    <div className="suggestedTags">
      <div className="titlesTags">
        <h3>Tags suggérés ({tags.length})</h3>
        <p onClick={toggleOpen}>
          {isOpen ? <AiOutlineMinus /> : <HiOutlinePlus />}
        </p>
      </div>
      {isOpen &&
        tags.map((tag) => {
          return (
            <div className="tag-content" key={tag.id}>
              <div className="bin-tag">
                <IoTrashBin />
              </div>
              <div className="text-tag">#{tag.name}</div>
              <div className="check-tag">
                <BsFillCheckCircleFill />
              </div>
            </div>
          );
        })}
    </div>
  )
}
