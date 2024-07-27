import { useContext, useState } from "react";
import Login from "../Authentication";
import ModalPortal from "../Modal";
import "./styles.css";
import UserContext from "../../context/UserContext";
import useUser from "../../hooks/useUser";

export default function SignUp() {
  const {
    user: { username },
  } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { logout } = useUser();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    setShowModal(false);
  };

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsRegister(e.currentTarget.name === "register");
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="signUp-menu">
      {username ? (
        <>
          <span className="user">{username}</span>
          <button
            className=" signUp-item-button"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className=" signUp-item-button"
            name="login"
            onClick={openModal}
            aria-label="Login"
          >
            Login
          </button>
          <button
            className="signUp-item-button"
            name="register"
            onClick={openModal}
            aria-label="Register"
          >
            Register
          </button>
        </>
      )}
      {showModal && (
        <ModalPortal onClose={handleCloseModal} title={"Login"}>
          <Login onLogin={handleLogin} isRegister={isRegister} />
        </ModalPortal>
      )}
    </div>
  );
}
