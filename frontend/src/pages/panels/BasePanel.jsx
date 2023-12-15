import logo from "../../assets/logo/crystalvote_icon.png";
import "./BasePanel.css";
import VotingPanel from "./VotingPanel";
import AdminPanel from "./AdminPanel";
import logout_logo from "../../assets/logo/logout_logo.png";

function BasePanel() {
  return (
    <div className="base-panel">
      <nav className="base-panel-header row d-flex">
        <div className="col-3 d-flex justify-content-center">
          <img className="cv-logo" src={logo} />
        </div>
        <div className="col-6"></div>
        <div className="logout col-2 justify-content-end d-flex align-items-center">
          <img src={logout_logo}></img>
          <h3>Logout</h3>
        </div>
        <div className="col-1"></div>
      </nav>

      <VotingPanel />
    </div>
  );
}

export default BasePanel;
