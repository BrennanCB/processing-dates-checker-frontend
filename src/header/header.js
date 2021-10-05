import logo from '../logo.svg';
import './header.css';

function Header() {
  return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>I am a header</span>
      </header>
  );
}

export default Header;
