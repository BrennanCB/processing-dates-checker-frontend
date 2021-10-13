import { IconButton } from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons";
import logo from "../logo.svg";
import "./header.css";

function Header() {
  return (
    <header className="App-header">
      <div className="d-flex logo-conatiner">
        <img src={logo} className="App-logo" alt="logo" />
        <span>Processing times</span>
      </div>
      {/* Open modal with help stuff in it */}
      {/* <IconButton title="About">
        <HelpOutline className="alt-color" />
      </IconButton> */}
    </header>
  );
}

export default Header;
