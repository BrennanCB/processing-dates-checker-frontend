import { IconButton } from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import logo from '../logo.svg';
import './header.css';

function Header() {
  return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>I am a header</span>
{/* Open modal with help stuff in it */}
        <IconButton title="About"><HelpOutline/></IconButton>
      </header>
  );
}

export default Header;
