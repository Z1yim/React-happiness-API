import { useHistory } from "react-router-dom";

export default function Logout(props) {
  let history = useHistory();

  function onClickLogout() {
    history.push("./");
    props.setLoginState(false);
    localStorage.setItem("token", "");
  }

  return (
    <div className="hero">
      <h1>Logout</h1>
      <div className="main-content">
        <h2>Confirm Logout?</h2>
        <div className="custom-button" onClick={onClickLogout} type="button">
          Logout
        </div>
      </div>
    </div>
  );
}
