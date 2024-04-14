import logo from '../image/Vector.svg';

function Header() {
  if (
    window.location.pathname.startsWith('/') ||
    window.location.pathname.startsWith('/singup')
  ) {
    return;
  }
  return (
    <header className="header">
      <img src={logo} alt="logo around the us" className="header__logo" />
    </header>
  );
}
export default Header;
