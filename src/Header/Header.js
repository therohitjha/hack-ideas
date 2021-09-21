import { useState } from "react";
import CreateModal from "../CreateModal/CreateModal";
import "./Header.css";

const Header = ({ user, handleCreate, handleLogout, data }) => {
  const docBody = document.body;
  const [openModal, setOpenModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const updateBodyScroll = (hide) => {
    docBody.style.overflow = hide ? "hidden" : "auto";
  };

  const closeModal = () => {
    setOpenModal(false);
    updateBodyScroll(false);
  };

  function checkCreate() {
    const didYouPosted = data?.find((e) => e.empId === user.id);
    if (new Date().getTime() - didYouPosted?.createdOn >= 86400000) {
      setOpenModal(true);
      updateBodyScroll(true);
      setIsDisabled(false);
    } else {
        alert("You have already created post in last 24 hours")
      setIsDisabled(true);
    }
  }

  return (
    <div className="main-header">
      <div className="welcome-text">Hello, {user.name}</div>
      <div className="action-btns">
        <span>
          <button
            disabled={isDisabled ? true : false}
            title="Create Challenge"
            className="create-btn"
            onClick={checkCreate}
          >
            Create
          </button>
          <CreateModal
            open={openModal}
            onClose={closeModal}
            onCreate={(data) => {
              handleCreate(data);
              closeModal();
            }}
          ></CreateModal>
        </span>
        <span>
          <button title="Logout" className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </span>
      </div>
    </div>
  );
};

export default Header;
