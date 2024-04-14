import { Link } from 'react-router-dom';
import logo from '../image/Vector.svg';
import '../blocks/HeaderAndLogin.css';

function HeaderLoginAndRegister({ text, endpoint = '' }) {
  return (
    <header className="header">
      <img src={logo} alt="logo around the us" className="header__logo" />
      <Link to={`/${endpoint}`}>{text}</Link>
    </header>
  );
}

export default HeaderLoginAndRegister;
