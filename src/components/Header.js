import logo from '../image/Vector.svg';

function Header({userEmail,handleLogout}) {
  if (
    window.location.pathname.startsWith('/') ||
    window.location.pathname.startsWith('/singup')
  ) {
    return(
      <header className="header">
        <img src={logo} alt="logo around the us" className="header__logo" />
        <div className='header__container'>
        <span className="header__item">{userEmail}</span>
          <button onClick={handleLogout} className="header__item header__button">
            Sair
          </button>
        </div>
      </header>
    );
  }
}
export default Header;
