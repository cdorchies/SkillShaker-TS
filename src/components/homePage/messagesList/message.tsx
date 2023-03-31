import { MdSend } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// CONTEXT
import User from "../../../contexts/userContext";

export default function Message() {
  const { user } = useContext(User);
  const authToken : string | undefined = Cookies.get("auth_token");

  const [inputValue, setInputValue] = useState<Array<any>>([]);
  const [searchTags, setSearchTags] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchTags(text);
  };

  const handleTagsClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const word = event.currentTarget.innerText;
    setInputValue([...inputValue, word]);
  }

  console.log(inputValue)

  // API
  const [allTags, setAllTags] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/tag/getAll`, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        })
        .catch(() => {
          setError("Une erreur est survenue...");
        })
        .then(async (data : void | any) => {
          setAllTags(data.data.tags);
        });
    }
  }, [user, authToken]);

  // LOCAL STORAGE
  if (typeof Storage !== "undefined") {
    if (allTags.length === 0 && allTags === undefined) {
      let allTags : string | null = localStorage.getItem("allTags");
      if (allTags !== undefined && allTags !== null) {
        setAllTags(JSON.parse(allTags));
      }
    } else {
      localStorage.setItem("allTags", JSON.stringify(allTags));
    }
  } else {
    console.log("Erreur....");
  }

  if (error) {
    return (
      <>
        <p>Une erreur est survenue... réessayez plus tard !</p>
      </>
    );
  }

  return (
    <>
      <div className="msg">
        <div>
          <input
            type="text"
            name="message"
            id="SkillShaker-Send-Message"
            placeholder="Rédiger un message..."
            onChange={handleSearchChange}
            // value={inputValue}
          />{" "}
          <div className={searchTags ? "allTagsSearchBar active" : "allTagsSearchBar"}>
          {allTags && searchTags.includes('#') ? (
            allTags.map((tag : any) => {
              return (
                <div>
                  <p key={tag.id} onClick={handleTagsClick}><span className="tagName">{tag.name}</span></p>
                  <p key={tag.id}><span className="audience">{tag.audience}</span></p>
                </div>
              )
            })
          ) : error}
          </div>
        </div>

        <MdSend />
      </div>
    </>
  );
}
