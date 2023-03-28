import React from 'react'

export default function list() {
  return (
    <>
      <h2>Conversations</h2>
      <div className="list">
        <ul>
          <li>
            <div className="profile">
              <div className="picture">
                <img
                  src="https://picsum.photos/50/50"
                  alt="Photo de profil"
                  className="profilePicture"
                />
              </div>
              <div className="informationsSection">
                <div className="informations">
                  <p className="name">
                    User <span className="hourLastMessage">14:05</span>
                  </p>
                  <p className="tags-conversations">#skillshaker</p>
                  <p className="msg">Message.........</p>
                </div>
                {/* <div
                  className="profileIcon"
                  onClick={() => setOpenMenu((prev) => !prev)}
                >
                  <HiDotsVertical />
                  {openMenu && <Menu />}
                </div> */}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}
